import express from 'express';
import bodyParser from 'body-parser'
import { userRoute } from './src/Router/useRouter.js'
import { connectDB } from './db.js';
import { PORT, SECRET } from './config.js';
import session from 'express-session';


const app = express();
connectDB()

// Middlewares -> Software del medio - Entre dos sistemas
// Parsear a json las solicitudes es indispensable para poder leer lo que llega
app.use(bodyParser.json()) //middleware a nivel global

app.use(bodyParser.urlencoded({extended: true})) //middleware a nivel global

// Generamos el uso de la sesion
app.use(
    session({
        secret: SECRET, //DATO UNICO DE NUESTRO SISTEMA
        resave: false, //evita que la sesion se vuelva a guardar si no hay datos
        saveUninitialized: false, // Evita que se guarde una sesion no inicializada
    })
)

//Esto dice "Si la peticion empieza por '/api/users' dejala pasar por las hacia las rutas
// definidas en userRoute"
app.use("/api/users", userRoute)

app.listen( PORT, () => {
    console.log(`Example app listen in port ${PORT}`)
});