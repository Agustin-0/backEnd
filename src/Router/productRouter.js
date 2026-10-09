import express from 'express';
import { createProduct, deleteProduct, findProductById, findProductByName, getProduct, getStatus, updateProduct } from '../controllers/productController.js';

export const productRoute = express.Router()

//EndPoints

productRoute.get("/", getProduct)
productRoute.post("/create", createProduct)
productRoute.post("/name/", findProductByName)
productRoute.get("/find-by-id/:id", findProductById)
productRoute.put("/update/:id", updateProduct)
productRoute.delete("/delete/:id", deleteProduct)
productRoute.get("/status", getStatus)
//productRoute.get("/name/:name", findProductByName)


/*
GET se puede llamar directo: fetch('/api/product/name/cama') (o ?name=cama). Cargable en el navegador, compartible por URL, y el browser puede cachear.
POST te obliga a armar el request a mano desde el front:
fetch('/api/product/name/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'cama' })
})
y ese Content-Type: application/json dispara un preflight OPTIONS en CORS. Si tu CORS no está configurado para responder OPTIONS, te va a fallar recién ahí (GET no hace preflight).
Así que sí: cuando conectes el front te vas a dar cuenta. Si te sirve POST y tu CORS está bien, seguí; si querés URLs limpias y sin preflight, GET.
*/