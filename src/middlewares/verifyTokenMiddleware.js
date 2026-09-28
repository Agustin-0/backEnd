import { verifyToken } from "../utils/verifyToken.js";
// El middleware esta antes del controlador (controller) 

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        //leer el token desde el request
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        // Si no hay token  el token empieza con bearer, esta  conficcion falla
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(400).json({message: 
                "Token de acceso no proporcionado"})
        }
        // Separamos "bearer" del resto del token y tomamos solo el token
            
        const token = authHeader.split(" ")[1]

        // Decodificamos,
        // El mismo sistema que firmo el token es quien 
        //puede verificar si es valido o no 
        const decoded = verifyToken(token)
        console.log({decoded})
        
        // guardamos en el request del usuario el token
        req.user = decoded

        // Si salio todo bien pasamos al proximo paso
        next()

    } catch (error) {
        return res.status(404).json({ message: "Token de accesoinvaldo",
            error: error.message})
    }
} 