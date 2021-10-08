import CreateProduct from "../models/product.js";

export const mainPage = async (req, res) => {
  try {
    const product = await CreateProduct.find();

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
    const product = await CreateProduct.findById(title);

    console.log(product);

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

export const createProduct = async (req, res) => {
  var post = req.body;

  const product = new CreateProduct(post);
  try {
    await product.save();

    res.status(201).json(product);
    console.log(product.title);

  } catch (error) {
    res.status(409).json(error.message);
    console.log('fail');
  }
}
