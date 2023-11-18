function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("Logueado", "true");
          window.location.href = "/index.html";
        } else {
          errorMensaje.classList.remove("d-none");
          setTimeout(function () {
              errorMensaje.classList.add("d-none");
          }, 2000);
      }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Error al intentar iniciar sesión. Por favor, inténtalo de nuevo."
        );
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
  
    loginButton.addEventListener("click", function () {
      login();
    });
  });

 

