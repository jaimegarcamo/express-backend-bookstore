//Recogemos express
const express = require('express')
//Recogemos el ROUTER para poder crear los metodos GET, POST ...
const categoryRouter = express.Router()
//Llamamos a nuestro fichero de servicios para poder usar las funciones
//en nuestros metodos GET, POST ... (que está en model/categories)
const categoryService = require('../model/categories')
//Llamamos al fichero donde hacemos las validaciones, para poder usarlas en los metodos
const bookValidationService = require('../services/bookValidationService')
//Llamamos a ajv para poder validar esquemas
const Ajv = require('ajv');
const ajv = new Ajv();





//GET global
categoryRouter.get('', (req, res) => {
    const categories = categoryService.consultAllCategories()
    if(categories.length > 0){
        res.status(200).json({categories})    
    }
    else{
        res.status(404).json({"message": "You dont have any category saved"})
    }
})

//GET por id
categoryRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const categories = categoryService.consultCategoriesById(id)
    if(!categories) {
        
        res.status(404).json({ message: `Category with id ${id} was not found `});
    }
    else {
        res.status(200).json({categories})
    }
})

//GET por name
categoryRouter.get('/name/:name', (req, res) => {
    const { name } = req.params;
    const categories = categoryService.consultAuthorsByName(name)
    if(!categories) {
        res.status(404).json({ message: `Author with name ${name} was not found `});
    }
    else {
        res.status(200).json({categories})
    }
})

//POST Global
categoryRouter.post('', (req, res) => {
    const { data } = req.body
    categoryService.createCategory(data)
    res.status(201).json({message: `Category with id ${data.id} was created `})
})

//PUT by id (Con el put modificamos campos de una entiedad, pero tenemos que enviar todos)
categoryRouter.put('/:id', (req, res) => {
    const { data } = req.body
    const { id } = req.params
    categoryService.updateCategory(data, id)
    res.status(200).json({ message: `Category with id ${id} was updated` })
})

//PATCH by id (Con el patch modificamos campos de una entidad, y podemos solo mandar los campos modificados)
categoryRouter.patch('/:id', (req, res) => {
    const { data } = req.body
    const { id } = req.params
    categoryService.updateCategory(data, id)
    res.status(200).json({ message: `Category with id ${id} was updated` })
})

//DELETE by id
categoryRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    categoryService.deleteCategory(id)
    res.status(200).json({ message: `Category with id ${id} was deleted` })
})


//Exportamos el ROUTER
module.exports = {
    categoryRouter
}