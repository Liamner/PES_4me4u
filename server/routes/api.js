import express from "express";

import { readAllProducts, createProduct, readProduct, readProductsFiltered, updateProduct , createUser} from "../controllers/api.js";

//import user from "../controllers/api.js";

const router = express.Router();

// http://localhost:5000/api/product/...

// Create Product
router.post("/product/create/:title&:description", createProduct);

//Create User
router.post("/user/create/:userId&:email&:pwd", createUser);

// Read Product
router.get("/product/:id", readProduct);
router.get("/product/", readAllProducts);
router.get('/product/filter/:filter', readProductsFiltered);

// Update Product
router.put('/product/update/:id', updateProduct);

export default router;