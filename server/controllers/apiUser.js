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

  exports.resetPassword = async (req, res) => {
    const new_password = req.body.password;
    const email = req.body.email;
    const user = await User.findById(email)
    console.log("Searching the user: " + email);
    user.pwd = new_password;
    console.log(user);

    try {
      await user.save();
      res.status(201).json(user);
    }
    catch(err) {
      res.status(409).json(error.message);
      console.log("Can not update the password");
    }
  }