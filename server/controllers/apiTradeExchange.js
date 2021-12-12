const TradeExchange = require('../models/tradeExchange.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
const { ObjectId } = require('mongodb');

exports.readAllTradeExchange = async (req, res) => {
    try {
      const tradeExchange = await TradeExchange.find();
  
      res.status(200).json(tradeExchange);
      
      console.log(tradeExchange);
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

    tradeExchange.userOfering = req.body.userOfering;
    tradeExchange.userTaking = req.body.userTaking;
    tradeExchange.productOfering = req.body.productOfering;
    tradeExchange.productTaking = req.body.productTaking;
   tradeExchange.publishingDate = req.body.publishingDate;
     
    try {
        const userOfering = await User.findById({_id:req.body.userOfering});
        if (userOfering == null) res.status(404).json({error:"userOfering not found"});
      
        const userTaking = await User.findById({_id:req.body.userTaking});
        if (userTaking == null) res.status(404).json({error:"userTaking not found"});

        if (req.body.userOfering == req.body.userTaking) res.status(404).json({error:"userTaking == userOfering"});
       
        const productOfering = await Product.findById({_id:req.body.productOfering});
        if (productOfering == null) res.status(404).json({error:"productOfering not found"});

        const productTaking = await Product.findById({_id:req.body.productTaking});
        if (productTaking == null) res.status(404).json({error:"productTaking not found"}); 

      //caldrà comprovar que es tenen prous punts i que el producte pertany a ususari dels dos ususaris
     /* const userHasProduct = await User.hasProduct(_id:req.body.userOfering, product:req.body.product)
      if (!userHasProduct) --> error 
      userHasEnoughtPoints --> check ---> error
      --> cal assignar points, que sigui obligatori i que al acabar el creat faci les sumes/restes corresponents als usuaris (sum_points i checkEnoguthPoints)
      */
  
        if (userOfering != null && userTaking != null && productOfering != null && productTaking  != null && req.body.userOfering != req.body.userTaking) {
          const newProduct = await tradeExchange.save();
          res.status(201).json(tradeExchange);  
     }

    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the tradeExchange');
    }
};
  
  exports.updateTradeExchange = async (req, res) => {
  
};

  exports.deleteTradeExchange = async (req, res) => {
  
      try {
        const tradeExchange = await TradeExchange.findByIdAndDelete({_id: req.params.id});
    
        console.log('Reading tradeExchange: ' + req.params.id);
    
        res.status(200).json(tradeExchange);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
};