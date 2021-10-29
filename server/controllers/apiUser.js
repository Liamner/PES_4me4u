const Product = require('../models/product.js');
const User = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

exports.readAllUsers =  async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);

    console.log(user);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.readUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    console.log("Reading user: " + req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.readUsersId = async (req, res) => {
  try {
    const user = await User.find({}, {_id: 1 });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};


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

exports.updateUser = async (req, res) => {
  try{
    const level = req.body.level;
    const ecoPoints = req.body.ecoPoints;
    const score = req.body.score;
  
    const id = req.params.id;
    const user = await User.findById(id)
    console.log("Searching for user to update: " + req.params.id);

    //if (level != null)  
    user.level = level;
    //if (ecoPoints != null) 
    user.ecoPoints = ecoPoints;
    //if (score != null) 
    user.score = score;
    console.log("entro en el try0");
    console.log(user);
    console.log("entro en el try1");
    try {
      console.log("entro en el try2");
      await user.save();
    
      res.status(201).json(user);
    } catch (error) {
      res.status(409).json(error.message);
    
      console.log("Can not update the user");
    }
    
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};