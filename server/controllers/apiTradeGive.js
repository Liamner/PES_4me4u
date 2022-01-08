const TradeGive = require('../models/tradeGive.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const { ObjectId } = require('mongodb');

exports.readAllTradeGive = async (req, res) => {
    try {
      const tradeGive = await TradeGive.find();
  
      res.status(200).json(tradeGive);
      
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
};
  
  exports.readTradeGive = async (req, res) => {
    try {
      const tradeGive = await TradeGive.findById({_id: req.params.id});
  
      console.log('Reading TradeGive: ' + req.params.id);
  
      res.status(200).json(tradeGive);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
};
  
  exports.createTradeGive = async (req, res) => {
    const tradeGive = new TradeGive();

    tradeGive.userOfering = req.user.id;
    tradeGive.userTaking = req.body.userTaking;
    tradeGive.product = req.body.product;
    tradeGive.publishingDate = req.body.publishingDate;
    tradeGive.points = req.body.points;
    try {
        const userOfering = await User.findById({_id:req.user.id});
        if (userOfering == null) res.status(404).json({error:"userOfering not found"});
      
        const userTaking = await User.findById({_id:req.body.userTaking});
        if (userTaking == null) res.status(404).json({error:"userTaking not found"});

        if (req.user.id == req.body.userTaking) res.status(404).json({error:"userTaking == userOfering"});
       
        const product = await Product.findById({_id:req.body.product, userId: req.user.id});
        if (product == null) res.status(404).json({error:"product not found"});

        if (userTaking.points < tradeGive.points) res.status(404).json({error:"not enought points"});
        
        if (userOfering != null && userTaking != null && product != null && req.body.userOfering != req.body.userTaking) {
          product.state = "reserved";
          await product.save();
          // UserTaking.getUserRewards();
          // UserOfering.getUserRewards();
          // UserTaking.getRewards();
          // UserOfering.getRewards();
          // UserTaking.levelManage();
          // UserOfering.levelManage();
          await tradeGive.save();
          res.status(201).json(tradeGive);  
     }

    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the tradeGive');
    }
};
  
  exports.deleteTradeGive = async (req, res) => {

    /*if ('ADMIN' != req.user.role) {
      res.status(401).json({error: "Do not have permission"})
      return;
    }*/

    const user = await User.findbyId(req.user.id);
    if (user.role != 'ADMIN'){
      res.status(401).json({error: "Do not have permission"})
      return;
    }
    
      try {
        const tradeGive = await TradeGive.findByIdAndDelete({_id: req.params.id});
    
        console.log('Reading tradeGive: ' + req.params.id);
    
        res.status(200).json(tradeGive);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
};