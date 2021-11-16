const { response } = require('express');
const category = require('../models/category.js');
const Product = require('../models/product.js');
const validateCreateProduct = require('../validators/product.js');
const { readCategory } = require('./apiCategory.js');

exports.readAllProducts =  async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);

    console.log(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.readProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });

    console.log("Reading product: " + req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.readProductsFiltered = async (req, res) => {
  try {
    const product = await Product.find({ filter: req.params.filter });
    console.log("Reading products with filter: " + req.paramas.filter);

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
  //const category = readCategory(req.body.categories);
  //category.products.push(); 
  product.name = req.body.name;
 
  
  /*category.findById(req.body.categories, (req, categoria) => {console.log("hola")});
 //console.log(cat);
  if (cat != null){ console.log(req.body.categories); product.categories = req.body.categories;}
  else res.status(404).json({error:'category not found'})*/
  
  product.description = req.body.description;
  product.publishingDate = req.body.publishingDate;
  product.exchange = req.body.exchange;
 
  /*const exg = exchange.findById(req.body.exchange);
 
  if (exg != null){ console.log(req.body.exchange); product.exchange = req.body.exchange;}
  else res.status(404).json({error:'exchange not found'})*/

  if (req.file != null) {
    product.img = '/storage/imgs/' + req.file.filename;
  } 

  product.state = req.body.state;
  product.owner = req.body.owner;
  
  //const image = req.file.filename;
  //console.log(product.img);
  //console.log(JSON.stringify(req.file));
  
  console.log(product);
  try {
    
    await product.save();
   
    res.status(201).json(product);
  } catch (error) {
    res.status(409).json(error.message);

    console.log("Can not create the Product");
  }
};

exports.getImg = async (req, res) => {
  const product = await Product.findById({_id: req.params.id});
  console.log(product);
  res.render('holaa');
  //res.render({product});
}

exports.updateProduct = async (req, res) => {
  try{
    console.log('Hola');

    const product = new Product({
      _id: req.params.id,
    });

    const nname = req.body.name;
    const ncategories = req.body.categories;
    const ndescription = req.body.description;
    const nexchange = req.body.exchange;
    const nimg = req.body.img;

    if (nname != null)  product.name = nname;
    if (ncategories != null) product.categories = ncategories;
    console.log(ncategories);
  
    if (ndescription != null)product.description = ndescription;
    if (nexchange != null) product.exchange = nexchange;
    if (nimg != null) product.img = nimg;

    console.log(product);

    Product.updateOne({_id: req.params.id}, product).then(
      () => {
        res.status(201).json({
          message: 'Update correcto!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
    
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
    console.log("Searching for product to update its state: " + req.params.id);
    
    product.state = nstate;
  
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

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });

    console.log("Deleted product: " + req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};