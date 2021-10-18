const express = require('express');
const productController = require('../controllers/api.js');
const categoryController = require('../controllers/apiCategory.js');
const { validateCreateProduct } = require('../validators/product.js');

module.exports = function(app) {
  const router = express.Router();

  // Create Product
  router.route('/product/create/')
    .post((validateCreateProduct), productController.createProduct);
    
  // Read Product
  router.route('/product/:id')
    .get(productController.readProduct);
  router.route('/product/')
    .get(productController.readAllProducts);

  // Update Product
  router.route('/product/update/:id')
    .put(productController.updateProduct);

  // Delete Product
  router.route('/product/delete/:id')
    .delete(productController.deleteProduct);

  router.route('/category/create/')
    .post(validateCreateCategory, categoryController.createCategory);
    // Create Category
  router.route('category/:id')
    .get(categoryController.readCategory);

  router.route('/category/')
    .post(categoryController.readAllCategories);
  
  router.route('/category/update/:id')
    .put(categoryController.updateCategory);
  
  router.route('category/delete/:id')
    .delete(categoryController.deleteCategory);

  return router;
}