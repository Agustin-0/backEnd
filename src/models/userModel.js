import mongoose from "mongoose";
import { isGoodPassword } from '../utils/validators.js';
import bcrypt from 'bcrypt'

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: 'noName',
        minLength: 2,
        maxLength: 20,
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true, 
        minLength: 2,
        maxLength: 20,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 6,
        trim: true,
        lowercase: true,
        // Se asegura que el email no se repita
        unique: true,
        // Se asegura que sea un mail valido, con @, .
        match: /^\S+@\S+\.\S+$/, 
    },
    age: {
        type: Number,
        required: true,
        minLength: 16,
        maxLength: 120,
    },
    password: {
        required: true,
        type: String,
        validate:{
            validator: function(value){
                return isGoodPassword(value)
            }
        }
        
    }
}, {timestamps: true})

// Mongoose permite encriptar antes de guardar la password
userSchema.pre("save", function (next) {
    // Encriptamos la password antes de guardarla
    this.password = bcrypt.hashSync(this.password, 10)
})


//faltaria agregar encryptacion a la contraseña

// exporto por defecto el resultado de monoose.model()
export default mongoose.model("user", userSchema)
