//Recogemos express
const express = require('express')
//Creamos un objeto ROUTER (y le ponemos el nombre authorRouter) donde guardaremos las rutas del controlador con los metodos GET, POST ...
const authorRouter = express.Router()
//Importamos el servicio entero (que contendrá los métodos) de autores, para poder usar los métodos
const authorService = require('../model/authors')
//Llamamos al fichero donde hacemos las validaciones, para poder usarlas en los metodos
const authorValidationService = require('../services/authorValidationService')
//Llamamos a ajv para poder validar esquemas
const Ajv = require('ajv');
const ajv = new Ajv();




//POST Global
authorRouter.post('', async (req, res) => {
    const { data } = req.body
    //Validacion del esquema
    let valid = authorValidationService.validateAuthor(authorValidationService.authorCreateSchema, data)
    //
    if(valid){
        const id = await authorService.createAuthor(data)
        res.status(201).json({message: `Author with id ${id /*data.id*/} was created `})
    }
    else{
        res.status(400).json({message: `Author schema is not valid`})
    }
      
})


//GET global
authorRouter.get('', async (req, res) => {
    const authors = await authorService.consultAllAuthors()
    if(authors.length > 0){
        res.status(200).json({authors})    
    }
    else{
        res.status(404).json({"message": "You dont have any author saved"})
    }
})

//GET por id
authorRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const authors = await authorService.consultAuthorsById(id)
    if(!authors) {
        res.status(404).json({ message: `Author with id ${id} was not found `});
    }
    else {
        res.status(200).json({authors})
    }
})

//GET por name
authorRouter.get('/name/:name', async (req, res) => {
    const { name } = req.params;
    const authors = await authorService.consultAuthorsByName(name)
    if(!authors) {
        res.status(404).json({ message: `Author with name ${name} was not found `});
    }
    else {
        res.status(200).json({authors})
    }
})

//PUT by id (Con el put modificamos campos de una entiedad, pero tenemos que enviar todos)
authorRouter.put('/:id', async (req, res) => {
    const { data } = req.body
    const { id } = req.params
    //Primero validamos si el autor que queremos updatear existe. Si existe lo updateamos y si no, no.
    const exist = await authorValidationService.entityExists('authors', id)
    //
    if(exist){
        //Si existe validamos que el body trae lo necesario para hacer el PUT
        let valid = authorValidationService.validateAuthor(authorValidationService.authorUpdateSchemaPut, data)
        //
        if(valid){
            await authorService.updateAuthor(data, id)
            res.status(200).json({ message: `Author with id ${id} was updated` })
        }
        else{
            res.status(400).json({ message: `Author update schema is not valid` })
        }
    }
    else{
        res.status(404).json({ message: `Author with id ${id} was not founded` })
    }
})
    

//PATCH by id (Con el patch modificamos campos de una entidad, y podemos solo mandar los campos modificados)
authorRouter.patch('/:id', async (req, res) => {
    const { data } = req.body
    const { id } = req.params
    // Primero validamos si el autor que queremos updatear existe. Si existe lo updateamos y si no, no.
    const exist = await authorValidationService.entityExists('authors', id)
    //
    if(exist){
        //Si existe validamos que el body trae lo necesario para hacer el PATCH     
        const valid = authorValidationService.validateAuthor(authorValidationService.authorUpdateSchemaPatch, data)
        //
        if(valid){
            await authorService.updateAuthor(data, id)
            res.status(200).json({ message: `Author with id ${id} was updated` })
        }
        else{
            res.status(400).json({ message: `Author update schema is not valid` })
        }
    }
    else{
        res.status(404).json({ message: `Author with id ${id} was not founded` })
    }
    
    
})


//DELETE by id
authorRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    //Primero validamos si el autor que queremos borrar existe. Si existe lo borramos y si no, no.
    const exist = await authorValidationService.entityExists('authors', id)
    //
    if(exist){
        await authorService.deleteAuthor(id)
        res.status(200).json({ message: `Author with id ${id} was deleted` })
    }
    else{
        res.status(404).json({ message: `Author with id ${id} was not founded` })
    }
    
    
})



//Exportamos el ROUTER
module.exports = {
    authorRouter
}