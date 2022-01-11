const Product = require('../models/product.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminController = require ('../controllers/apiAdmin.js')
//const user = require('../models/user.js');
const app = express();

exports.readAllUsers =  async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);

  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.readUser = async (req, res) => {
  try {
    //const user = await User.findById({ _id: req.params.id }, {uderId: 1, followed : {userId: 1},  followers : {userId: 1}});
    const user = await User.findById({ _id: req.params.id });
    console.log("Reading user: " + req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
};

exports.readUserByName = async (req, res) => {
  try {
    const user = await User.find({ userId: {$regex: req.params.userId} });
    console.log("Reading users: " + req.params.userId);

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
    adminController.increaseUsers();
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

exports.loginAdmin = async (req, res) => {
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
            return res.status(404).json({
            ok: false,
            err: {
                message: "Usuario o contraseña incorrectos: no existe el usuario"
            }
            })
        }
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (!bcrypt.compareSync(body.pwd, usuarioDB.pwd)){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos: la contraseña es incorrecta"
                }
            });
        }

        if (usuarioDB.role != 'ADMIN'){
          return res.status(403).json({
              ok: false,
              err: {
                  message: "Usuario no autorizado"
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

  if (usr.userId != req.user.id || usr.role != 'ADMIN')  {
    res.status(401).json({error: "Do not have permission"})
    return;
  }
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
    const user = await User.findById({_id : req.params.id})

    console.log(req.body.latitude)
    if (req.body.name) user.userId = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.latitude  && req.body.longitude ) {
      user.latitude = req.body.latitude;
      user.longitude = req.body.longitude;
    }
    
    console.log(user);
    console.log("Searching for user to update: " + req.body.latitude);
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
    const user = await User.findById({_id: userId}).populate({path: 'products', populate: {path: 'img'}});
    console.log(user)
    res.status(200).json(user.products)
  } catch (error) {
    res.status(400).json(error)
  }
};

exports.rateUser = async (req, res) => {
  // Id usuario a valorar
  const userId = req.params.id;
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

        // Create comment
        let newComment = new Comment({
          user: req.user.id,//null,
          rateScore,
          comment
        });
        await newComment.save();
        //console.log(newComment)


        // Update user commented
        userRated.rateScore = newRateScore;
        userRated.totalRateScore = newTotalRateScore;
        userRated.tradesRated = tradesRated;
        userRated.commentsRecived.push(newComment)
        console.log(userRated)
        const myUser = await User.findById({_id: req.user.id})
        myUser.commentsDone.push(newComment)
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


exports.getRewards = async (req, res) => {
  try {
    console.log("llega a getRewards");
    const user = await User.findById({ _id: req.params.id });
    let ngifts = user.gifts;
    let nloans = user.loans;
    let nexchanges = user.changes;
    let points = user.ecoPoints;
    let rewards = 0;
    let diez = 10;
    let cincuenta = 50;
    let cien = 100;
    let cientoCincuenta = 150;

    if(ngifts >= 3) {
      if(ngifts >=3 && ngifts <= 5) rewards += parseFloat(diez);
      else if(ngifts >= 5 && ngifts <= 7) rewards += parseFloat(cincuenta);
      else if (ngifts >= 7 && ngifts <= 10) rewards += parseFloat(cien);
      else if(ngifts >= 10) rewards += parseFloat(cientoCincuenta);
    }

    if(nloans >= 3) {
      if(nloans >=3 && nloans <= 5) rewards += parseFloat(diez);
      else if(nloans >= 5 && nloans <= 7) rewards += parseFloat(cincuenta);
      else if (nloans >= 7 && nloans <= 10) rewards += parseFloat(cien);
      else if(nloans >= 10) rewards += parseFloat(cientoCincuenta);
    }

    if(nexchanges >= 3) {
      if(nexchanges >=3 && nexchanges <= 5) rewards += parseFloat(diez);
      else if(nexchanges >= 5 && nexchanges <= 7) rewards += parseFloat(cincuenta);
      else if (nexchanges >= 7 && nexchanges <= 10) rewards += parseFloat(cien);
      else if(nexchanges >= 10) rewards += parseFloat(cientoCincuenta);
    }
    user.ecoPoints = parseFloat(points)+parseFloat(rewards)
    //user.ecoPoints += rewards;
    await user.save();
    res.status(200).json(user);
    
  } catch (error) {
    res.status(400).json(error)
  }
};

/*
exports.getUserRewards = async (req, res) => {
  console.log("llega a getUserRewards");
  let {type, estimatedPoints} = req.body;

  let user = await User.findById({ _id: req.params.id });
  console.log("Searching for user to get reward: " + user.name);
  let eco = user.ecoPoints;
  let total = 0;
  if (type == 'gift'){
    if(estimatedPoints >= 1 && estimatedPoints <= 100) total = parseFloat(eco)+parseFloat(estimatedPoints)
    else res.status(400).json({error: 'Estimated points are too high'})
  }

  else if (type == 'loan') {
    if(estimatedPoints >= 1 && estimatedPoints <= 15) total = parseFloat(eco)+parseFloat(estimatedPoints)
    else res.status(400).json({error: 'Estimated points are too high'})
    
  }
  else if (type == 'exchange') {
    if(estimatedPoints == 15) total = parseFloat(eco)+parseFloat(estimatedPoints)
    else res.status(400).json({error: 'Estimated points not accepted'})
  }
  else res.status(400).json({error: 'Transaction not available'});
  
  
  user.ecoPoints = total;

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error)
  }
};
*/

function getUserRewards (type, estimatedPoints) {
  console.log("llega a getUserRewards");
  //let {type, estimatedPoints} = req.body;

  let user = User.findById({ _id: req.params.id });
  console.log("Searching for user to get reward: " + user.name);
  let eco = user.ecoPoints;
  let total = 0;
  if (type == 'gift'){
    if(estimatedPoints >= 1 && estimatedPoints <= 100) total = parseFloat(eco)+parseFloat(estimatedPoints)
    //else res.status(400).json({error: 'Estimated points are too high'})
  }

  else if (type == 'loan') {
    if(estimatedPoints >= 1 && estimatedPoints <= 15) total = parseFloat(eco)+parseFloat(estimatedPoints)
    //else res.status(400).json({error: 'Estimated points are too high'})
    
  }
  else if (type == 'exchange') {
    if(estimatedPoints == 15) total = parseFloat(eco)+parseFloat(estimatedPoints)
    //else res.status(400).json({error: 'Estimated points not accepted'})
  }
  //else res.status(400).json({error: 'Transaction not available'});
  
  
  user.ecoPoints = total;
  console.log("antes: ", eco, " ahora: ", total );
/*
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error)
  }
  */
};

exports.getUserLevel = async (req, res) => {
  try{
    const user = await User.findById({ _id: req.params.id });
    console.log("Level del usuario: " , user.level);
    res.status(200).json(user.level);
  }
  catch(err) {
    res.status(400).json(err.message);
    console.log("Can not delete the user");
  }
}

exports.levelManage = async (req, res) => {
  try {
    console.log("llega a levelManage");
    const user = await User.findById({ _id: req.user.id });
    console.log("Level del usuario: " , user.name);

    var nivelAntiguo = user.level;
    var nivelNuevo, reward;
    var points = user.ecoPoints;

    if(points < 50) nivelNuevo = '1'; // seed semilla
    else if (points >= 50 && points < 150) nivelNuevo = '2'; //brote outbreak
    else if (points >= 150 && points < 300) nivelNuevo = '3'; // plant
    else if (points >= 300 && points < 500) nivelNuevo = '4'; // tree
    else if(points >= 500 && points < 750) nivelNuevo = '5'; // roble oak
    else if (points >= 750) nivelNuevo = '6'; //ecologista ecologist

    //si ha subido de nivel gana una recompensa
    if(nivelAntiguo != nivelNuevo) {
      if(nivelNuevo == '2') reward = 20;
      else if (nivelNuevo == '3') reward = 40;
      else if (nivelNuevo == '4') reward = 60;
      else if (nivelNuevo == '5') reward = 80;
      else if (nivelNuevo == '6') reward = 100;
    }

    user.ecoPoints = parseFloat(points) + parseFloat(reward);
    user.level = nivelNuevo;

    await user.save();
    //res.status(200).json(user);
    console.log("gestion de nivel ok")
    
  } catch (error) {

  }
}

exports.getUserPoints = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    console.log("Puntos del usuario: " , user.ecoPoints);
    res.status(200).json(user.ecoPoints);
  } catch (error) {
    res.status(400).json(error)
  }
};

/*
exports.getUserRewards = async (req, res) => {
  try {
    const {type, estimatedPoints} = req.body;

    const id = req.user.id;
    const user = await User.findById(id)
    console.log("Searching for user to get reward: " + user.name);
    
    if (type != 'gift' && estimatedPoints >= 1 && estimatedPoints <= 100) user.ecoPoints += estimatedPoints;
    if (type != 'loan' && estimatedPoints >= 1 && estimatedPoints <= 15) user.ecoPoints += estimatedPoints;
    if (type != 'exchange') user.ecoPoints += 15;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error)
  }
};
*/

exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    User.findOne({_id: userId}, (erro, user) => {
      let products = user.wishlist;

      console.log(products)
      Product.find({_id: { $in: products}}, (erro, wishlistProducts) => {
        res.status(200).json(wishlistProducts)
      }).populate('img')
    })
    /*User.findOne({_id: userId}, (erro, user) => {
      console.log(user.wishlist)
      console.log(user);
     res.status(200).json(user.wishlist);
    }).populate({path:"wishlist", populate: {path: 'products'}});*/
  } catch (error) {
    res.status(400).json(error)
  }
};  
    
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const ourUser = await User.findById({_id: userId});
    let idProduct = req.body.idProduct;
    ourUser.wishlist.push(idProduct);
    
    ourUser.save();
    res.status(200).json(ourUser.wishlist);

  } catch (error) {
    res.status(400).json(error)
  }
};

