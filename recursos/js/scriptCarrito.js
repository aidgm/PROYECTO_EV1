// inicializar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//declarar todos los elemntos 
const carritoProductos = document.getElementById("carrito-productos");
const carritoVacio = document.getElementById("carrito-vacio");
const carritoAcciones = document.getElementById("carrito-acciones");
const totalPrecio = document.getElementById("Total");
const carritoComprado = document.getElementById("carrito-comprado");
const numeroCarrito = document.getElementById("numerito");

//actualizar carrito
const actualizarNumerito = () => {
    if (numeroCarrito) {
        const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        numeroCarrito.textContent = totalProductos; // Actualiza el numerito
    } else {
        console.error("No se encontró el elemento para el numero del carrito");
    }
};


// renderizar el carrito
const renderizarCarrito = () => {
    if(!carritoProductos){
        console.error("No se encontró el elemento para renderizar el carrito");
        return;
    }
    carritoProductos.innerHTML = "";

    if (carrito.length === 0) {
        if(carritoVacio) carritoVacio.style.display = "block";
        if(carritoAcciones) carritoAcciones.style.display = "none";
        actualizarNumerito();
        return;
    }

    if (carritoVacio) carritoVacio.style.display = "none";
    if(carritoAcciones)carritoAcciones.style.display ="flex";

    let total = 0;

    carrito.forEach((producto) => {
        const subtotal = producto.cantidad * producto.precio;
        total += subtotal;

        const productoElemento = document.createElement("div");
        productoElemento.classList.add("carrito-producto");
        productoElemento.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${subtotal}</p>
            </div>
            <button class="carrito-producto-eliminar" data-id="${producto.id}">
                <i class="bi bi-trash-fill"></i>
            </button>
        `;

        carritoProductos.appendChild(productoElemento);
    });

    
    carritoProductos.innerHTML += `
        <div id="carrito-acciones" class="carrito-acciones">
            <div class="carrito-acciones-izquierda">
                <button class="carrito-acciones-vaciar">Vaciar carrito</button>
            </div>
            <div class="carrito-acciones-derecha">
                <div class="carrito-acciones-total">
                    <p>Total:</p>
                    <p id="Total">$${total}</p>
                </div>
                <button class="carrito-acciones-comprar">Comprar ahora</button>
            </div>
        </div>
    `;


    inicializarBotonesEliminar();
    actualizarNumerito();
    inicializarBotonesAcciones(); 
};

// inicializar botones
const inicializarBotonesEliminar = () => {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => eliminarDelCarrito(boton.dataset.id));
    });
};
// inicializar botones compra y vaciar productos 
const inicializarBotonesAcciones = () => {
    const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
    if (botonVaciar) botonVaciar.addEventListener("click", vaciarCarrito);

    const botonComprar = document.querySelector(".carrito-acciones-comprar");
    if (botonComprar) botonComprar.addEventListener("click", comprarAhora);
};


// eliminar del carrito
const eliminarDelCarrito = (productoId) => {
    carrito = carrito.filter((producto) => producto.id !== productoId);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
};

// vaciar el carrito
const vaciarCarrito = () => {
    const confirmacion = confirm("¿Estás seguro que quieres eliminar todos los productos del carrito?");

    if (confirmacion) {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    }
};



// botón comprar ahora
const comprarAhora = () => {
    if (carrito.length === 0) return;
    const confirmacion = confirm("¿Quieres comprar ahora?");
    if (confirmacion) {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito(); 
        
        if(carritoComprado){
           carritoComprado.style.display = "block";
            setTimeout(() => {
                carritoComprado.style.display = "none";
            }, 3000); 
        }  
    }
};

// reiniciar el carrito
const reiniciarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify([])); //vaciar
    carrito = [];
    actualizarNumerito();

    console.log("Carrito reiniciado.");
};


// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
    actualizarNumerito();
    //reiniciar el carrito,comprobar el clicj
    const enlaceCarbaShop = document.getElementById("link");
    if (enlaceCarbaShop) {
        enlaceCarbaShop.addEventListener("click", reiniciarCarrito);
    }
});
