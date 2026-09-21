import express from 'express';
import { userRoute } from './src/Router/useRouter.js'
import { connectDB } from './db.js';
import { PORT } from './config.js';
import bodyParser from 'body-parser'

const app = express();
connectDB()

// Middlewares -> Software del medio - Entre dos sistemas
// Parsear a json las solicitudes es indispensable para poder leer lo que llega
app.use(bodyParser.json())

//Esto dice "Si la peticion empieza por '/api/users' dejala pasar por las hacia las rutas
// definidas en userRoute"
app.use("/api/users", userRoute)

app.listen( PORT, () => {
    console.log(`Example app listen in port ${PORT}`)
});