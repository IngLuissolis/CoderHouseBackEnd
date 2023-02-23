# Curso CoderHouse BackEnd

👋 Bienvenido/da

# Desafios

- Los desafios del Curso completados son los siguientes:

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
