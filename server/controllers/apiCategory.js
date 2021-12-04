const Category = require('../models/category.js');

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

  console.log(exchangeType)
  try {
    //const products = await Category.find({name: category},  {products: 1 }).populate('products').populate('exchange');
    //const products = await Category.find({name: category},  {products: 1 })//.populate('products');
    let result = [];
    if (category != null) {
      Category.find({name: category}, {products: 1}, async (erro, products) => {
        console.log(products[0].products.length)
       
        if (exchangeType != null) {
          for (let i = 0; i < products[0].products.length; i++) {
            if (products[0].products[i].exchange[0].name == exchangeType) {
              console.log('igual')
              result.push(products[0].products[i])
            }
            //console.log(products[0].products[i].exchange[0].name)
          }
          res.status(200).json(result);
        }
        else {
          res.status(200).json(products);
        }
        
      }).populate({path: 'products',populate: {path: 'exchange', select: { 'name': 1}}})
    }
    
   
    
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}