exports.deleteFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    let idProduct = req.body.idProduct;
    const ourUser = await User.findById({_id: userId}).populate("wishlist");
    let i = 0, find = 0;

    for (i = 0;(find == 0) && (i < ourUser.wishlist.length); i++) {
      if (idProduct == ourUser.wishlist[i]) find = 1;
    }
    if (find == 0) {
      res.status(400).json({error: 'The product is not in the wishlist'})
    }
    else {
      i = i-1;
      ourUser.wishlist.splice(i, 1);
      ourUser.save();
      console.log(ourUser.wishlist)
      res.status(200).json(ourUser);
    }
  } catch (error) {
    res.status(400).json(error)
  }
};

exports.getUserFollowed = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id: userId}).populate("followed");
    
    res.status(200).json(user.followed)
  } catch (error) {
    res.status(400).json(error)
  }
};

exports.getUserFollowers = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id: userId}).populate("followers");
    
    res.status(200).json(user.followers)
  } catch (error) {
    res.status(400).json(error)
  }
};

exports.follow = async (req, res) => {
  try {
    const userId = req.user.id;
    let body = req.body;
    const ourUser = await User.findById({_id: userId});
    const userFollowed = await User.findOne ({email: body.email});
        let find = 0;
        let i;
        let aux2 = userFollowed._id.toString();
        for (i = 0;(find == 0) && (i < ourUser.followed.length) ; i++) {
          let aux1 = ourUser.followed[i].toString();
          if (aux1 == aux2) {find = 1;}
        }
        if (find == 0) {
          ourUser.followed.push(userFollowed._id);
          await ourUser.save();
          userFollowed.followers.push(ourUser._id);
          await userFollowed.save();
           res.status(200).json(ourUser.followered);
        }
        else {
          i = i-1;
          ourUser.followed.splice(i, 1);
          await ourUser.save();
          find = 0;
          aux2 = ourUser._id.toString();
          for (i = 0;(find == 0) && (i < userFollowed.followers.length) ; i++) {
            aux1 = userFollowed.followers[i].toString();
            if(aux1 == aux2){
              find = 1;
            }
          }
          i = i - 1; 
          userFollowed.followers.splice(i,1);
          await userFollowed.save();
         res.status(200).json(ourUser.followered);
        }
    } catch (error) {
    res.status(400).json(error)
  }
};

