const Image = require('../models/image.js');
const Product = require('../models/product.js');
const cloudinary = require("../config/cloudinary");
const { ObjectId } = require('mongodb');

exports.getAllImages = async (req, res) => {
  try {
    const image = await Image.find();

    res.status(200).json(image);

    console.log(image);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

exports.getProductImages = async (req, res) => {
  try {
    const images = await Product.findById({ _id: req.params.productId}).populate('img');

    console.log("Reading product: " + req.params.productId);
  
    res.status(200).json(images.img);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}

exports.uploadImages = async (req, res) => {
  const product = await Product.findById({_id: req.params.productId});
  const newFiles = req.files.length;
  console.log(product.img.length)
  if (product.img.length+newFiles <= 6) {
    console.log(product.img.length)
    try {
      for (let i = 0; i < newFiles; ++i) {
        console.log(req.files[i])
        let file = req.files[i];

        // Save Image in Cloudinary
        let result = await cloudinary.uploader.upload(file.path);
        
        // Save image in mongoDB
        let image = new Image();
        image.public_id = result.public_id;
        image.url = result.url;
        await image.save();

        // Add reference to the product
        product.img.push(image._id);
      }
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(409).json(error.message);
  
      console.log("Can not upload the images");
    }
  }
  else {
    console.log("Too many products!");
  }
}


exports.deleteImages = async (req, res) => {
  try {
    const product = await Product.findById({_id: req.params.productId});
    
    if (product.userId == req.user.id) {
      const imgs = [];
      imgs.push(req.body.img)
      for (let i = 0; i < imgs.length; ++i) {  
        const imageID = imgs[i];
        console.log(ObjectId(imageID))
  
        // Delete reference of the image
        await product.img.pull({_id: imageID});
  
        // Delete mongoDB Image
        const res = await Image.findByIdAndDelete({_id: imageID});
        console.log(res.public_id)
  
        // Delete Cloudinary Image
        await cloudinary.uploader.destroy(res.public_id);
      }
      await product.save();
      console.log(product);
      res.status(204).json(product);
    }
    else {
      res.status(403).json({error: "Do not have permission"})
      return;
    }
  } catch (error) {
    res.status(404).json(error.message);
  
      console.log("Can not find the images");
  }

}

exports.updateImages = async (req, res) => {
  const product = await Product.findById({_id: req.params.productId});
  const deleteImgs = req.body.oldImgs;
  try {
    const imgs = [];
    imgs.push(deleteImgs)
    
    console.log(imgs)
      for (let i = 0; i < imgs.length; ++i) {  
        const imageID = imgs[i];
        console.log(imageID)
  
        // DELETE IMAGE
        await product.img.pull({_id: imageID});
        const res = await Image.findByIdAndDelete({_id: imageID});
        await cloudinary.uploader.destroy(res.public_id);

        //  SAVE IMAGE
        let file = req.files[i];
        let result = await cloudinary.uploader.upload(file.path);
        let image = new Image();
        image.public_id = result.public_id;
        image.url = result.url;
        await image.save();

        product.img.push(image._id);
        
      }
      await product.save();
      console.log(product);
      
      res.status(201).json(product);
    }
   catch (error) {
    res.status(404).json(error.message);
    console.log(error.message); 
  }
}
