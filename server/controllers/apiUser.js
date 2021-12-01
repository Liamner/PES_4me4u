const Product = require('../models/product.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
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
  console.log(body)
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
        res.status(200).json({
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
const { ObjectId } = require('mongodb');
exports.rateUser = async (req, res) => {
  // Id usuario a valorar
  const userId = req.params.userId;
  const rateScore = req.body.rateScore;
  const comment = req.body.comment;

  if (rateScore == null || rateScore < 0 || rateScore > 5 || req.user.id == userId) res.status(400).json({error: 'Invalid input'})
  else {
    await User.findById({_id: userId}, async (err, userRated) => {
      if (userRated == null || err || userRated == undefined) {
        res.status(404).json({error: 'User not found'})
      }
      else {
        // Calculate new user rate
        let newTotalRateScore = 0;
        console.log(userRated)
        if (userRated.totalRateScore != null) newTotalRateScore = parseFloat(userRated.totalRateScore)+parseFloat(rateScore);
        let tradesRated = userRated.tradesRated +1;
        let newRateScore = calculateUserScore(newTotalRateScore, tradesRated)
        console.log(newRateScore)

        // Create comment
        let newComment = new Comment({
          user: req.user.id,//null,
          rateScore,
          comment
        });
        await newComment.save();
        console.log(newComment)


        // Update user commented
        userRated.rateScore = newRateScore;
        userRated.totalRateScore = newTotalRateScore;
        userRated.tradesRated = tradesRated;
        userRated.commentsRecived.push(newComment)
        const myUser = await User.findById({_id: req.user.id})
        myUser.commentsDone.push(newComment)
        console.log(myUser.id)
        try {
          await userRated.save();
          await myUser.save();
        
          res.status(201).json(userRated);
        } catch (error) {
          res.status(409).json(error.message);
        
          console.log("Can not update the user");
        }
      }  
    }).clone()//.catch(function(err){ res.status(404).json({error: 'User not found'}); console.log(err)})
  }
}

function calculateUserScore(totalRateScore, tradesRated) {
  return totalRateScore/tradesRated;
}

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json(comments);

    console.log(comments);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

exports.getMyCommentsDone = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id}).populate({path: 'commentsDone', populate:{path: 'user', select: { 'name': 1} }});
    res.status(200).json(user.commentsDone);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}

exports.getMyCommentsRecived = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id}).populate({path: 'commentsRecived', populate:{path: 'user', select: { 'name': 1} }});
    //const comments = user.commentsDone.populate(user)
    res.status(200).json(user.commentsRecived);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}