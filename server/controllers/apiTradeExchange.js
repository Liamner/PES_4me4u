const TradeExchange = require('../models/tradeExchange.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const { ObjectId } = require('mongodb');

exports.readAllTradeExchange = async (req, res) => {
    try {
      const tradeExchange = await TradeExchange.find();
  
      res.status(200).json(tradeExchange);
      
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
};
  
  exports.readTradeExchange = async (req, res) => {
    try {
      const tradeExchange = await TradeExchange.findById({_id: req.params.id});
  
      console.log('Reading TradeExchange: ' + req.params.id);
  
      res.status(200).json(tradeExchange);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
};
  
  exports.createTradeExchange = async (req, res) => {
    const tradeExchange = new TradeExchange();

    tradeExchange.userOfering = req.user.id;
    tradeExchange.userTaking = req.body.userTaking;
    tradeExchange.productOfering = req.body.productOfering;
    tradeExchange.productTaking = req.body.productTaking;
    tradeExchange.publishingDate = req.body.publishingDate;
    tradeExchange.points = req.body.points; 
     
    try {
        const userOfering = await User.findById({_id:req.user.id});
        if (userOfering == null) res.status(404).json({error:"userOfering not found"});
      
        const userTaking = await User.findById({_id:req.body.userTaking});
        if (userTaking == null) res.status(404).json({error:"userTaking not found"});

        if (req.user.id == req.body.userTaking) res.status(404).json({error:"userTaking == userOfering"});
       
        const productOfering = await Product.findById({_id:req.body.productOfering, userId: req.user.id});
        if (productOfering == null) res.status(404).json({error:"productOfering not found"});

        const productTaking = await Product.findById({_id:req.body.productTaking, userId: req.body.userTaking});
        if (productTaking == null) res.status(404).json({error:"productTaking not found"}); 
        
        if (userTaking.points < tradeExchange.points) res.status(404).json({error:"not enought points"});
        
        if (userOfering != null && userTaking != null && productOfering != null && productTaking  != null && req.body.userOfering != req.body.userTaking) {
          product.state = "reserved";
          await product.save();
          // UserTaking.getUserRewards();
          // UserOfering.getUserRewards();
          // UserTaking.getRewards();
          // UserOfering.getRewards();
          // UserTaking.levelManage();
          // UserOfering.levelManage();
          await tradeExchange.save();
          res.status(201).json(tradeExchange);  
     }

    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the tradeExchange');
    }
};

  exports.deleteTradeExchange = async (req, res) => {
    
   /* if ('ADMIN' != req.user.role) {
      res.status(401).json({error: "Do not have permission"})
      return;
    }*/

    const user = await User.findById(req.user.id);
    if (user.role != 'ADMIN'){
      res.status(401).json({error: "Do not have permission"})
      return;
    }
    
      try {
        const tradeExchange = await TradeExchange.findByIdAndDelete({_id: req.params.id});
    
        console.log('Reading tradeExchange: ' + req.params.id);
    
        res.status(200).json(tradeExchange);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
};