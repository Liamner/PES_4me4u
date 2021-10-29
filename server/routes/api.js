const express = require('express');
const productController = require('../controllers/apiProduct.js');
const categoryController = require('../controllers/apiCategory.js');
const userController = require('../controllers/apiUser.js');

const { validateCreateProduct } = require('../validators/product.js');
const { validateCreateCategory } = require('../validators/category.js');
const upload = require('../libs/storage.js');

module.exports = function(app) {
  const router = express.Router();

  // Create new product
  router.route('/product/create/')
    .post(upload.single('img'), (validateCreateProduct), productController.createProduct);

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

  router.route('/register')
    .post(userController.registerUser);

  router.route('/login')
    .post(userController.loginUser);

  // Update user with id = id
  router.route('/user/update/:id')
    .put(userController.updateUser);

  // Read Product with id = id
  router.route('/user/:id')
    .get(userController.readUser);

  // Read all products
  router.route('/user/')
    .get(userController.readAllUsers);

  router.route('/ids/user/')
    .get(userController.readUsersId);

  return router;
}