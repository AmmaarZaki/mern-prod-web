import express from "express";
import { 
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
 } from "../controllers/products.controller.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/products", getAllProducts);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;