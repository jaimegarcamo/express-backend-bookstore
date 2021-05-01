//Recogemos express
const express = require('express')
//Creamos un objeto ROUTER (y le ponemos el nombre categoryRouter) donde guardaremos las rutas del controlador con los metodos GET, POST ...
const categoryRouter = express.Router()
//Importamos el servicio entero (que contendrá los métodos) de categorias, para poder usar los métodos
const categoryService = require('../model/categories')
//Llamamos al fichero donde hacemos las validaciones, para poder usarlas en los metodos
const categoryValidationService = require('../services/categoryValidationService')
//Llamamos a ajv para poder validar esquemas
const Ajv = require('ajv');
const ajv = new Ajv();







//POST Global
categoryRouter.post('', async (req, res) => {
    const { data } = req.body
    //Validacion del esquema
    let valid = categoryValidationService.validateCategory(categoryValidationService.categoryCreateSchema, data)
    //
    if(valid){
        const id = await categoryService.createCategory(data)
        res.status(201).json({message: `Category with id ${id /*data.id*/} was created `})
    }
    else{
        res.status(400).json({message: `Category schema is not valid`})
    }
      
})


//GET global
categoryRouter.get('', async (req, res) => {
    const categories = await categoryService.consultAllCategories()
    if(categories.length > 0){
        res.status(200).json(categories)    
    }
    else{
        res.status(404).json({"message": "You dont have any category saved"})
    }
})

//GET por id
categoryRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const categories = await categoryService.consultCategoriesById(id)
    if(!categories) {
        res.status(404).json({ message: `Category with id ${id} was not found `});
    }
    else {
        res.status(200).json(categories)
    }
})

//GET por name
categoryRouter.get('/name/:name', async (req, res) => {
    const { name } = req.params;
    const categories = await categoryService.consultCategoriesByName(name)
    if(!categories) {
        res.status(404).json({ message: `Category with name ${name} was not found `});
    }
    else {
        res.status(200).json(categories)
    }
})

//PUT by id (Con el put modificamos campos de una entiedad, pero tenemos que enviar todos)
categoryRouter.put('/:id', async (req, res) => {
    const { data } = req.body
    const { id } = req.params
    //Primero validamos si la categoria que queremos updatear existe. Si existe lo updateamos y si no, no.
    const exist = await categoryValidationService.entityExists('categories', id)
    //
    if(exist){
        //Si existe validamos que el body trae lo necesario para hacer el PUT
        let valid = categoryValidationService.validateCategory(categoryValidationService.categoryUpdateSchemaPut, data)
        //
        if(valid){
            await categoryService.updateCategory(data, id)
            res.status(200).json({ message: `Category with id ${id} was updated` })
        }
        else{
            res.status(400).json({ message: `Category update schema is not valid` })
        }
    }
    else{
        res.status(404).json({ message: `Category with id ${id} was not founded` })
    }
})
    

//PATCH by id (Con el patch modificamos campos de una entidad, y podemos solo mandar los campos modificados)
categoryRouter.patch('/:id', async (req, res) => {
    const { data } = req.body
    const { id } = req.params
    // Primero validamos si la categoria que queremos updatear existe. Si existe lo updateamos y si no, no.
    const exist = await categoryValidationService.entityExists('categories', id)
    //
    if(exist){
        //Si existe validamos que el body trae lo necesario para hacer el PATCH     
        const valid = categoryValidationService.validateCategory(categoryValidationService.categoryUpdateSchemaPatch, data)
        //
        if(valid){
            await categoryService.updateCategory(data, id)
            res.status(200).json({ message: `Category with id ${id} was updated` })
        }
        else{
            res.status(400).json({ message: `Category update schema is not valid` })
        }
    }
    else{
        res.status(404).json({ message: `Category with id ${id} was not founded` })
    }
    
    
})


//DELETE by id
categoryRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    //Primero validamos si la categoria que queremos borrar existe. Si existe lo borramos y si no, no.
    const exist = await categoryValidationService.entityExists('categories', id)
    //
    if(exist){
        await categoryService.deleteCategory(id)
        res.status(200).json({ message: `Category with id ${id} was deleted` })
    }
    else{
        res.status(404).json({ message: `Category with id ${id} was not founded` })
    }
    
    
})



//Exportamos el ROUTER
module.exports = {
    categoryRouter
}







