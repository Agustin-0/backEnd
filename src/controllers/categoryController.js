import { createCategoryService, deleteCategoryService, getCategoriesService } from "../services/categoryService.js"

export const createCategory = async (req, res) => {
    try {
        const name = req.body.name
        console.log({req})
        const savedCategory = await createCategoryService(name)
        res.status(201).json({meesage: "new category created", date: savedCategory })
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService()
        return res.status(200).json(categories)
    } catch (error) {
        // Si vos tenes un error conocido debes tener casos especificos para ese error
        if( error.statusCode === 204){ // como tiramos un 204 en el servicio lo manejamos aca
            return res.status(204).json({message: error.message })// poner 204 es redundante, podrias poner  "error.statusCode" que es lo mismo
        }
        return res.status(500).json({message: "Internal server error", error: error.message }) // error mas generico
    }
} 

export const deleteCategory = async (req, res) => {
   try {
       const categoryId = req.params.id
        const deletedCategory = await deleteCategoryService(categoryId)
        return res.status(200).json(deletedCategory)
   } catch (error) {
    if(error.statusCode === 400){
        return res.status(error.statusCode).json({message: error.message })
    }
   }
   return res.status(500).json({message: "Internal server error", error: error.message }) 
}