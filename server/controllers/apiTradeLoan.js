const TradeLoan = require('../models/tradeLoan.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const adminController = require ('../controllers/apiAdmin.js')
const { ObjectId } = require('mongodb');

exports.readAllTradeLoan = async (req, res) => {
    try {
      const tradeLoan = await TradeLoan.find();
  
      res.status(200).json(tradeLoan);

    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
};
  
  exports.readTradeLoan = async (req, res) => {
    try {
      const tradeLoan = await TradeLoan.findById({_id: req.params.id});
  
      console.log('Reading TradeLoan: ' + req.params.id);
  
      res.status(200).json(tradeLoan);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
};
  
  exports.createTradeLoan = async (req, res) => {
    const tradeLoan = new TradeLoan();

    tradeLoan.userOfering = req.user.id;
    tradeLoan.userTaking = req.body.userTaking;
    tradeLoan.product = req.body.product;
    tradeLoan.publishingDate = req.body.publishingDate;
    tradeLoan.returnDate = req.body.returnDate;
    tradeLoan.points = req.body.points;
     
    try {
        const userOfering = await User.findById({_id:req.user.id});
        if (userOfering == null) res.status(404).json({error:"userOfering not found"});
      
        const userTaking = await User.findById({_id:req.body.userTaking});
        if (userTaking == null) res.status(404).json({error:"userTaking not found"});

        if (req.user.id == req.body.userTaking) res.status(404).json({error:"userTaking == userOfering"});
       
        const product = await Product.findById({_id:req.body.product, userId: req.user.id});
        if (product == null) res.status(404).json({error:"product not found"});

        if (tradeLoan.publishingDate > req.body.returnDate) res.status(404).json({error:"returnDate invalid"});
  
        if (userTaking.ecoPoints < tradeLoan.points) res.status(404).json({error:"not enought points"});

        if (userOfering != null && userTaking != null && product != null && req.body.userOfering != req.body.userTaking) {
          product.state = "reserved";
          await product.save();
          await tradeLoan.save();
          adminController.increaseLoans();
          
          // ==================
          // get user rewards
          // ==================
          const userO = await User.findById({_id:req.user.id});
          const userTak = await User.findById({_id:req.body.userTaking});
          userO.loans += 1;
          let estimatedPoints = req.body.points;
          let eco = userO.ecoPoints;
          let total = 0;
          if(estimatedPoints >= 1 && estimatedPoints <= 15) total = parseFloat(eco)+parseFloat(estimatedPoints)
          else res.status(400).json({error: 'Estimated points are too high'})
          userO.ecoPoints = total;
          userTak.ecoPoints -= parseFloat(estimatedPoints);
          await userO.save();
          await userTak.save();

          // ==================
          // getRewards
          // ==================
          const userRewards = await User.findById({_id:req.user.id});
          let nloans = userRewards.loans;
          let points = userRewards.ecoPoints;
          let rewards = 0;
          if(nloans >= 3) {
            if(nloans >=3 && nloans <= 5) rewards += parseFloat(10);
            else if(nloans >= 5 && nloans <= 7) rewards += parseFloat(50);
            else if (nloans >= 7 && nloans <= 10) rewards += parseFloat(100);
            else if(nloans >= 10) rewards += parseFloat(150);

            userRewards.ecoPoints = parseFloat(points)+parseFloat(rewards)
            await userRewards.save();
          }
          // ==================
          // levelManage
          // ==================
          const userLevel = await User.findById({_id:req.user.id});
          let nivelNuevo = 0, reward = 0;
          let nivelAntiguo = userLevel.level;
          let points2 = userLevel.ecoPoints;
          if(points2 < 50) nivelNuevo = '1'; // seed semilla
          else if (points2 >= 50 && points2 < 150) nivelNuevo = '2'; //brote outbreak
          else if (points2 >= 150 && points2 < 300) nivelNuevo = '3'; // plant
          else if (points2 >= 300 && points2 < 500) nivelNuevo = '4'; // tree
          else if(points2 >= 500 && points2 < 750) nivelNuevo = '5'; // roble oak
          else if (points2 >= 750) nivelNuevo = '6'; //ecologista ecologist
          //si ha subido de nivel gana una recompensa
          if(nivelAntiguo != nivelNuevo) {
            if(nivelNuevo == '2') reward = 20;
            else if (nivelNuevo == '3') reward = 40;
            else if (nivelNuevo == '4') reward = 60;
            else if (nivelNuevo == '5') reward = 80;
            else if (nivelNuevo == '6') reward = 100;
          }
          if (reward != 0) userLevel.ecoPoints += parseFloat(reward);
          if (nivelNuevo != 0) userLevel.level = nivelNuevo;
          await userLevel.save();
        
          res.status(201).json(tradeLoan);  
     }

    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the tradeLoan');
    }
};

  exports.deleteTradeLoan = async (req, res) => {
  
    const user = await User.findById(req.user.id);
    if (user.role != 'ADMIN'){
      res.status(401).json({error: "Do not have permission"})
      return;
    }
      try {
        const tradeLoan = await TradeLoan.findByIdAndDelete({_id: req.params.id});
    
        console.log('Reading tradeLoan: ' + req.params.id);
    
        res.status(200).json(tradeLoan);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
};