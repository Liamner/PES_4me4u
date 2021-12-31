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

exports.getProductCategory2 = async (req, res) => {
  let category = null;
  if (req.query.category) category = req.query.category;
  let exchangeType = null;
  if (req.query.exchange){ console.log('in');exchangeType = req.query.exchange;}
  let productName = null;
  if (req.query.productName) productName = req.query.productName;
  try {
    if (productName != null && exchangeType != null && category != null) {
      await Product.find({name: {$regex : productName}, categories: category, exchange : exchangeType}, (error, products) => {
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (category != null && exchangeType != null) {
      await Product.find({exchange : exchangeType, categories: category}, (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (productName != null && category != null) {
      await Product.find({name: {$regex : productName}, categories: category}, (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (productName != null && exchangeType != null) {
      await Product.find({name: {$regex : productName}, exchange : exchangeType}, (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (productName != null) {
        const products = await Product.find({name: {$regex : productName}})
        res.status(200).json(products);
    }
    else if (category != null) {
      await Category.find({name: category}, {products: 1}, async (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products[0].products);
      }).populate({path: 'products', populate: {path: 'img', select: { 'url': 1}} }).clone()
    }
    else if (exchangeType != null) {      
      await Product.find({exchange: exchangeType} ,(error, products) => { 
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else {
      res.status(200).json()
    }
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}

exports.getProductCategory = async (req, res) => {
  const category = req.body.category;
  let exchangeType = null;
  if (req.body.exchange != null) exchangeType = req.body.exchange;

  let productName = null;
  if (req.body.productName != null) productName = req.body.productName;

  try {
    if (productName != null && exchangeType != null && category != null) {
      await Product.find({name: {$regex : productName}, categories: category, exchange : exchangeType}, (error, products) => {
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (category != null && exchangeType != null) {
      await Product.find({exchange : exchangeType, categories: category}, (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (productName != null && category != null) {
      await Product.find({name: {$regex : productName}, categories: category}, (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (productName != null && exchangeType != null) {
      await Product.find({name: {$regex : productName}, exchange : exchangeType}, (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
    else if (productName != null) {
        const products = await Product.find({name: {$regex : productName}})
        res.status(200).json(products);
    }
    else if (category != null) {
      await Category.find({name: category}, {products: 1}, async (error, products) => {
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products[0].products);
      }).populate({path: 'products', populate: {path: 'img', select: { 'url': 1}} }).clone()
    }
    else if (exchangeType != null) {      
      await Product.find({exchange: exchangeType} ,(error, products) => { 
        if (error) {
          return res.status(500).json({ok: false, err: erro})
        }
        res.status(200).json(products);
      }).populate({path: 'img', select: { 'url': 1}}).clone()
    }
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}