//import Product from "../models/product.js";
const Product = require('../models/product.js');
//import User from "../models/user.js";
const User = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
/*
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
*/

exports.registerUser = async (req, res) => {
  console.log("Llega a llamar a la función");
  let body = req.body;
  let { userId, email, pwd, role } = body;
  let usuario = new User({
    userId,
    email,
    pwd: bcrypt.hashSync(pwd, 10),
    role,
    
  });
  console.log("Se cogen los datos correctamentre");
  try {
    await usuario.save();
    res.status(400).json(error.message);
    console.log("ENTRA EN EL TRY");
      //usuario: usuarioDB
    //usuario: usuarioDB
  }
  catch (error){
    res.status(400).json(error.message);
    console.log("Can not register the user");
  }
}
  /*
usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
    }
    res.json({
          ok: true,
          usuario: usuarioDB
       });
    })
});
*/
//module.exports = app;
