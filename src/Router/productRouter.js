import express from 'express';
import { createProduct, getProduct } from '../controllers/productController.js';

export const productRoute = express.Router()

//EndPoints

productRoute.get("/", getProduct)
productRoute.post("/create", createProduct)
