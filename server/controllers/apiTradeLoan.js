const TradeLoan = require('../models/tradeLoan.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');
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
     
    try {
        const userOfering = await User.findById({_id:req.user.id});
        if (userOfering == null) res.status(404).json({error:"userOfering not found"});
      
        const userTaking = await User.findById({_id:req.body.userTaking});
        if (userTaking == null) res.status(404).json({error:"userTaking not found"});

        if (req.user.id == req.body.userTaking) res.status(404).json({error:"userTaking == userOfering"});
       
        const product = await Product.findById({_id:req.body.product});
        if (product == null) res.status(404).json({error:"product not found"});

        if (tradeLoan.publishingDate > req.body.returnDate) res.status(404).json({error:"returnDate invalid"});

      //caldrà comprovar que es tenen prous punts i que el producte pertany a ususari
     /* const userHasProduct = await User.hasProduct(_id:req.body.userOfering, product:req.body.product)
      if (!userHasProduct) --> error 
      userHasEnoughtPoints --> check ---> error
      --> cal assignar points, que sigui obligatori i que al acabar el creat faci les sumes/restes corresponents als usuaris (sum_points i checkEnoguthPoints)
      */
     //caldira afegir un vector de productes alquilats al usertaking i un de deixats al userofering? 
     //caldria fer l'operacio per tornar un producte
  
        if (userOfering != null && userTaking != null && product != null && req.body.userOfering != req.body.userTaking) {
          const newProduct = await tradeLoan.save();
          res.status(201).json(tradeLoan);  
     }

    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the tradeLoan');
    }
};

  exports.deleteTradeLoan = async (req, res) => {
  
    if ('ADMIN' != req.user.role) {
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