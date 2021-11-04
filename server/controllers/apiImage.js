const Image = require('../models/image.js');
const Product = require('../models/product.js');
const cloudinary = require("../libs/cloudinary");
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
    const product = await Product.findById({ _id: req.params.productId});

    console.log("Reading product: " + req.params.productId);
    

    res.status(200).json(image);
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
        image.save();

        // Add reference to the product
        product.img.push(image._id);
      }
      product.save();
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
  const product = await Product.findById({_id: req.params.productId});
  // Buscar en el producto las imagenes correspondientes o se comprueba en pantalla
  // Hay que pasarlo como array    
  try {
    const imgs = [];
    imgs.push(req.body.img)
    for (let i = 0; i < imgs.length; ++i) {  
      const imageID = imgs[i];
      console.log(ObjectId(imageID))

      // Delete reference of the image
      await product.img.pull({_id: ObjectId(imageID)});

      // Delete mongoDB Image
      const res = await Image.findByIdAndDelete({_id: imageID});
      console.log(res.public_id)

      // Delete Cloudinary Image
      await cloudinary.uploader.destroy(res.public_id);
    }
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
  
      console.log("Can not find the images");
  }

}

exports.updateImages = async (req, res) => {
  const product = await Product.findById({_id: req.params.productId});
  try {
    const imgs = [];
    imgs.push(req.body.img)

    for (let i = 0; i < imgs.length; ++i) {  

      // DELETE IMAGE
      const imageID = imgs[i];
      console.log(ObjectId(imageID))

      // Delete reference of the image
      await product.img.pull({_id: ObjectId(imageID)});

      // Delete mongoDB Image
      const res = await Image.findByIdAndDelete({_id: imageID});
      console.log(res.public_id)

      // Delete Cloudinary Image
      await cloudinary.uploader.destroy(res.public_id);

      // CREATE NEW IMAGE
    }
    
  } catch (error) {

    
  }
}

exports.updateProduct