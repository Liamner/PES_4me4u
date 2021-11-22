const Product = require('../models/product.js');
const User = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');
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
  let { name, email, pwd, role } = body;
  let usuario = new User({
    name,
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
        const userToken = {
          id: usuarioDB._id,
          username: usuarioDB.userId,
          //products: usuarioDB.products
        }
        let token = jwt.sign(userToken, process.env.SECRET, {
            expiresIn: process.env.TOKEN_EXPIRES
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

exports.deleteUser = async (req, res) => {
  let usr = await User.findById({_id: req.params.id})
  //let email = req.params.email; 
  try{
    let usr = await User.findById({_id: req.params.id})
    usr.delete();
    res.status(200).json(usr);
  }
  catch(err) {
    res.status(400).json(err.message);
    console.log("Can not delete the user");
  }
}

exports.updateUser = async (req, res) => {
    /*const level = req.body.level;
    const ecoPoints = req.body.ecoPoints;
    const score = req.body.score;*/

    const {name, email, latitude, longitude} = req.body;
  
    const id = req.params.id;
    const user = await User.findById(id)
    console.log("Searching for user to update: " + req.params.id);

    if (name != null) user.name = name;
    if (email != null) user.email = email;
    if (latitude != null) user.latitude = latitude;
    if (longitude != null) user.longitude = longitude;
    /*if (level != null)  user.level = level;
    if (ecoPoints != null) user.ecoPoints = ecoPoints;
    if (score != null) user.score = score;
    */
    console.log(user);
    
    try {
      await user.save();
    
      res.status(201).json(user);
    } catch (error) {
      res.status(409).json(error.message);
    
      console.log("Can not update the user");
    }
}

exports.getUserProducts = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id: userId}).populate("products");
    
    console.log(user)
    res.status(200).json(user.products)
  } catch (error) {
    res.status(400).json(error)
  }
};

exports.getRewards = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    var ngifts = user.gifts;
    var nloans = user.loans;
    var nexchanges = user.exchanges;
    var rewards = 0;
    if(ngifts >= 3) {
      if(ngifts >= 5) rewards += 10;
      else if (ngifts >= 7) rewards += 50;
      else if(ngifts >= 10) rewards += 100;
    }

    else if(nloans >= 3) {
      if(nloans >= 5) rewards += 10;
      else if (nloans >= 7) rewards += 50;
      else if(nloans >= 10) rewards += 100;
    }

    else if(nexchanges >= 3) {
      if(nexchanges >= 5) rewards += 10;
      else if (nexchanges >= 7) rewards += 50;
      else if(nexchanges >= 10) rewards += 100;
    }

    res.status(200).json(user.ecoPoints);
    /*
    const userId = req.params.id;
    const user = await User.findById({_id: userId}).populate("products");
    
    console.log(user)
    res.status(200).json(user.products)
    */
  } catch (error) {
    res.status(400).json(error)
  }
};
