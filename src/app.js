//Traemos los paquetes necesarios
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//Traemos el controlador de libros (lo desestructuramos y nos quedamos con lo que exportamos en el bookController) 
const { bookRouter } = require('./controller/bookController')
//Traemos el controlador de autores (lo desestructuramos y nos quedamos con lo que exportamos en el authorController) 

//Traemos el controlador de categorias (lo desestructuramos y nos quedamos con lo que exportamos en el categoryController) 


//Le decimos a nuestra app que use ROUTER
const router = express.Router()

//Creamos el express EN LUGAR DE HTTP (Trae mas cosas que http a pelo)
const app = express()
//Definimos el puerto del servidor
const port = 8080

// LO DE ARRIBA SON SOLO DECLARACIONES


//Usamos cors
app.use(cors())
//Usamos el body parser. Va a pasar por los endpoints que tengan Content-Type
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Usamos router
app.use(router)
//Le decimos a nuestra app que existe el endpoint o BBDD (/book) 
//que dentro podremos usar los metodos GET, POST...
//usando con el router bookRouter
app.use('/book', bookRouter)



//Levantamos aplicacion
app.listen(port, () => console.log(`Server is running on port ${port}`))


//YA PODEMOS EJECUTAR EL npm run start






