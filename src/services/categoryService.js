import Category from "../models/categoryModel.js";

export const createCategoryService = async (name) => {
    const newCategory = new Category({ name : name }) // aca podrias poner solo name  y se sobreentiende que tienen el mismo nombre
    const savedCategory= await newCategory.save()
    return savedCategory
}

export const getCategoriesService = async() => {
    const categories = await Category.find()
    if( categories.length === 0 ){ 
        const error = new Error("There are no categories") // es es el message: error.message  de controller
        console.log({...error})
        error.statusCode = 204;// como aca tiramosun 204 en el controlador tiene que poder manejarlo, y el controlador lo puede señalar
        throw error;
    }
    return categories;
}

export const deleteCategoryService = async(id) => {
   const categoryExist = await Category.findOne({ _id: id })

    if(!categoryExist){
       const error = new Error( `Category with ${id} doesn't exist`)
        error.statusCode = 400
        throw error
    }

   const deletedCategory = await Category.deleteOne({ _id: id })
   return {categoryDeleted: categoryExist}
}