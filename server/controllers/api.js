import Product from "../models/product.js";
import User from "../models/user.js";

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
  product.description = req.params.description;

  console.log('Este es el titulo '+ req.params.title);

  try {
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json(error.message);
    
    console.log('fail');
  }
}

export const updateProduct = async (req, res) => {

}


export const readProductsFiltered = async (req, res) => {

}

export const createUser = async (req, res) => {
  const user = new User();
  user.userId = req.params.userId;
  user.email = req.params.email;
  user.pwd = req.params.pwd;

  console.log('Este es el usuarios '+ req.params.userId + ' con mail: ' + req.params.email);

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json(error.message);
    
    console.log('fail');
  }
}