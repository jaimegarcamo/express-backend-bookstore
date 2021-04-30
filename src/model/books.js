//Levantamos la BBDD
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//Lo usaremos para crear ids random
const {v4:uuidv4} = require('uuid') 

//Defaults de la BBDD. Esto solo hay que hacerlo en 1 modelo, no en todos (con todas las entidades)
db.defaults({books: [], authors: [], categories: []}).write()






//Creamos los servicios de la BBDD que luego usaremos en routes.js para los metodos

//Servicio para crear libros. Esta funcion será llamada desde el POST en el fichero routes.js para crear un nuevo libro en BBDD
const createBook = (data) => {
    data.id = uuidv4() //Ejemplo de como crear un id random
    data.booked = false
    db.get('books').push(data).write()

    return data.id
}

//Servicio para consultar todos los libros. Esta función será llamada desde el GET global
const consultAllBooks = () => {
    const books = db.get('books').value();
    return(books)
}

//Servicio para consultar libros por id. Esta función será llamada desde el GET by id
const consultBooksById = (id) => {
    const books = db.get('books')
    .find({ id: id })
    .value()

    return(books)
}

//Servicio para consultar libros por isbn. Esta función será llamada desde el GET by isbn
const consultBooksByIsbn = (isbn) => {
    const books = db.get('books')
    .find({ isbn: isbn })
    .value()
    
    return(books)
}

//Servicio para actualizar libros por id. Esta función será llamada desde el PUT by id (pasando todos los atributos)
const updateBook = (data, id) => {
    db.get('books')
    .find({ id: id })
    .assign(data)
    .write()
}


//Servicio para actualizar libros por id. Esta función será llamada desde el PUT by id (pasando todos los atributos)
const deleteBook = (id) => {
    db.get('books')
    .remove({ id: id })
    .write()
}

//Servicio para buscar libros por author o categories que se enviarán desde cliente.
//Recibiremos un JSON que contendrá author y/o categories y buscaremos los libros que coincidan con estos parámetros de busqueda y los devolveremos en el body
const searchBook = (data) => {
    
    if(data.author.length > 0 && data.categories.length > 0){
        const books = db.get('books')
        .filter({author: data.author, categories: data.categories})
        .value()

        return(books)  
    }
    else if(data.author.length > 0 && data.categories.length == 0){
        const books = db.get('books')
        .filter({ author: data.author })
        .value()

        return(books)
    }
    else if(data.author.length == 0 && data.categories.length > 0){
        const books = db.get('books')
        .filter({categories: data.categories})
        .value()

        return(books)
    }
    else{
        return 'sin parametros'
    }
}







//Exportamos los servicios de la BBDD para poder usarlos en routes.js
module.exports = {
    createBook,
    consultAllBooks,
    consultBooksById,
    consultBooksByIsbn,
    updateBook,
    deleteBook,
    searchBook
}

