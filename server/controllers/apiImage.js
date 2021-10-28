const Image = require('../models/image.js');
const Product = require('../models/product.js');
const cloudinary = require("../libs/cloudinary");

exports.getAllImages = async (req, res) => {

}

exports.getProductImages = async (req, res) => {
  
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
        let result = await cloudinary.uploader.upload(file.path);
        let image = new Image();
        image.public_id = result.public_id;
        image.url = result.url;
        image.save();
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
  console.log(req.body.img.length)
    
  try {
    
    for (let i = 0; i < req.body.img.length; ++i) {  
      const imageID = product.img[i]._id;
      const res = await Image.findById({_id: imageID});
      // Delete image form cloud
      const cloud = await cloudinary.uploader.destroy(res.public_id);
      // Delete image mongoDB
      const db = await Image.findByIdAndDelete({_id: imageID});


      const index = product.img.indexOf(imageID);
      console.log(index)
      if (index > -1) {
        product.img.splice(index, 1);
      }
    }
    
    product.save();
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
  
      console.log("Can not find the images");
  }
 
}