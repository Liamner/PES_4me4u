import express from "express";

import { readAllProducts, createProduct, readProduct } from "../controllers/api.js";

const router = express.Router();

// Main Page
// http://localhost:5000/api/
router.get("/", readAllProducts);
router.post("/:title", createProduct);
router.get("/:title", readProduct);

export default router;
