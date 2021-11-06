const express = require('express');
const productController = require('../controllers/apiProduct.js');
const categoryController = require('../controllers/apiCategory.js');
const userController = require('../controllers/apiUser.js');
const imageController = require('../controllers/apiImage.js');
const jwt = require('jsonwebtoken')

const { validateCreateProduct } = require('../validators/product.js');
const { validateCreateCategory } = require('../validators/category.js');
const upload = require('../config/storage.js');
const authenticateJWT = require('../config/authorization.js')

module.exports = function(app) {
  const router = express.Router();

  // ========================
  // ---- Product Routes ----
  // ========================

  // Create new product
  router.route('/product/create/')
    .post(upload.array('img', 6), (validateCreateProduct), authenticateJWT, productController.createProduct);

  router.route('/product/image/:id')
    .get(productController.getImg)

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
    .put(authenticateJWT, productController.updateProduct);

  // Update atribute state of product with id = id
  router.route('/product/updateState/:id')
    .put(authenticateJWT, productController.updateStateProduct);

  // Delete product with id = id
  router.route('/product/delete/:id')
    .delete(authenticateJWT, productController.deleteProduct);

  // Create new category
  router.route('/category/create/')
    .post(validateCreateCategory, categoryController.createCategory);

  // Read category with id = id
    router.route('/category/:id')
    .get(categoryController.readCategory);
  
  // Read all categories
  router.route('/category/')
    .get(categoryController.readAllCategories);
  
  // Update category with id = id
  router.route('/category/update/:id')
    .put(categoryController.updateCategory);
  
  // Delete category with id = id
  router.route('/category/delete/:id')
    .delete(categoryController.deleteCategory);

  // ======================
  // ---- USER  Routes ----
  // ======================

  router.route('/register')
    .post(userController.registerUser);

  router.route('/login')
    .post(userController.loginUser);


  // ======================
  // ---- Image Routes ----
  // ======================

  router.route('/image')
    .get(imageController.getAllImages)

  router.route('/image/:productId')
    .get(imageController.getProductImages)
    .post(upload.array('img',6), imageController.uploadImages)
    .delete(imageController.deleteImages)

    

  return router;
}