const form = document.getElementById('formJWT');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const botonTokenInCookie = document.getElementById('botonTokenInCookie');

formJWT.onsubmit = (e) => {
    //evita que se refresque la pagina
    e.preventDefault();
    fetch('http://localhost:3000/jwt/login', {
        method: 'POST',
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(async (response) => {
        // Verificamos si la respuesta contiene un token
        if (response.token) {
            console.log('Token guardado con éxito en cookie');
        } else {
            console.log('Email o password incorrecto!');
        }
    })
}


/*Recupera token guardado en cookie */
botonTokenInCookie.onclick = (e) => {
    fetch('http://localhost:3000/jwt/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if(response.ok) {
            window.location.href = '/views/perfil';
        } else {
            throw new Error('Error al obtener el token'); // Maneja el error si la respuesta no es exitosa
        }
    })
}