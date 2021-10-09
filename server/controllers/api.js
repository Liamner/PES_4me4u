import Product from "../models/product.js";
import typeFilter from '../models/product.js';

export const readAllProducts = async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
    
    console.log(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

export const readProduct = async (req, res) => {
  try {
    const product = await Product.findOne({title: req.params.title});

    console.log('Reading product: ' + req.params.title);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}

export const readProductsFiltered = async (req, res) => {
  try {
    const product = await Product.find({filter: req.params.filter});
    console.log('Reading products with filter: ' + req.paramas.filter);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}

export const createProduct = async (req, res) => {
  const product = new Product();
  product.title = req.params.title;
  product.description = req.params.description;
  if (req.params.filter == "tech") {
    product.filter.tech;
  }
  product.filter = req.params.filter;

  console.log(req.params.filter);

  try {
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json(error.message);
    
    console.log('fail');
  }
}
