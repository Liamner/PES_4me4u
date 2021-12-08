const Product = require('../models/product.js');
const User = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const user = require('../models/user.js');
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

    const level = req.body.level;
    const ecoPoints = req.body.ecoPoints;
    const score = req.body.score;
  
    const id = req.params.id;
    const user = await User.findById(id)
    console.log("Searching for user to update: " + req.params.id);

    if (level != null)  user.level = level;
    if (ecoPoints != null) user.ecoPoints = ecoPoints;
    if (score != null) user.score = score;
    
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
    var points = user.ecoPoints;
    var rewards = 0;
    if(ngifts >= 3) {
      if(ngifts >=3) rewards += 10;
      if(ngifts >= 5) rewards += 50;
      else if (ngifts >= 7) rewards += 100;
      else if(ngifts >= 10) rewards += 150;
    }

    else if(nloans >= 3) {
      if(nloans >=3) rewards += 10;
      if(nloans >= 5) rewards += 50;
      else if (nloans >= 7) rewards += 100;
      else if(nloans >= 10) rewards += 150;
    }

    else if(nexchanges >= 3) {
      if(nexchanges >=3) rewards += 10;
      if(nexchanges >= 5) rewards += 50;
      else if (nexchanges >= 7) rewards += 100;
      else if(nexchanges >= 10) rewards += 150;
    }

    user.ecoPoints = points + rewards;
    user.save();
    res.status(200).json(user);
    
  } catch (error) {
    res.status(400).json(error)
  }
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
    const user = await User.findById({ _id: req.params.id });
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

    user.ecoPoints = points + reward;
    user.level = nivelNuevo;

    await user.save();
    res.status(200).json(user);
    
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

exports.getUserRewards = async (req, res) => {
  try {
    const {type, estimatedPoints} = req.body;

    const id = req.params.id;
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

exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id: userId}).populate("wishlist");
    
    console.log(user);
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(400).json(error)
  }
};  
    
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const ourUser = await User.findById({_id: userId});
    let idProduct = req.body.idProduct;
    
    Product.findOne({ _id: idProduct }, (erro, productDB)=>{
      if (erro) {
        return res.status(500).json({
           ok: false,
           err: erro
        })
     }
     ourUser.wishlist.push(productDB);
     ourUser.save();
     res.status(200).json(ourUser.wishlist);
    });
  } catch (error) {
    res.status(400).json(error)
  }
};

exports.deleteFromWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    let idProduct = req.body.idProduct;
    User.findById({_id: userId}, {wishlist: 1}, async (erro, usersProducts) => {
        let find = 0;
        let i;
        for (i = 0;(find == 0) && (i < usersProducts.wishlist.length) ; i++) {
          if (idProduct == usersProducts.wishlist[i]._id) {find = 1;}
        }
        if (find == 0) {
          res.status(400).json({error: 'User not wishlist'})
        }
        else {
          i = i-1;
          usersProducts.wishlist.splice(i, 1);
          usersProducts.save();
          const user = await User.findById({_id: userId});
          console.log(user.wishlist)
          res.status(200).json(usersProducts);

        }
    }).populate('wishlist');

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

exports.addUserFollowed = async (req, res) => {
  try {
    const userId = req.params.id;
    const ourUser = await User.findById({_id: userId});
    
    let body = req.body;
    User.findOne({ email: body.email }, (erro, usuarioDB)=>{
      if (erro) {
        return res.status(500).json({
           ok: false,
           err: erro
        })
     }
     ourUser.followed.push(usuarioDB);
     ourUser.save();
     res.status(200).json(ourUser.followed);
    });

  } catch (error) {
    res.status(400).json(error)
  }
};

exports.addUserFollower = async (req, res) => {
  try {
    const userId = req.params.id;
    const ourUser = await User.findById({_id: userId});
    
    let body = req.body;
    User.findOne({ email: body.email }, (erro, usuarioDB)=>{
      if (erro) {
        return res.status(500).json({
           ok: false,
           err: erro
        })
     }
     ourUser.followers.push(usuarioDB);
     ourUser.save();
     res.status(200).json(ourUser.followers);
    });
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.unfollow = async (req, res) => {
  try {
    const userId = req.params.id;
    let mail = req.body.email;

    User.findById({_id: userId}, {followed: 1}, async (erro, usersFollowed) => {
        let find = 0;
        let i;
        for (i = 0;(find == 0) && (i < usersFollowed.followed.length) ; i++) {
          if (mail == usersFollowed.followed[i].email ) {find = 1;}
        }
        if (find == 0) {
          res.status(400).json({error: 'User not followed'})
        }
        else {
          i = i-1;
          const idUser = usersFollowed.followed[i]._id;
          usersFollowed.followed.splice(i, 1);
          usersFollowed.save();

          const user = await User.findById({_id: idUser});
          res.status(200).json(usersFollowed);

        }
    }).populate('followed');

  } catch (error) {
    res.status(400).json(error)
  }
};

exports.loseFollower = async (req, res) => {
  try {
    const userId = req.params.id;
    let mail = req.body.email;

    User.findById({_id: userId}, {followers: 1}, async (erro, usersFollowers) => {
        let find = 0;
        let i;
        for (i = 0;(find == 0) && (i < usersFollowers.followers.length) ; i++) {
          if (mail == usersFollowers.followers[i].email ) {find = 1;}
        }
        if (find == 0) {
          res.status(400).json({error: 'User not follower'})
        }
        else {
          i = i-1;
          const idUser = usersFollowers.followers[i]._id;
          usersFollowers.followers.splice(i, 1);
          usersFollowers.save();

          const user = await User.findById({_id: idUser});
          res.status(200).json(usersFollowers);

        }
    }).populate('followers');

  } catch (error) {
    res.status(400).json(error)
  }
};

exports.getRecentlyViewed = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById({_id: userId}).populate("recentlyViewed");
    
    res.status(200).json(user.recentlyViewed)
  } catch (error) {
    res.status(400).json(error)
  }
};