//Recogemos express
const express = require('express')
//Creamos un objeto ROUTER (y le ponemos el nombre bookRouter) donde guardaremos las rutas del controlador con los metodos GET, POST ...
const bookRouter = express.Router()
//Importamos el servicio entero (que contendrá los métodos) de libros, para poder usar los métodos
const bookService = require('../model/books')
//Llamamos a TODO fichero (sin desestructurar) donde tenemos las validaciones, para poder usarlas en los metodos
const bookValidationService = require('../services/bookValidationService')
//LLamamos a la funcion (desestructurada) para validar el metodo de busqueda, para poder usarla en el metodo de find
const { validateBookSearchQuery } = require('../services/bookValidationSearchQuery');


//(RUTAS) -> METODOS


//POST Global
bookRouter.post('', async (req, res) => {
    const { data } = req.body
    //Validacion de esquema
    let valid = bookValidationService.validateBook(bookValidationService.bookCreateSchema, data) //Llamamos a la función "validateBook" de nuestro bookValidationService y le pasamos por parametro el esquema "bookCreateSchema" que está en el propio bookValidationService y la data que traía la request en el body para validarla
    //
    if(valid){
        const id = await bookService.createBook(data)
        res.status(201).json({message: `Book with id ${id /*data.id*/} was created `})    
    }
    else{
        res.status(400).json({message: `Book schema not valid`})
    }
})

//GET global
bookRouter.get('', async (req, res) => {
    const books = await bookService.consultAllBooks()
    if(books.length > 0){
        res.status(200).json(books)    
    }
    else{
        res.status(404).json({"message": "You dont have any book saved"})
    }
})

//GET por id
bookRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const books = await bookService.consultBooksById(id)
    if(!books) {
        res.status(404).json({ message: `Book with id ${id} was not found `});
    }
    else {
        res.status(200).json(books)
    }
})

//GET por isbn
bookRouter.get('/isbn/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const books = await bookService.consultBooksByIsbn(isbn)
    if(!books) {
        res.status(404).json({ message: `Book with isbn ${isbn} was not found `});
    }
    else {
        res.status(200).json(books)
    }
})

//PUT by id (Con el put modificamos campos de una entiedad, pero tenemos que enviar todos)
bookRouter.put('/:id', async (req, res) => {
    const { data } = req.body
    const { id } = req.params
    //Primero validamos si el libro que queremos updatear existe. Si existe lo updateamos y si no, no.
    const exist = await bookValidationService.entityExists('books', id)
    //
    if(exist){
        //Si existe validamos que el body trae lo necesario para hacer el PUT
        let valid = bookValidationService.validateBook(bookValidationService.bookUpdateSchemaPut, data)
        //
        if(valid){
            await bookService.updateBook(data, id)
            res.status(200).json({ message: `Book with id ${id} was updated` })
        }
        else{
            res.status(400).json({ message: `Book update schema is not valid`})
        }
    }
    else{
        res.status(404).json({ message: `Book with id ${id} was not founded` })
    }
 
})

//PATCH by id (Con el patch modificamos campos de una entidad, y podemos solo mandar los campos modificados)
bookRouter.patch('/:id', async (req, res) => {
    const { data } = req.body
    const { id } = req.params
    // Primero validamos si el libro que queremos updatear existe. Si existe lo updateamos y si no, no.
    const exist = await bookValidationService.entityExists('books', id)

    if(exist){
        // Si existe validamos que el body trae lo necesario para hacer el PATCH        
        let valid = bookValidationService.validateBook(bookValidationService.bookUpdateSchemaPatch, data)
        //
        if(valid){
            await bookService.updateBook(data, id)
            res.status(200).json({ message: `Book with id ${id} was updated` })
        }
        else{
            res.status(400).json({ message: `Book update schema is not valid` })
        }
    }
    else{
        res.status(404).json({ message: `Book with id ${id} was not founded` })
    }
    
})


//DELETE by id
bookRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    // Primero validamos si el libro que queremos borrar existe. Si existe lo borramos y si no, no.
    const exist = await bookValidationService.entityExists('books', id)
    //
    if(exist){
        await bookService.deleteBook(id)
        res.status(200).json({ message: `Book with id ${id} was deleted` })
    }
    else{
        res.status(404).json({ message: `Book with id ${id} was not founded` })
    }
    
})


//SEARCH (Creamos un POST, pero esto será una query que devolverá un libro en función de los parametros de búsqueda que le pasemos al método)
bookRouter.post('/find', async (req, res) => {
    const { data } = req.body
    //Validamos que el body de la query contiene lo esperado
    const valid = validateBookSearchQuery(data)
    //
    if(valid){
        const books = await bookService.searchBook(data)
        //Si el objeto books devuelve algun libro lo mostramos, sino, decimos que la busqueda no ha tenido exito
        if(books.length > 0){
            res.status(200).json(books)
        }
        else{
            res.status(404).json({message: 'Your search doesnt have results'})
        } 
    }
    else{
        res.status(400).json({ message: `Book find schema is not valid` })
    }
})



//Exportamos el ROUTER
module.exports = {
    bookRouter
}