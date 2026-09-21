import mongoose from "mongoose";
import { MONGODB_URI, UTN_DB} from "./config.js"

export const connectDB = async () => {
    try {
        // Nos conectamos a la URI de mongoDB
        // Localhost -> 127.0.0.1
        // MONGODB_URI -> mongodb://localhost:port y la database_name es UTN_DB
        await mongoose.connect(`${MONGODB_URI}/${UTN_DB}`)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to database", error)
        // Para salir de la ejecucion
        process.exit(1)
    }
}