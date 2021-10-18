const express = require('express');
const productController = require('../controllers/api.js');
const router = express.Router();

// http://localhost:5000/api/product/...

router.route('/register').post(productController.registerUser);
router.route('/login').post(productController.loginUser);

module.exports = router;