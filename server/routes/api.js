import express from "express";

import { mainPage } from "../controllers/api.js";

const router = express.Router();

// Main Page
// http://localhost:5000/api/
router.get("/", mainPage);

export default router;
