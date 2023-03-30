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
            console.log('Token guardado en cookie con éxito');
        } else {
            console.log('Token no se guardó en cookie porque no existe el usuario en la base de datos');
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
    .then(response => response.json())
    .then(async (response) => {
        console.log(response);
    })
}

/*Recupera token guardado en localStorage y se muestra por terminal BackEnd */
// botonjwt.onclick = (e) => {
//     fetch('http://localhost:3000/jwt/login', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     })
// }
