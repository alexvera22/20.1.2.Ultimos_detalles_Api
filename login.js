function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí debes enviar una solicitud al servidor para autenticar
    // al usuario utilizando fetch() u otra técnica.
    // Puedes utilizar la función fetch para enviar una solicitud POST al servidor.
    // No olvides agregar el código para manejar la respuesta del servidor.

    // Ejemplo de cómo podrías enviar una solicitud POST utilizando fetch:
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
     if (data.token) {
        // Redirigir a la página index.html
        window.location.href = '/index.html';
    } else {
        // Manejar el caso en el que la autenticación falla
        alert('Autenticación fallida. Verifica tus credenciales.');
    }
})
.catch(error => console.error('Error:', error));
}