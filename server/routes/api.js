import express from "express";
<<<<<<< HEAD
//import {validateCreateProduct} from '../validators/product.js';
=======
import {validateCreateProduct} from '../validators/product.js';
>>>>>>> develop

import {
  readAllProducts,
  createProduct,
  readProduct,
  readProductsFiltered,
  updateProduct,
<<<<<<< HEAD
  updateStateProduct,
=======
>>>>>>> develop
  deleteProduct,
} from "../controllers/api.js";

const router = express.Router();

// http://localhost:5000/api/product/...
<<<<<<< HEAD
=======

// Create Product
router.post("/product/create/", validateCreateProduct, createProduct);

// Read Product
router.get("/product/:id", readProduct);
router.get("/product/", readAllProducts);
router.get("/product/filter/:filter", readProductsFiltered);

// Update Product
router.put("/product/update/:id", updateProduct);

// Delete Product
router.delete("/product/delete/:id", deleteProduct);
>>>>>>> develop

// Create Product
//router.post("/product/create/", validateCreateProduct, createProduct);
router.post("/product/create/", createProduct);


// Read Product
router.get("/product/:id", readProduct);
router.get("/product/", readAllProducts);
router.get("/product/filter/:filter", readProductsFiltered);

// Update Product
router.put("/product/update/:id", updateProduct);
router.put("/product/updateState/:id", updateStateProduct);


// Delete Product
router.delete("/product/delete/:id", deleteProduct);

export default router;