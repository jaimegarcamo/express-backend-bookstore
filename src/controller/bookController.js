//Recogemos express
const express = require('express')
//Recogemos el ROUTER para poder crear los metodos GET, POST ...
const bookRouter = express.Router()
//Llamamos a nuestro fichero de servicios para poder usar las funciones
//en nuestros metodos GET, POST ... (que está en model/books)
const bookService = require('../model/books')
//Llamamos al fichero donde hacemos las validaciones, para poder usarlas en los metodos
const validationService = require('../services/validationService')
//Llamamos a ajv para poder validar esquemas
const Ajv = require('ajv');
const ajv = new Ajv();


//VALIDACIONES
// ... // O LAS PODEMOS HACER SI QUEREMOS EN OTRO FICHERO DISTINTO




//GET global
bookRouter.get('', (req, res) => {
    const books = bookService.consultAllBooks()
    res.status(200).json({books})
})

//GET por id
bookRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
    const books = bookService.consultBooksById(id)
    if(!books) {
        res.status(404).json({ message: `Book with id ${id} was not found `});
    }
    else {
        res.status(200).json({books})
    }
})

//GET por isbn
bookRouter.get('/isbn/:isbn', (req, res) => {
    const { isbn } = req.params;
    const books = bookService.consultBooksByIsbn(isbn)
    if(!books) {
        res.status(404).json({ message: `Book with isbn ${isbn} was not found `});
    }
    else {
        res.status(200).json({books})
    }
})

//POST Global
bookRouter.post('', (req, res) => {
    const { data } = req.body
    bookService.createBook(data)
    res.status(201).json({message: `Book with id ${data.id} was created `})
})

//PUT by id (Con el put modificamos campos de una entiedad, pero tenemos que enviar todos)
bookRouter.put('/:id', (req, res) => {
    const { data } = req.body
    const { id } = req.params
    bookService.updateBook(data, id)
    res.status(200).json({ message: `Book with id ${id} was updated` })
})

//PATCH by id (Con el patch modificamos campos de una entidad, y podemos solo mandar los campos modificados)
bookRouter.patch('/:id', (req, res) => {
    const { data } = req.body
    const { id } = req.params
    bookService.updateBook(data, id)
    res.status(200).json({ message: `Book with id ${id} was updated` })
})

//DELETE by id
bookRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    bookService.deleteBook(id)
    res.status(200).json({ message: `Book with id ${id} was deleted` })
})

//SEARCH (Creamos un POST, pero esto será una query que devolverá un libro en función de los parametros de búsqueda que le pasemos al método)
bookRouter.post('/find', (req, res) => {
    const { data } = req.body
    const books = bookService.searchBook(data)
    
    if(books == 'sin parametros'){
        res.status(404).json({"message": "Without search parameters"})
    }
    else if(books.length > 0){
        res.status(200).json({books})
        //res.status(200).json({message: `Your search has ${books.length} results`})
    }
    else{
        res.status(404).json({"message": "Your search doesnt have results"})
    }
})



//Exportamos el ROUTER
module.exports = {
    bookRouter
}