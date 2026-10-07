import mongoose from "mongoose";

const categorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim:true,
        lowercase: true,
        minLength: 2,
        maxlength: 30
    },
}, {
    //Cuando se cree y se modifique se guardan los timestamps
    timestamps: true})
//El nombre del modelo "category" es el que vamos a utilizar para el ref de produtos
export default mongoose.model("category", categorSchema)