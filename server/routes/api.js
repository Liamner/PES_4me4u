import express from "express";
import {validateCreateProduct} from '../validators/product.js';
import {validateCreateCategory} from '../validators/category.js';

import {
  readAllProducts,
  createProduct,
  readProduct,
  readProductsFiltered,
  updateProduct,
  deleteProduct,
} from "../controllers/apiProduct.js";

import {
  readAllCategories,
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/apiCategory.js";

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

// Create Category
router.post("/category/create/", validateCreateCategory, createCategory);

// Read Category
router.get("/category/:id", readCategory);
router.get("/category/", readAllCategories);

// Update Category
router.put("/category/update/:id", updateCategory);

// Delete Category
router.delete("/category/delete/:id", deleteCategory);


export default router;
