const { response } = require('express');
const { check } = require('express-validator');
const Category = require('../models/category.js');
const Product = require('../models/product.js');
const Image = require('../models/image.js');
const User = require('../models/user.js');
const Type = require('../models/type.js');
const validateCreateProduct = require('../validators/product.js');
//const { readCategory } = require('./apiCategory.js');
const cloudinary = require("../config/cloudinary");
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');


exports.readAllProducts =  async (req, res) => {
  try {
    const product = await Product.find().populate('img');

    res.status(200).json(product);

    console.log(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.readProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id }).populate("img");

    console.log("Reading product: " + req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.readProductsFilteredCategory = async (req, res) => {
  try {

    const product = await Product.find ({ categories: req.body.categories }) 
    console.log("Reading products with filter by Category: " + req.body.name);
    res.status(200).json(product);

  } catch (error) {

    res.status(404).json(error.message);
    console.log(error.message);

  }
};

exports.readProductsFilteredType = async (req, res) => {
  try {

    const product = await Product.find ({ type: req.body.type}) 
    console.log("Reading products with filter by Type: " + req.body.type);
    res.status(200).json(product);

  } catch (error) {

    res.status(404).json(error.message);
    console.log(error.message);
  }
};


exports.readProductsId = async (req, res) => {
  try {
    const product = await Product.find({}, {_id: 1 });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product();
  product.name = req.body.name;
  product.categories = req.body.categories  
  product.description = req.body.description;
  product.publishingDate = req.body.publishingDate;
  product.exchange.push(req.body.exchange);         
  product.state = req.body.state;
  // Assign the current user to the product

  product.userId = req.user.id;
  product.username = req.user.username;

  // SAVE IMAGE
  if (req.files != null) {
    for (let i = 0; i < req.files.length; ++i) {
      let file = req.files[i];
      let result = await cloudinary.uploader.upload(file.path);
      let image = new Image();
      image.public_id = result.public_id;
      image.url = result.url;
      image.save();
      product.img.push(image._id);
    }
  } 
 
  try {   
  const category = await Category.findOne({name: req.body.categories});
  if (category == null) res.status(404).json({error:"category not found"});

  const type = await Type.findOne({name: req.body.exchange});
  if (type == null) res.status(404).json({error:"type not found"});
    
  if (category != null && type != null) {
    
    const newProduct = await product.save();
    // Add the product to the user 
    const user = await User.findByIdAndUpdate(
                            { _id: ObjectId(req.user.id) }, 
                              {$push : {
                                products: newProduct
                              }
                            });

    const categories = await Category.findOneAndUpdate(
                            { name: req.body.categories }, 
                                {$push : {
                                  products: newProduct
                                }
                              });

    const types = await Type.findOneAndUpdate(
                                { name: req.body.exchange }, 
                                    {$push : {
                                      products: newProduct
                                    }
                                  });
                              
    res.status(201).json(product);}

  } catch (error) {
    res.status(409).json(error.message);

    console.log("Can not create the Product");
  }
};

exports.getImg = async (req, res) => {
  const image = await Image.findById({_id: req.params.id});
  console.log(image);
}

exports.updateProduct = async (req, res) => {
  try{
    const nname = req.body.name;
    const ncategories = req.body.categories;
    const ndescription = req.body.description;
    const nexchange = req.body.exchange;
    const nimg = req.body.img;
  
    const id = req.params.id;
    const product = await Product.findById(id)
    console.log("Searching for product to update: " + req.params.id);
    
    /*authenticateJWT, */

    /*if (product.userId != req.user.id) {
        res.status(401).json({error: "Do not have permission"})
        return;
    }*/
      if (nname != null)  product.name = nname;
      if (ncategories != null) product.categories = ncategories;
      console.log(ncategories);
    
      if (ndescription != null)product.description = ndescription;
      if (nexchange != null) product.exchange = nexchange;
      if (nimg != null) product.img = nimg;
    
      console.log(product);
    
    
  
    try {
      await product.save();
    
      res.status(201).json(product);
    } catch (error) {
      res.status(409).json(error.message);
    
      console.log("Can not update the Product");
    }
    
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.updateStateProduct = async (req, res) => {
  try{
    const nstate = req.body.state;
  
    const id = req.params.id;
    const product = await Product.findById(id)
    try {
      

      if (product.userId == req.user.id) {
        res.status(401).json({error: "Do not have permission"})
        return;
      }
        console.log("Searching for product to update its state: " + req.params.id);
        product.state = nstate;
        console.log(product);
        await product.save();
        res.status(201).json(product);

      
    } catch (error) {
      res.status(409).json(error.message);
    
      console.log("Can not update the Product");
    }
    
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {    
    let product = await Product.findById({_id: req.params.id})
    /*if (!product) {
      res.status(404).json({error: "Product not find"})
    }*/
    //else {
      /*
      if (product.userId == req.user.id) {
        res.status(401).json({error: "Do not have permission"})
        return;
      }*/
        
        for (let i = 0; i < product.img.length; ++i) {  
          const res = await Image.findByIdAndDelete({_id: product.img[i]});
          await cloudinary.uploader.destroy(res.public_id);
          console.log("Deleted product: " + req.params.id);
        }
        
        await User.findByIdAndUpdate(
                              { _id: ObjectId(req.user.id) }, 
                                {$pull : {
                                  products: product._id
                                }
                              });
     
      product.delete();
      res.status(200).json(product);
   // }
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.readProductsByName = async (req, res) => {
  const filter = req.params.name;
  console.log(filter)
  try {
    const product = await Product.find({name: {$regex : filter}}).populate({path:'img'})
    console.log(product)
    res.status(200).json(product);
    
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};