import Product from "../models/product.js";

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
  const title = req.params.title;

  try {
    const product = await Product.find(title);

    console.log('title');

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

export const createProduct = async (req, res) => {
  const product = new Product();
  product.title = req.params.title;

  console.log('Este es el titulo '+ req.params.title);

  try {
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json(error.message);
    
    console.log('fail');
  }
}
