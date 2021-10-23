import express from "express";
import {validateCreateProduct} from '../validators/product.js';

import {
  readAllProducts,
  createProduct,
  readProduct,
  readProductsFiltered,
  updateProduct,
  deleteProduct,
} from "../controllers/api.js";

const router = express.Router();

// http://localhost:5000/api/product/...

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

export default router;
