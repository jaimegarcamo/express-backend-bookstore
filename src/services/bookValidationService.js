//Levantamos BBDD (Esto hay que hacerlo siempre que vayamos a interactuar con la BBDD)
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

//Importamos AJV para hacer las validaciones de esquemas
const Ajv = require("ajv");
const ajv = new Ajv();




//CREAMOS LOS ESQUEMAS A VALIDAR POR LOS DISTINTOS METODOS

// 1 - Creamos el esquema que se validará al crear un nuevo libro
const bookCreateSchema = {
    type: "object",
    properties: {
      title: {type: "string"},
      author: {type: "string"},
      isbn: {type: "string"},
      numPages: {type: "number"}, 
      categories: {type: "array", uniqueItems: true},
    },
    required: ["title", "author", "isbn", "numPages", "categories"],
    additionalProperties: false
};

// 2 - Creamos el esquema que se validará al hacer PUT a un libro (Tendrá como requeridos todas las propiedades del libro excepto id que no se envía nunca)
const bookUpdateSchemaPut = {
    type: "object",
    properties: {
      title: {type: "string"},
      author: {type: "string"},
      isbn: {type: "string"},
      booked: {type: "boolean"},
      numPages: {type: "number"}, 
      categories: {type: "array", uniqueItems: true},
    },
    required: ["title", "author", "isbn", "numPages", "booked", "categories"],
    additionalProperties: false
};

// 3 - Creamos el esquema que se validará al hacer PATCH a un libro (No tendrá ningúna propiedad como requerida, ya que en el PATCH puedes mandar solamente la que quieras updatear y cada vez puede ser una distinta)
const bookUpdateSchemaPatch = {
    type: "object",
    properties: {
      title: {type: "string"},
      author: {type: "string"},
      isbn: {type: "string"},
      booked: {type: "boolean"},
      numPages: {type: "number"}, 
      categories: {type: "array", uniqueItems: true},
    },
    required: [],
    additionalProperties: false
};



///FUNCIONES DE VALIDACION

// 1 - Funcion a la que le pasaremos el esquema que queramos validar según el método llamado y los datos enviados al método desde cliente, para validarlo
const validateBook = (schema, data) => {
    return ajv.validate(schema, data);
}

// 2 - Función que usaremos para comprobar si una un libro ya existe en la base de datos
const entityExists = (entity, id) => {
    const element = db.get(entity)
    .find({ id: id })
    .value();
    return element;
};


//EXPORTAMOS LAS FUNCIONES PARA PODER USARLAS EN EL CONTROLADOR bookController.js
module.exports = {
    bookCreateSchema,
    bookUpdateSchemaPut,
    bookUpdateSchemaPatch,
    entityExists,
    validateBook
}