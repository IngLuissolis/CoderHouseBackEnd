const socketClient = io();

//elementos
const nombreUsuario = document.getElementById('nombreUsuario');
const formularioChat = document.getElementById('formularioChat');
const inputMensaje = document.getElementById('mensaje');
const chatParrafo = document.getElementById('chat');

let usuario = null;

if(!usuario) {
  Swal.fire({
    title: 'BIENVENIDO',
    text: 'Ingresa tu usario',
    input: 'text',
    inputValidator: (value) => {
      if(!value) {
        return "Necesitas ingresar un usuario";
      }
    }
  })
  .then (username => {
    usuario = username.value;
    nombreUsuario.innerText = usuario;
    socketClient.emit('nuevoUsuario', usuario);
  })
}

socketClient.on('chat', infoMensajes => {
  console.log(infoMensajes);
  const chatRender = infoMensajes.map (element => {
    return `<p><strong>${element.user}: </strong>${element.message}</p>`
  }).join(' ');
  chatParrafo.innerHTML = chatRender;

})

socketClient.on('broadcast', usuario => {
  Toastify({
    text: `Ingreso ${usuario} al chat`,
    duration: 5000,
    position: 'right',
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast()
})

formularioChat.onsubmit = (e) => {
  //evita que se refresque la pagina
  e.preventDefault();

  const info = {
    user: usuario,
    message: inputMensaje.value
  }

  socketClient.emit('mensaje', info);
  inputMensaje.value = '';
};

const formulario = document.getElementById("formulario");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputThumbnails = document.getElementById("thumbnails");


//Formulario pagina web Cliente que envia producto a Servidor
formulario.onsubmit = (e) => {
  //evita que se refresque la pagina
  e.preventDefault();
  const title = inputTitle.value;
  const description = inputDescription.value;
  const code = inputCode.value;
  const price = inputPrice.value;
  const stock = inputStock.value;
  const category = inputCategory.value;
  const thumbnails = inputThumbnails.value;
  const status = document.getElementById("status").checked;
  socketClient.emit("createProduct", { title, description, code, price, stock, category, thumbnails, status });
};

//Escucha click en boton eliminar de producto
document.getElementById("products").addEventListener("click", function(event) {
  if (event.target.id === "deleteProduct") {
    let productId = event.target.getAttribute("data-id");
    console.log("deleteProductClient: ", productId);
    socketClient.emit("deleteProduct", productId);
  }
  });

//Peticion que actualiza lista de productos, una vez eliminado producto en archivo productos.json desde servidor
socketClient.on("actualizarListaClient", (products) => {
  let productList = document.getElementById("products");
  productList.innerHTML = '';
  products.forEach(product => {
    productList.appendChild(createProductElement(product));
  });
});

//Funcion auxiliar para renderizar lista de productos en Cliente
createProductElement = (product) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${product.id}</td>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.code}</td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td>${product.category}</td>
    <td>${product.thumbnails}</td>
    <td>${product.status}</td>
    <td>
      <button type="button" class="btn btn-danger" id="deleteProduct" data-id=${product.id}>
        Eliminar
      </button>
    </td>
  `;
  return tr;
};



