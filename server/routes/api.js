const express = require('express');
const productController = require('../controllers/apiProduct.js');
const categoryController = require('../controllers/apiCategory.js');
const userController = require('../controllers/apiUser.js');
const imageController = require('../controllers/apiImage.js');
const typeController = require('../controllers/apiType.js');
const jwt = require('jsonwebtoken')

const { validateCreateProduct } = require('../validators/product.js');
const { validateCreateCategory } = require('../validators/category.js');
const { validateCreateType } = require('../validators/type.js');
const upload = require('../config/storage.js');
const authenticateJWT = require('../config/authorization.js')


module.exports = function(app) {
  const router = express.Router();

  // ========================
  // ---- Product Routes ----
  // ========================

  // Create new product
  router.route('/product/create/')
    .post(upload.array('img', 6), /*(validateCreateProduct), authenticateJWT, */productController.createProduct);

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

   // Read products filtered
   router.route('/byCategory/product/')
   .get(productController.readProductsFilteredCategory);

  // Read products filtered
  router.route('/byType/product/')
  .get(productController.readProductsFilteredType);

  // Update product with id = id
  router.route('/product/update/:id')
    .put(/*authenticateJWT, */ productController.updateProduct);

  // Update atribute state of product with id = id
  router.route('/product/updateState/:id')
    .put(/*authenticateJWT, */productController.updateStateProduct);

  // Delete product with id = id
  router.route('/product/delete/:id')
    .delete(/*authenticateJWT, */productController.deleteProduct);

  router.route('/product/name/:name')
    .get(productController.readProductsByName)

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

  // Create new type
  router.route('/type/create/')
    .post(validateCreateType, typeController.createType);

  // Read type with id = id
  router.route('/type/:id')
    .get(typeController.readType);

  // Read all types
  router.route('/type/')
    .get(typeController.readAllTypes);

  // Update type with id = id
  router.route('/type/update/:id')
    .put(typeController.updateType);

  // Delete type with id = id
  router.route('/type/delete/:id')
    .delete(typeController.deleteType);

    
  // ======================
  // ---- USER  Routes ----
  // ======================

  router.route('/register')

    .post(userController.registerUser);

  router.route('/login')
    .post(userController.loginUser);


  router.route('/deleteUser/:id')
    .delete(userController.deleteUser);

  // Update user with id = id
  router.route('/user/update/:id')
    .put(userController.updateUser);

  // Read all products
  router.route('/user/')
    .get(userController.readAllUsers);

  router.route('/ids/user/')
    .get(userController.readUsersId);

  router.route('/user/:id')
    .get(userController.readUser);
  
  router.route('/user/:id/products')
    .get(userController.getUserProducts)
    


  // ======================
  // ---- Image Routes ----
  // ======================

  router.route('/image')
    .get(imageController.getAllImages)

  router.route('/image/:productId')
    .get(imageController.getProductImages)
    .post(upload.array('img',6), /*authenticateJWT, */ imageController.uploadImages)
    .delete(/*authenticateJWT, */ imageController.deleteImages)
    .put(upload.array('img',6), /*authenticateJWT, */ imageController.updateImages)

  router.route('/product/:category')
    .get(producController.getProducCategory)

  return router;
}