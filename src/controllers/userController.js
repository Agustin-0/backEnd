import { createUserService, getUsersService, deleteUserService, updateUserService, validateUserServide } from "../services/userService.js"
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
    try {
    const userId = req.params.id
    const result = await deleteUserService(userId)
    return res.status(200).json(result)   
    } catch (error) {
    if(error.statusCode === 404){
            return res.status(error.statusCode).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message }) 
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id 
        // Siempre que editamos necesitamos el id y los nuevos datos
       const updatedUser = await updateUserService(userId, req.body)
       console.log(updatedUser, "desde el controller")
       return res.status(201).json(updatedUser)
    } catch (error) {
        if(error.statusCode === 404){
            return res.status(404).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const validate = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await validateUserServide(email, password);
        return res.status(200).json(result)
    } catch (error) {
        if(error.statusCode === 400) {
            return res.status(400).json({message: error.message})
        }
        return res.status(500).json({message: "internal server error", error: error.message})
    }
}