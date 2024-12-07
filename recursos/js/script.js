document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const limpiarBoton = document.getElementById("limpiar");

    
    const validarNombre = () => {
        const nombre = document.getElementById("nombre").value.trim();
        const nombreError = document.getElementById("error-nombre");
        const expresion = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,20}$/;

        if (nombre === "") {
            nombreError.style.display = "block";
            nombreError.textContent = "Nombre obligatorio.";
            return false;
        }else if(!expresion.test(nombre)){
            nombreError.style.display = "block";
            nombreError.textContent = "Los nombres deben tener entre 3 y 20 letras.";
            return false;
        }
        nombreError.style.display = "none";
        return true;
    };

    const validarPassword = () => {
        const password = document.getElementById("password").value.trim();
        const passwordError = document.getElementById("error-password");
        const expresion = /^[a-zA-Z0-9·$%&/()]{8,16}$/;

        if (password === "") {
            passwordError.style.display = "block";
            passwordError.textContent = "La contraseña es obligatoria.";
            return false;
        } else if (!expresion.test(password)) {
            passwordError.style.display = "block";
            passwordError.textContent =
                "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
            return false;
        }
        passwordError.style.display = "none";
        return true;
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const nombreValido = validarNombre();
        const passwordValido = validarPassword();

        if (nombreValido && passwordValido) {
            alert("Bienvenido a CarbaShop");
            window.location.href = "./main.html";
            form.reset(); 
        }
    });

    limpiarBoton.addEventListener("click", () => {
        form.reset();
        document.getElementById("error-nombre").style.display = "none";
        document.getElementById("error-password").style.display = "none";
    });

    document.getElementById("nombre").addEventListener("input", validarNombre);
    document.getElementById("password").addEventListener("input", validarPassword);



});