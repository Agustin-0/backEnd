import User from '../models/userModel.js'
import { findUserByIdAndCheck } from '../utils/userHelpers.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUserService = async (userData) => {

    const userExits = await User.findOne({ email: userData.email });
    if(userExits){
        throw new Error("User with this email aready exists")
    }
    const newUser = new User(userData);
    await newUser.save()
    return { message: "User created" }
}

export const getUsersService = async () => {
    const users = await User.find()
    if(users.length === 0){
        //Validamos por si no hay usuarios.
        const error = new Error("There are no users")
        error.statusCode = 204
        throw error
    }
    return users
}

export const deleteUserService = async (userId) => {
    await findUserByIdAndCheck(userId)
    await User.findByIdAndDelete(userId)
    return { message: "User deleted succesfully" }
}

// Actualizar usuario
export const updateUserService = async (userId, updateData) => {
    await findUserByIdAndCheck(userId)

    // new true devuelve el documento modificado y actualizado
    // Si no lo pones te devuelve el documento viejo
    const updatedUser = await User.findByIdAndUpdate({ _id: userId  }, updateData, {new: true} )
    return updatedUser;
}

export const validateUserServide = async (email, password) => {
    if(!(email && password)){
        const error = new Error("there's a missing field")
        error.statusCode = 400
        throw error
    }

    const userFound = await User.findOne({ email })

    if(!userFound){
        const error = new Error("User or password is incorrect")
        error.statusCode = 400
        throw error
    }

    // Comparar la password que llega contra la guardada en la db
    // Encripta la password del request y la compara contra la encriptada de la db
    if(!bcrypt.compareSync(password, userFound.password)){
        const error = new Error("User or password is incorrect")
        error.statusCode = 400
        throw error
    }

    //Payload es la informacion que el cargamos al token
    const payload = {
        userId: userFound._id,
        userEmail: userFound.email
    }

    // El token tiene validez una vez firmado
    // Sign necesita: payload, secret y duracion del token
    const token = jwt.sign(payload, "secret", { expiresIn: "1h" })

    return {message: "Logged in", token}
}