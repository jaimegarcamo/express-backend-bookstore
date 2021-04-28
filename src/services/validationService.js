//Levantamos la BBDD
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)


//Creamos el metodo que valida si existe la entidad, para no crearla 2 veces
const checkEntity = (entity, id) => {
    const task = db.get(entity)
    .find({ id: id })
    .value();
    return !!task;
};


module.exports = {
    checkEntity
}