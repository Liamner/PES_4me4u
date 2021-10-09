import express from "express";

import { readAllProducts, createProduct, readProduct, readProductsFiltered } from "../controllers/api.js";

const router = express.Router();

// http://localhost:5000/api/product/...

router.get("/product/", readAllProducts);
router.get('/product/:filter', readProductsFiltered);
router.get("/product/:title", readProduct);
router.post("/product/:title&:description&:filter", createProduct);

export default router;
