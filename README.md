# Curso CoderHouse BackEnd

👋 Bienvenido/da

# Desafios

- Los desafios del Curso completados son los siguientes:

## Desafio 3ra Entrega

- Archivos en carpeta:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/3raEntrega

- Requerimientos:

    - Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO. (Cumplido - Sin Factory)
    - El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional) (Cumplido - Sin Factory)
    - Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio. (Cumplido - Se utiliza Service)
    - Modificar la ruta  /current Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria. (Cumplido - Se utiliza RTO)
    - Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:
        - Sólo el administrador puede crear, actualizar y eliminar productos. (Cumplido - rol 'admin')
        - Sólo el usuario puede enviar mensajes al chat. (No Implementado)
        - Sólo el usuario puede agregar productos a su carrito. (No Implementado)
    - Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. (Cumplido)
    - Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.La compra debe corroborar el stock del producto al momento de finalizarse:
        - Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar. (Cumplido)
        - Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra. (Cumplido)
        - Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra. (Cumplido)
        - En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse. (Cumplido)
        - Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad. (Cumplido)

    Observaciones: en el caso de agregar un producto al carrito, por el momento se guarda en carrito con _id: '644c87c3baaa2025e4053a75'. Falta implementar que cuando se loguee el usuario se cree un carrito para dicho usuario.


## Desafio Arquitectura modelo de Capas

- Archivos en carpeta:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/ArquitecturaCapas

- Requerimientos:

    - El proyecto debe contar con capas de routing, controlador, dao, con nuestras vistas bien separadas y con las responsabilidades correctamente delegadas.
    - Además, mover del proyecto todas las partes importantes y comprometedoras en un archivo .env para poder leerlo bajo variables de entorno en un archivo config.js

## Desafio Segunda Practica Integradora

- Archivos en carpeta:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/SegundaEntrega

- Requerimientos:

    - Crear un modelo User el cual contará con los campos:
        - first_name:String,
        - last_name:String,
        - email:String (único)
        - age:Number,
        - password:String(Hash)
        - cart:Id con referencia a Carts
        - role:String(default:’user’)

    - Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios.

    - Modificar el sistema de login del usuario para poder trabajar con session o con jwt (a tu elección).

    - Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.

## Desafio Refactor a nuestro Login

- Archivos en carpeta:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/SegundaEntrega

- Requerimientos:

    - Se deberá contar con un hasheo de contraseña utilizando bcrypt
    - Se deberá contar con una implementación de passport, tanto para register como para login.
    - Implementar el método de autenticación de GitHub a la vista de login.

    La implementación de los requerimientos se encuentra en archivo https://github.com/IngLuissolis/CoderHouseBackEnd/blob/main/ProyectoFinal/SegundaEntrega/src/passport/passportStrategies.js


## Desafio Login por Formulario

- Archivos en carpeta:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/SegundaEntrega

- Requerimientos:

    - Se genera registro en vista /login utilizando librerias passport, express-session y bcrypt.

    - Al realizar el login se redirecciona directamente a la vista de productos. Se agrega mensaje de bienvenida con datos del usuario.

    - Se agrega rol "administrador" para login email: "adminCoder@coder.com, password:"adminCod3r123".

    - Se implementa boton "logout" que destruye sesión y redirige a la vista login.



## Desafio Segunda pre-entrega Proyecto Final

- Archivos en carpeta:

https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/SegundaEntrega

- Requerimientos:

    - Se recibe por query params un limit (opcional), una page (opcional), un sort (asc / desc por precio) y un query (grupo)

        Devuelve un objeto con formato que se ve en ejemplo

        Ejemplo: petición GET http://localhost:3000/api/products?sort=desc&query=GrupoC&limit=2

    - Además, se agrega router de carts los siguientes endpoints:

        - DELETE http://localhost:3000/api/carts/:cid/products/:pid elimina del carrito el producto seleccionado.

        - PUT http://localhost:3000/api/carts/:cid actualiza el carrito con un arreglo de productos con el formato especificado arriba.

        - PUT http://localhost:3000/api/carts/:cid/products/:pid actualiza SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body

        - DELETE http://localhost:3000/api/carts/:cid elimina todos los productos del carrito.

    - Se crea una vista en el router de views ‘/products’ (archivo products.handlebars) para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:

        - Se crea nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.

        - Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

        - Además, agregar una vista en ‘/carts/:cid (archivo carts.handlebars) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. Se agrega boton eliminar al lado de cada producto, se elimina de un producto en uno en el caso de tener mas de un producto. 

