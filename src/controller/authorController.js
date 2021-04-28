//Recogemos express
const express = require('express')
//Recogemos el ROUTER para poder crear los metodos GET, POST ...
const authorRouter = express.Router()
//Llamamos a nuestro fichero de servicios para poder usar las funciones
//en nuestros metodos GET, POST ... (que está en model/authors)
const authorService = require('../model/authors')
//Llamamos al fichero donde hacemos las validaciones, para poder usarlas en los metodos
const validationService = require('../services/validationService')
//Llamamos a ajv para poder validar esquemas
const Ajv = require('ajv');
const ajv = new Ajv();




//GET global
authorRouter.get('', (req, res) => {
    const authors = authorService.consultAllAuthors()
    if(authors.length > 0){
        res.status(200).json({authors})    
    }
    else{
        res.status(404).json({"message": "You dont have any author saved"})
    }
})

//GET por id
authorRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const authors = authorService.consultAuthorsById(id)
    if(!authors) {
        
        res.status(404).json({ message: `Author with id ${id} was not found `});
    }
    else {
        res.status(200).json({authors})
    }
})

//GET por name
authorRouter.get('/name/:name', (req, res) => {
    const { name } = req.params;
    const authors = authorService.consultAuthorsByName(name)
    if(!authors) {
        res.status(404).json({ message: `Author with name ${name} was not found `});
    }
    else {
        res.status(200).json({authors})
    }
})

//POST Global
authorRouter.post('', (req, res) => {
    const { data } = req.body
    authorService.createAuthor(data)
    res.status(201).json({message: `Author with id ${data.id} was created `})
})

//PUT by id (Con el put modificamos campos de una entiedad, pero tenemos que enviar todos)
authorRouter.put('/:id', (req, res) => {
    const { data } = req.body
    const { id } = req.params
    console.log(data)
    console.log(id)
    authorService.updateAuthor(data, id)
    res.status(200).json({ message: `Author with id ${id} was updated` })
})

//PATCH by id (Con el patch modificamos campos de una entidad, y podemos solo mandar los campos modificados)
authorRouter.patch('/:id', (req, res) => {
    const { data } = req.body
    const { id } = req.params
    authorService.updateAuthor(data, id)
    res.status(200).json({ message: `Author with id ${id} was updated` })
})

//DELETE by id
authorRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    authorService.deleteAuthor(id)
    res.status(200).json({ message: `Author with id ${id} was deleted` })
})


//Exportamos el ROUTER
module.exports = {
    authorRouter
}