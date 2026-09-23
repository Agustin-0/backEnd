import express from 'express';
import bodyParser from 'body-parser'
import { userRoute } from './src/Router/useRouter.js'
import { connectDB } from './db.js';
import { PORT } from './config.js';
import session from 'express-session';


const app = express();
connectDB()

// Middlewares -> Software del medio - Entre dos sistemas
// Parsear a json las solicitudes es indispensable para poder leer lo que llega
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

// Generamos el uso de la sesion
app.use(
    session({
        secret: "secret", // Dato unico de nuestro sistema, sirve para firmar la sesion y que no pueda ser modificada
        resave: false, // Evita que la sesion se vuelva a guardar si no hay datos(para seguridad)
        saveUninitialized: false, // Evita que se guarde una sesion no inicializada(para seguridad)
    })
)

//Esto dice "Si la peticion empieza por '/api/users' dejala pasar por las hacia las rutas
// definidas en userRoute"
app.use("/api/users", userRoute)

app.listen( PORT, () => {
    console.log(`Example app listen in port ${PORT}`)
});