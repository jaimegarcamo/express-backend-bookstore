/*
Category {
    id: uuid,
    name: string
}
*/

//El POST solo se pasará el name. El id se gener random

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

//Servicio para crear categorias. Esta funcion será llamada desde el POST en el fichero routes.js para crear un nuevo autor en BBDD
const createCategory = (data) => {
    data.id = uuidv4() //Ejemplo de como crear un id random
    data.name = data.name
    db.get('categories').push(data).write();
}

//Servicio para consultar todos los autores. Esta función será llamada desde el GET global
const consultAllCategories = () => {
    const categories = db.get('categories').value();
    return(categories)
}

//Servicio para consultar categorias por id. Esta función será llamada desde el GET by id
const consultCategoriesById = (id) => {
    const categories = db.get('categories')
    .find({ id: id })
    .value()

    return(categories)
}

//Servicio para consultar categorias por name. Esta función será llamada desde el GET by name
const consultCategoriesByName = (name) => {
    const categories = db.get('categories')
    .find({ name: name })
    .value()
    
    return(categories)
}

//Servicio para actualizar categorias por id. Esta función será llamada desde el PUT by id (pasando todos los atributos) y desde el PATCH by id (pasando solo lo que modificamos)
const updateCategory = (data, id) => {
    db.get('categories')
    .find({ id: id })
    .assign(data)
    .write()
}


//Servicio para eliminar categorias por id. Esta función será llamada desde el DEL by id 
const deleteCategory = (id,) => {
    db.get('categories')
    .remove({ id: id })
    .write()
}








//Exportamos los servicios de la BBDD para poder usarlos en routes.js
module.exports = {
    createCategory,
    consultAllCategories,
    consultCategoriesById,
    consultCategoriesByName,
    updateCategory,
    deleteCategory
}

