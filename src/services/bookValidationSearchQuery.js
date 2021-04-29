//Importamos AJV para poder validar esquemas
const Ajv = require("ajv");
const ajv = new Ajv();


//Creamos el esquema que debe tener el body del metodo de busqueda
const searchBookSchema = {
    type: "object",
    properties: {
      author: {type: "string"},
      categories: {type: "array", uniqueItems: true},
    },
    required: [],
    additionalProperties: false
}


// Creamos la funcion que valida el esquema del body de busqueda, pasandole simplemente el body de la busqueda (query)
const validateBookSearchQuery = (query) => {
    return ajv.validate(searchBookSchema, query);
}


// Exoirtamos la funcion de validacion
module.exports = {
    validateBookSearchQuery,
}