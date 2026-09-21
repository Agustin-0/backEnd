import { createUserService, getUsersService } from "../services/userService.js"
// Controladores: reciben las solicitudes, las procesan( las envian a servicion) y responden 

//crear usuarios
export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body)
        res.status(201).json(response) 
    } catch(error){
        return res.status(500).json({ message: "Internal server error", error: error.message})
    }
}

//traer todos los
export const getUsers = async (req, res) => {
    try{
        const users = await getUsersService()
        res.status(201).json(users)
    } catch (error) {
        console.log({error})
        if(error.statusCode === 204){

        }
    }
} 

//borrar usuario

export const deleteUser = async (req, res) => {
    const userId = req.params.id
    const result = await deleteUserService(userId)
}