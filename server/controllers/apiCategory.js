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

  try {
    //const products = await Category.find({name: category},  {products: 1 }).populate('products').populate('exchange');
    //const products = await Category.find({name: category},  {products: 1 })//.populate('products');
    if (category != null) {
      Category.find({name: category}, {products: 1}, async (erro, products) => {
        console.log(products[0]._id)
        res.status(200).json(products);
      }).populate('products')
    }
    
   
    
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}