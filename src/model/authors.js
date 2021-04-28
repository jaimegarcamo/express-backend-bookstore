
/*
    Author {
        id: uuid,
        name: string
    }
*/


/* Para Post solo pasamos el name y el id se genera random


/*MISMOS METODOS QUE BOOKS */

/*CUANDO CREEMOS O MODIFIQUEMOS UN BOOK HABRA QUE VALIDAR QUE EL AUTOR Y LAS CATEGORIAS EXISTAN. 
PARA ELLO HAY QUE BUSCAR EN LA BBDD EL AUTOR Y LA CATEGORIA EN FUNCION DEL NOMBRE */



//Levantamos la BBDD
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//Lo usaremos para crear ids random
const {v4:uuidv4} = require('uuid') 








//Creamos los servicios de la BBDD que luego usaremos en routes.js para los metodos

//Servicio para crear autores. Esta funcion será llamada desde el POST en el fichero routes.js para crear un nuevo autor en BBDD
const createAuthor = (data) => {
    data.id = uuidv4() //Ejemplo de como crear un id random
    data.name = data.name
    db.get('authors').push(data).write();
}

//Servicio para consultar todos los autores. Esta función será llamada desde el GET global
const consultAllAuthors = () => {
    const authors = db.get('authors').value();
    return(authors)
}

//Servicio para consultar autores por id. Esta función será llamada desde el GET by id
const consultAuthorsById = (id) => {
    const authors = db.get('authors')
    .find({ id: id })
    .value()

    return(authors)
}

//Servicio para consultar autores por name. Esta función será llamada desde el GET by name
const consultAuthorsByName = (name) => {
    const authors = db.get('authors')
    .find({ name: name })
    .value()
    
    return(authors)
}

//Servicio para actualizar autores por id. Esta función será llamada desde el PUT by id (pasando todos los atributos) y desde el PATCH by id (pasando solo lo que modificamos)
const updateAuthor = (data, id) => {
    db.get('authors')
    .find({ id: id })
    .assign(data)
    .write()
}


//Servicio para eliminar autores por id. Esta función será llamada desde el DEL by id 
const deleteAuthor = (id,) => {
    db.get('authors')
    .remove({ id: id })
    .write()
}








//Exportamos los servicios de la BBDD para poder usarlos en routes.js
module.exports = {
    createAuthor,
    consultAllAuthors,
    consultAuthorsById,
    consultAuthorsByName,
    updateAuthor,
    deleteAuthor
}

