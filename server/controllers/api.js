const Product = require('../models/product.js');
const User = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

exports.registerUser = async (req, res) => {
  let body = req.body;
  let { userId, email, pwd, role } = body;
  let usuario = new User({
    userId,
    email,
    pwd: bcrypt.hashSync(pwd, 10),
    role,
  });
  try {
    await usuario.save();
    res.status(200).json(usuario);
  }
  catch (err){
    res.status(400).json(err.message);
    console.log("Can not register the user");
  }
}
=======
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
    const product = await Product.findById({ _id: req.params.id });

    console.log("Reading product: " + req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

export const readProductsFiltered = async (req, res) => {
  try {
    const product = await Product.find({ filter: req.params.filter });
    console.log("Reading products with filter: " + req.paramas.filter);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    let body = req.body;
    User.findOne({ email: body.email }, (erro, usuarioDB)=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
        // Verifica que exista un usuario con el mail escrita por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
            ok: false,
            err: {
                message: "Usuario o contraseña incorrectos: no existe el usuario"
            }
            })
        }
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (!bcrypt.compareSync(body.pwd, usuarioDB.pwd)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos: la contraseña es incorrecta"
                }
            });
        }
        // Genera el token de autenticación
        let token = jwt.sign({
                usuario: usuarioDB,
            }, process.env.SEED_AUTENTICACION, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        })
        res.json({
            ok: true,
            user: usuarioDB,
            token,
        })
    })
  }
  catch(err) {
    res.status(400).json(err.message);
    console.log("Can not login the user");
  }
}

export const createProduct = async (req, res) => {
  //const product = new Product();
  // REVISAR CODIGOS ERROR SI FALTA ALGUN CAMPO OBLIGATORIO
  const {
    name,
    categories,
    description,
    publishingDate,
    exchange,
    img,
    state,
    owner,
  } = req.body;
  const product = new Product();
  product.name = name;
  product.categories = categories;
  product.description = description;
  product.publishingDate = publishingDate;
  product.exchange = exchange;
  product.img = img;
  product.state = state;
  product.owner = owner;

  console.log(product);

  try {
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json(error.message);

    console.log("Can not create the Product");
  }
};

export const updateProduct = async (req, res) => {
try{
  const nname = req.body.name;
  const ncategories = req.body.categories;
  const ndescription = req.body.description;
  const nexchange = req.body.exchange;
  const nimg = req.body.img;

  const id = req.params.id;
  const product = await Product.findById(id)
  console.log("Searching for product to update: " + req.params.id);
  
  product.name = nname;
  product.categories = ncategories;
  console.log(ncategories);

  product.description = ndescription;
  product.exchange = nexchange;
  product.img = nimg;

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

export const updateStateProduct = async (req, res) => {
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
  }
}
    
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({_id: req.params.id});
    console.log('Reading product: ' + req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};
