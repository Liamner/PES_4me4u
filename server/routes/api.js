const express = require('express');
const productController = require('../controllers/apiProduct.js');
const categoryController = require('../controllers/apiCategory.js');
const { validateCreateProduct } = require('../validators/product.js');
const { validateCreateCategory } = require('../validators/category.js');

module.exports = function(app) {
  const router = express.Router();


  // Create new product
  router.route('/product/create/')
    .post((validateCreateProduct), productController.createProduct);
    
  // Read Product with id = id
  router.route('/product/:id')
    .get(productController.readProduct);
  
  // Read all products
  router.route('/product/')
    .get(productController.readAllProducts);
 
  router.route('/ids/product/')
    .get(productController.readProductsId);

  // Update product with id = id
  router.route('/product/update/:id')
    .put(productController.updateProduct);

  // Update atribute state of product with id = id
  router.route('/product/updateState/:id')
    .put(productController.updateStateProduct);

  // Delete product with id = id
  router.route('/product/delete/:id')
    .delete(productController.deleteProduct);

  // Create new category
  router.route('/category/create/')
    .post(validateCreateCategory, categoryController.createCategory);

  // Read category with id = id
    router.route('category/:id')
    .get(categoryController.readCategory);
  
  // Read all categories
  router.route('/category/')
    .post(categoryController.readAllCategories);
  
  // Update category with id = id
  router.route('/category/update/:id')
    .put(categoryController.updateCategory);
  
  // Delete category with id = id
  router.route('category/delete/:id')
    .delete(categoryController.deleteCategory);

  return router;
}

