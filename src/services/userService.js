import { SECRET } from '../../config.js';
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

// Validamos el usuario
export const validateUserService = async ( email, password ) => {
    // VAlidamos que ambos campoes existan  y sean correctos
    if( !(email && password)){
        const error = new Error("there's a missing field")
        error.statusCode = 400;
        throw error
    }
    // El email es unico y es un identificador de usuario.
    const userFound = await User.findOne({email})
    if(!userFound){
        const error = new Error("User or password are incorrect")
        error.statusCode = 400;
        throw error
    }

    // comparamos la password que llega contra la de DB
    // compareSync toma la contraseña que llego desde el front y la comprara
    //contra la de la DB
    if(!bcrypt.compareSync(password, userFound.password)){
        const error = new Error("User or password are incorrect")
        error.statusCode = 400;
        throw error
    }

    //Generamos el payload
    // el payload es la informacion que guardamos en el token
    const payload = {
        userId: userFound._id,
        userEmail: userFound.email
    }

    //El token debe ser firmado para tener validez
    // Firma tiene: 1. payload, 2. "secret", 3. duracion
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h"})

    return { message: "logged in", token }
}