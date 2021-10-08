import express from "express";

import { readAllProducts, createProduct, readProduct } from "../controllers/api.js";

const router = express.Router();

// http://localhost:5000/api/
router.get("/", readAllProducts);
router.get("/:title", readProduct);
router.post("/:title", createProduct);

export default router;
