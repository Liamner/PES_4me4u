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
 // const newFiles = req.files;
  //console.log(req.files.length)

  if (product.img.length < 6) {
    
    try {
      console.log(req.files[0].path)
      let result = await cloudinary.uploader.upload(req.files[0].path);
      
      let image = new Image();
          
      
      image.public_id = result.public_id;
      image.url = result.url;
    
      await image.save();
      
      // Add reference to the product
      product.img.push(image._id)

      await product.save();
      console.log(product)
      res.status(201).json(product);

    } catch (error) {
      res.status(409).json(error.message);
      console.log("Can not upload the images");
    }
  }
  else {
    console.log("Too many products!");
    res.status(400).json({error: 'Too many products'});
  }
  /*
  // FUNCIONA EN LOCAL
  const product = await Product.findById({_id: req.params.productId});
  const newFiles = req.body.img;
  console.log(newFiles)

  if (product.img.length < 6) {
    try {
      let result = await cloudinary.uploader.upload(newFiles);
      let image = new Image();
          
      image.public_id = result.public_id;
      image.url = result.url;
    
      await image.save();
      
      // Add reference to the product
      product.img.push(image._id)

      await product.save();
      console.log(product)
      res.status(201).json(product);

    } catch (error) {
      res.status(409).json(error.message);
      console.log("Can not upload the images");
    }
  }
  else {
    console.log("Too many products!");
    res.status(400).json({error: 'Too many products'});
  }*/
}

/*
exports.uploadImages = async (req, res) => {
  const product = await Product.findById({_id: req.params.productId});
  const newFiles = req.files.length;
  console.log(newFiles)
  console.log(product.img.length)
  const newFiles = req.body.img;
  let length = 1;
  if (newFiles.length < 6) length = newFiles.length;
  console.log(length)

  if (product.userId != req.user.id) {
    res.status(401).json({error: "Do not have permission"})
    return;
  }
  if (product.img.length+req.files.length <= 6) {
    try {
      for (let i = 0; i < req.files.length; ++i) {
        //console.log(req.files[i])
        //let file = req.files[i];
        //let file = newFiles[i];
        
        /*if (length == 1) file = newFiles;
        else file = newFiles[i];
        console.log(file)
        // Save Image in Cloudinary
        let result = await cloudinary.uploader.upload(req.files[i].path);
        console.log(result)
        
        // Save image in mongoDB
        let image = new Image();
        
        image.public_id = result.public_id;
        image.url = result.url;
       
        await image.save();
        
        // Add reference to the product
        product.img.push(image._id)
        
      }

      //product.img.push(imagesIds)
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(409).json(error.message);
  
      console.log("Can not upload the images");
    }
  }
  else {
    console.log("Too many products!");
    res.status(400).json({error: 'Too many products'});
  }
}

*/
exports.deleteImages = async (req, res) => {
  try {
    const product = await Product.findById({_id: req.params.productId});
    let deleteImages = req.params.imageId;
    deleteImages = deleteImages.split(',');

    console.log(deleteImages)
    /*
    if (product.userId == req.user.id) {
        res.status(401).json({error: "Do not have permission"})
        return;
    }*/
    let length = deleteImages.length;
   // if (req.body.img.length != 24) length = req.body.img.length;
    console.log(deleteImages.length)
    /*if (length >= product.img.length) {
      res.status(400).json({error: 'Can not delete all images'})
    }
    else {*/
      for (let i = 0; i < length; ++i) {  
        let imageID = deleteImages[i];
        console.log(imageID)
        await product.img.pull({_id: imageID});
  
        // Delete mongoDB Image
        const res = await Image.findByIdAndDelete({_id: imageID});
        console.log(res.public_id)
  
        // Delete Cloudinary Image
        await cloudinary.uploader.destroy(res.public_id);
        /*if (length > 1) {
          console.log(req.body.img[i])
          await product.img.pull({_id: req.body.img[i]});
  
          // Delete mongoDB Image
          const res = await Image.findByIdAndDelete({_id: req.body.img[i]});
          console.log(res.public_id)
    
          // Delete Cloudinary Image
          await cloudinary.uploader.destroy(res.public_id);
        }
        else {
          imageID = req.body.img; 
          // Delete reference of the image
          console.log(imageID)
          await product.img.pull({_id: imageID});
    
          // Delete mongoDB Image
          const res = await Image.findByIdAndDelete({_id: imageID});
          console.log(res.public_id)
    
          // Delete Cloudinary Image
          await cloudinary.uploader.destroy(res.public_id);
        }*/
      }
      await product.save();
      console.log(product);
      res.status(204).json(product);
   // }   
  } catch (error) {
    res.status(404).json(error.message);
  
      console.log("Can not find the images");
  }

}
/*
exports.updateImages = async (req, res) => {
  const product = await Product.findById({_id: req.params.productId});
  const deleteImgs = req.body.oldImgs;
 
  try {
    //const imgs = [];

    //imgs.push(deleteImgs)
    
   //console.log(imgs)
   let length = 1;
   if (deleteImgs.length != 24) length = deleteImgs.length;
   console.log(length)
      for (let i = 0; i < length; ++i) {
        let imageID;
        if (length > 1) {
          imageId = deleteImgs[i];  
          console.log('MAS DE UNA ' +imageId)  
        }
        else {
          imageID = deleteImgs;
          console.log(imageID)  
        }

  
        // DELETE IMAGE
        await product.img.pull({_id: ObjectId(imageID)});
        const res = await Image.findByIdAndDelete({_id: imageID});
        await cloudinary.uploader.destroy(res.public_id);

        //  SAVE IMAGE
        let file = req.files[i];
        let result = await cloudinary.uploader.upload(file.path);
        let image = new Image();
        image.public_id = result.public_id;
        image.url = result.url;
        //await image.save();

        product.img.push(image._id);
        
      }
      //await product.save();
      //console.log(product);
      
      res.status(201).json(product);
    }
   catch (error) {
    res.status(404).json(error.message);
    console.log(error.message); 
  }
}
*/