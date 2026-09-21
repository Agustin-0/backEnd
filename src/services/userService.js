import User from '../models/userModel.js'

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