## Desafio Primera Practica Integradora

- Archivos en carpeta:

https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/Desafios/DesafioPrimeraPracticaIntegradora

- MongoDB:

    - Se crea en Atlas DataBase ecommerceCoderHouse
        - Collections:
            - products
            - carts
            - messages

    - Se separa los Managers de fileSystem de los Managers de MongoDB en carpeta dao.

    - Se codifica estructura models donde se guardan los esquemas de MongoDB

    - En collection "carts" se guarda "_id" y "quantity" de product. "quantity" se incrementa en 1 cada vez que se guarda mismo _id de product.

- Chat Handlebars:

    - ruta: http://localhost:3000/chat

    - Los mensajes se guardan en MongoDB, estructura "user" y "message"

    - Los mensajes se pueden visualizar con una petición GET con la siguiente estructura:
        -       GetAllMessages: ruta: http://localhost:3000/viewsMessages/
        -       getMessageById: ruta: http://localhost:3000/viewsMessages//id


- Corrección Desafio WebSocket

    - Se corrigue eliminación de productos, anteriormente se eliminaban y no se volvian a enlistar a partir de ahi.
    Faltaba la instrucción:
    products = JSON.parse(fs.readFileSync(productsFilePath));


## Desafio WebSocket

- Archivos en carpeta:

https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/Desafios/DesafioWebSocket

- Handlebars: se generaron los archivos
    - src/views/home.handlebars: En navegador se encuentra en direccion web http://localhost:8080/
    - src/views/realTimeProducts.handlebars: En navegador se encuentra en direccion web http://localhost:8080/realtimeproducts .
    En dicha pagina se puede agregar o eliminar producto, utilizando websocket.

- Archivo src/server.js
    - se agrego configuración de websocket para interactuar con archivo public/js/index.js del lado del frontEnd

## Desafio Primera Entrega
-Archivos en carpeta:

https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/PrimeraEntrega

- Archivo server.js:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/PrimeraEntrega/src/server.js

- Archivo products.router.js:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/PrimeraEntrega/src/routes/products.router.js

- Archivo carts.router.js:
https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/ProyectoFinal/PrimeraEntrega/src/routes/carts.router.js

- Se utiliza archivo adicional utils.js para generar ruta relativa


### Desafio 03 - Servidor con Express
    - Archivos en carpeta 
    https://github.com/IngLuissolis/CoderHouseBackEnd/tree/main/Desafios/Desafio03ServidorConExpress/src
        -- /app.js
        -- /ProductManager.js
        -- /products.json

### Desafio 02 - Manejo de Archivos
    - Archivo: Desafios/Desafio02ProductManager.js
    - Archivo Forma Asincronica: Desafio/Desafio02ProductManagerAsync.js

### Desafio 01 - Clases ECMAScript y ECMAScript avanzado
    - Archivo: Desafios/Desafio01ECMAScript.js

# Descripción del Proyecto:

Proyecto para la venta de camisetas de los paises que jugaron el campeonato mundial de futbol Qatar 2022 desarrollado con tecnologia React (frontEnd)

# Estado del Proyecto

- Completar

# Tecnologias utilizadas

- express

# Librerias utilizadas

- Completar

# Customer Homepage

Animación Gif ecommerce

# Firebase - collection orders

Imagen CartContainer

# Sitio Deployed



# Feedback

Any suggestion and feedback is welcome. You can message me on email

`edusolis@yahoo.com.ar`
