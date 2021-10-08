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
  var title = req.body;

  try {
    const product = await Product.findById(title);

    console.log('title');

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

export const createProduct = async (req, res) => {
  const post = req.body;
  // COGER EL TITULO
  console.log(req.url.title);

  const product = new Product(post);
  
  try {
    await product.save();

    res.status(201).json(product);
    console.log(req.body);

  } catch (error) {
    res.status(409).json(error.message);
    
    console.log('fail');
  }
}
