const express = require('express');
const validateCreateProduct = require('../validators/product.js');
const { readAllProducts,
  createProduct,
  readProduct,
  readProductsFiltered,
  updateProduct,
  deleteProduct} = require('../controllers/api.js');
const Product = require('../models/product.js');

  module.exports = function(app, express) {
    const router = express.Router();

    // http://localhost:5000/api/product/...

    // Create Product
    router.route('/product/create/')
      .post(async (req, res) => {
        const {
          name,
          categories,
          description,
          publishingDate,
          exchange,
          img,
          state,
          owner,
        } = req.body;
        const product = new Product();
        product.name = name;
        product.categories = categories;
        product.description = description;
        product.publishingDate = publishingDate;
        product.exchange = exchange;
        product.img = img;
        product.state = state;
        product.owner = owner;
      
        console.log(product);
      
        try {
          await product.save();
      
          res.status(201).json(product);
        } catch (error) {
          res.status(409).json(error.message);
      
          console.log("Can not create the Product");
        }
      });
    //router.post("/product/create/", validateCreateProduct, createProduct);

    // Read Product
    router.get("/product/:id", readProduct);
    router.get("/product/", readAllProducts);
    router.get("/product/filter/:filter", readProductsFiltered);

    // Update Product
    router.put("/product/update/:id", updateProduct);

    // Delete Product
    router.delete("/product/delete/:id", deleteProduct);

    return router;
  }

