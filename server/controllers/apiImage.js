const Image = require('../models/image.js');
const Product = require('../models/product.js');
const cloudinary = require("../libs/cloudinary");



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
  //(6 - (req.files.length + product.img.length)) 
  //console.log(product.img.size)


}



/*

let images = [];
    let product = await Product.findById({_id: req.params.id})
    
    for (let i = 0; i < product.img.length; ++i) {  
      const res = await Image.findById({_id: product.img[i]});


      //const public_id = product.img[0].populate("public_id").exec();
      console.log(res.public_id)
      //const img = Image.findByIdAndDelete({_id: product.img[i]._id});
      //console.log(img)
      //const public_id = img.public_id;
      let result = await cloudinary.uploader.destroy(res.public_id);
    }*/