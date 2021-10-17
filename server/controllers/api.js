//import Product from "../models/product.js";
const Product = require('../models/product.js');
const validateCreateProduct = require('../validators/product.js');

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

exports.createProduct = async (req, res) => {
  //const product = new Product();
  // REVISAR CODIGOS ERROR SI FALTA ALGUN CAMPO OBLIGATORIO
  /*const {
    name,
    categories,
    description,
    publishingDate,
    exchange,
    img,
    state,
    owner,
  } = req.body;*/
  validateCreateProduct;
  const product = new Product();
  product.name = req.body.name;
  product.categories = req.body.categories;
  product.description = req.body.description;
  product.publishingDate = req.body.publishingDate;
  product.exchange = req.body.exchange;
  product.img = req.body.img;
  product.state = req.body.state;
  product.owner = req.body.owner;

  console.log(product);

  try {
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json(error.message);

    console.log("Can not create the Product");
  }
};

exports.updateProduct = async (req, res) => {};

exports.deleteProduct = async (req, res) => {};
