const Category = require('../models/category.js');
const Product = require('../models/product.js');

exports.readAllCategories = async (req, res) => {
    try {
      const category = await Category.find();
  
      res.status(200).json(category);
      
      console.log(category);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  };
  
  exports.readCategory = async (req, res) => {
    try {
      const category = await Category.findById({_id: req.params.id});
  
      console.log('Reading category: ' + req.params.id);
  
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
  }                                  
  
  exports.createCategory = async (req, res) => {

    const category = new Category();
    category.name = req.body.name;
   
    console.log(category);
  
    try {
      await category.save();
  
      res.status(201).json(category);
    } catch (error) {
      res.status(409).json(error.message);
      
      console.log('Can not create the Category');
    }
  }
  
  exports.updateCategory = async (req, res) => {
  
  }

  exports.deleteCategory = async (req, res) => {
  
      try {
        const category = await Category.findByIdAndDelete({_id: req.params.id});
    
        console.log('Reading category: ' + req.params.id);
    
        res.status(200).json(category);
      } catch (error) {
        res.status(404).json(error.message);
        console.log(error.message);
      }
}

exports.getProductCategory = async (req, res) => {
  
  console.log('Reading category: ' + req.body.category);
  const category = req.body.category;
  let exchangeType;
  if (req.body.exchange != null) exchangeType = req.body.exchange;
  else exchangeType = null;
  let title;
  if (req.body.name != null) title = req.body.name;
  else title = null;

  console.log(exchangeType)
  try {
    if (category != null && exchangeType != null) {
      if (exchangeType == 'present') exchangeType = '6193a583e47e769eeaa7a978';
      else if (exchangeType == 'provide') exchangeType = '61abaf87aa37fa1150ceff62';
      await Category.find({name: category, exchange : exchangeType}, {products: 1}, async (erro, products) => {
        console.log(products[0].products[0])
        res.status(200).json(products[0]);
      }).populate({path: 'products', populate: {path: 'exchange', select: { 'name': 1}}, populate: {path: 'img', select: { 'url': 1}} }).clone()
    }
    else if (title != null) {
        const product = await Product.find({name: {$regex : title}})
        console.log(product)
        res.status(200).json(product);
    }
    else if (category != null) {
      await Category.find({name: category}, {products: 1}, async (erro, products) => {
        console.log(products[0].products)
        res.status(200).json(products[0]);
      }).populate({path: 'products', populate: {path: 'exchange', select: { 'name': 1}}, populate: {path: 'img', select: { 'url': 1}} }).clone()
    }
    else if (exchangeType != null) {
      // Traducir exchange por facilidad
      if (exchangeType == 'present') exchangeType = '6193a583e47e769eeaa7a978';
      else if (exchangeType == 'provide') exchangeType = '61abaf87aa37fa1150ceff62';

      await Product.find({exchange: exchangeType} ,(error, products) => {   
        res.status(200).json(products);
      }).populate({path: 'exchange'} ,{ populate: {path: 'img', select: { 'url': 1}}} ).clone()
    }   
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}