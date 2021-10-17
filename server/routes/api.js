const express = require('express');
const productController = require('../controllers/api.js');
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
  return router;
}

/*
// http://localhost:5000/api/product/...
// Read Product
router.get("/product/filter/:filter", productController.readProductsFiltered);
*/