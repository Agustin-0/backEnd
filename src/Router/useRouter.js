import express from 'express';
import { createUser, deleteUser, getUsers, updateUser, validate} from '../controllers/userController.js';

export const userRoute = express.Router()

// Los endpoints -> http://localhost:3001/api/user/create

//Endpoints
// Verbo http +  path + controller + service
userRoute.post("/create", createUser)
userRoute.get("/getUsers", getUsers) // En esta ruta se invocaria a un una funcion de controller
userRoute.delete("/deleteUser/:id", deleteUser)
userRoute.put("/updateUser/:id", updateUser)
userRoute.post("/login", validate)
