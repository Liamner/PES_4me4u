const express = require('express');
const productController = require('../controllers/apiProduct.js');
const categoryController = require('../controllers/apiCategory.js');
const userController = require('../controllers/apiUser.js');
const typeController = require('../controllers/apiType.js');

const { validateCreateProduct } = require('../validators/product.js');
const { validateCreateCategory } = require('../validators/category.js');
const { validateCreateType } = require('../validators/type.js');
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

   // Read products filtered
   router.route('/filtered/product/')
   .get(productController.readProductsFiltered);

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
 
    router.route('/register')
    .post(userController.registerUser);

  router.route('/login')
    .post(userController.loginUser);

  return router;
}