exports.getRecentlyViewed = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findById({_id: userId} ,{wishlist: 1}, (erro,user) => {
      console.log(user.recentlyViewed)
      res.status(200).json(user.recentlyViewed)
    }).populate({path: 'recentlyViewed', populate: {path: 'img'}}).clone()

    
  } catch (error) {
    res.status(400).json(error)
  }
};


exports.updateRecentlyViewed = async (req, res) => {
  try {
    const userId = req.params.id;
    let idProduct = req.body.idProduct;

    User.findById({_id: userId}, async (erro, usersRecentViewed) => {
      //console.log(usersRecentViewed.recentlyViewed)
      
     /* if (usersRecentViewed.recentlyViewed) {
        for (let i = 0; i < usersRecentViewed.recentlyViewed.length; i++)  {

          console.log(usersRecentViewed.recentlyViewed[i]._id)
          if (usersRecentViewed.recentlyViewed[i]._id == idProduct) found = true;
          
          //if(JSON.stringify(idProduct) === JSON.stringify(usersRecentViewed.recentlyViewed[i]._id)) found = true;
         // if ( idProduct.toString().equals(id)) found = true;
        }
     
      }
      console.log(found)
      if (found) {
        res.status(404).json({error: 'Product already in the list'});
      }
      else {*/
      if (usersRecentViewed.recentlyViewed) {
        if (usersRecentViewed.recentlyViewed.length >= 4) {       
          usersRecentViewed.recentlyViewed.splice(0,1);
          await usersRecentViewed.save();
        }
      }   
      Product.findById({ _id: idProduct }, async (erro, product) => {
        if (product != null) {
          usersRecentViewed.recentlyViewed.push(product);
          
          console.log(usersRecentViewed.recentlyViewed)
          //else usersRecentViewed.recentlyViewed = product._id
          await usersRecentViewed.save();
          res.status(200).json(usersRecentViewed.recentlyViewed);
        }
        else res.status(404).json({error: 'Product not found'})
      })
      
      
    }).populate('recentlyViewed').clone()
  } catch (error) {
    res.status(400).json(error)
  }
}