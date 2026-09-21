# Mi primer backEnd 
## Usa el patron de arquitectura MVC

## Variables de entorno

Este proyecto esta pensado para trabajar de manera local, ni pense en usar mongoAtlas por lo que quizas haya que cambiar un par de cosas si queres hacer eso.

### Como funciona delete user

El secreto está en la ruta, no en el controlador:
// userRoute.js:16
userRoute.delete("/deleteUser/:id", deleteUser)
Express toma la URL y la separa en dos partes:
1. El path fijo → /api/user/deleteUser (fijo, escrito literal)
2. El path param → /:id (los dos puntos marcan una variable)
Cuando llega una petición como DELETE /api/user/deleteUser/5, Express parsea la URL, detecta que :id está en el mismo lugar donde viene el valor 5, y guarda ese valor en un objeto que inyecta en la request:
req.params = { id: "5" }
Por eso en el controlador (userController.js:41) solo se lee:
const userId = req.params.id  // → "5"
Y ese userId se pasa al servicio deleteUserService(userId) para borrar el registro.
Flujo completo
Cliente: DELETE /api/user/deleteUser/5
   ↓
Express busca la ruta que matchee "deleteUser/:id"
   ↓
Captura el valor "5" en req.params.id
   ↓
Llama a deleteUser(req, res)   ← el controlador
   ↓
req.params.id = "5" → deletUserService("5")
   ↓
res.status(200).json({ result })
Puntos clave
- Los dos puntos (:id) en la ruta son lo que hace que Express capture ese segmento de la URL como parámetro dinámico.
- El nombre que le pongas (:id, :userId, :slug) debe coincidir con req.params.<eseNombre>.
- El valor siempre llega como string ("5"), aunque sea un número.
- A diferencia de los datos del body (que van en req.body desde el JSON), los param vienen "pegados" en la URL, por eso se leen de req.params.
La ruta que tenés en el comentario (api/user/delete/:id) no coincide con lo que realmente está en el archivo (api/user/deleteUser/:id), pero el mecanismo es idéntico.