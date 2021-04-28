/*TRAEMOS LOS PAQUETES NECESARIOS PARA MONTAR EXPRESS*/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


/*TRAEMOS TODOS LOS CONTROLADORES QUE HEMOS CREADO*/
//Traemos el controlador de libros (lo desestructuramos y nos quedamos con lo que exportamos en el bookController) 
const { bookRouter } = require('./controller/bookController')
//Traemos el controlador de autores (lo desestructuramos y nos quedamos con lo que exportamos en el authorController) 
const { authorRouter } = require('./controller/authorController')
//Traemos el controlador de categorias (lo desestructuramos y nos quedamos con lo que exportamos en el categoryController) 
const { categoryRouter } = require('./controller/categoryController')


/* LE DECIMOS A NUESTRA APP QUE USE ROUTER*/
const router = express.Router()

/*CREAMOE EL EXPRESS EN LUGAR DE HTTP (Trae mas cosas que http a pelo)*/
const app = express()

/*DEFINIMOS EL PUERTO DEL SERVIDOR*/
const port = 8080

// LO DE ARRIBA SON SOLO DECLARACIONES



/*EMPEZAMOS A USAR LO QUE NECESITAMOS (LAS LINEAS SE PONEN EN ESTE ORDEN PARA QUE NO PETE)*/
//Usamos cors
app.use(cors())
//Usamos el body parser. Va a pasar por los endpoints que tengan Content-Type
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//Usamos router
app.use(router)
//Le decimos a nuestra app que existen los endpoints o BBDD (/book), (/author), (/category)
//que dentro podremos usar los metodos GET, POST...
//usando con el router bookRouter
app.use('/book', bookRouter)
app.use('/author', authorRouter)
app.use('/category', categoryRouter)



//Levantamos aplicacion
app.listen(port, () => console.log(`Server is running on port ${port}`))


//YA PODEMOS EJECUTAR EL npm run start






