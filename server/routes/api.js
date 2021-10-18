const express = require('express');
const productController = require('../controllers/api.js');
const router = express.Router();

// http://localhost:5000/api/product/...

// Create Product
//router.post("/product/create/:title&:description", createProduct);

//Register User
//router.post("/user/create/:userId&:email&:pwd", createUser);
//router.post("/register", registerUser);
router.route('/register').post(productController.registerUser);

// Read Product
//router.get("/product/:id", readProduct);
//router.get("/product/", readAllProducts);
//router.get('/product/filter/:filter', readProductsFiltered);

// Update Product
//router.put('/product/update/:id', updateProduct);

//export default router;
module.exports = router;