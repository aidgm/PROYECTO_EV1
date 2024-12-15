// inicializar carrito
let carritoString = localStorage.getItem("carrito");

//si no hay carrito o está mal definido
if (!carritoString || carritoString === "undefined") {
    localStorage.setItem("carrito", JSON.stringify([]));
    carritoString = "[]";
}

let carrito = JSON.parse(carritoString);
console.log("Carrito inicial:", carrito);

// cargar productos 
const cargarProductos = function () {
    fetch("./js/productos.json")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("Error al cargar productos: " + respuesta.status);
            }
            return respuesta.json();
        })
        .then((productos) => {
            renderizarProductos(productos); //mostrar productos
            inicializarBotonesAgregar(productos); //botón agregar
            inicializarBotonesFiltro(productos); // botones (TV, móviles...)
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
        });
};

// renderizar productos
const renderizarProductos = function (productos) {
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML = ""; 

    productos.forEach((producto) => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");
        productoElemento.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.appendChild(productoElemento);
    });
};

// inicializar botones: agregar
const inicializarBotonesAgregar = (productos) => {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => agregarAlCarrito(boton.dataset.id, productos));
    });
};

// inicializar botones TV, móviles,....
const inicializarBotonesFiltro = (productos) => {
    // botón: todos los productos 
    const botonTodos = document.getElementById("todos");
    botonTodos.addEventListener("click", () => {
        renderizarProductos(productos); //mostrar todos los productos 
        inicializarBotonesAgregar(productos); 
    });

    // botón: móviles
    const botonMoviles = document.getElementById("moviles");
    botonMoviles.addEventListener("click", () => {
        const moviles = productos.filter((producto) => producto.categoria.id === "moviles");
        renderizarProductos(moviles); 
        inicializarBotonesAgregar(moviles); 
    });

    // botón: portátiles
    const botonPortatiles = document.getElementById("portatiles");
    botonPortatiles.addEventListener("click", () => {
        const portatiles = productos.filter((producto) => producto.categoria.id === "portatiles");
        renderizarProductos(portatiles); 
        inicializarBotonesAgregar(portatiles); 
    });

    // botón: TV
    const botonTelevisores = document.getElementById("televisiones");
    botonTelevisores.addEventListener("click", () => {
        const televisores = productos.filter((producto) => producto.categoria.id === "televisiones");
        renderizarProductos(televisores); 
        inicializarBotonesAgregar(televisores); 
    });
};

// agregar al carrito
const agregarAlCarrito = (productoId, productos) => {
     const producto = productos.find((p) => p.id === productoId);

    if (!producto) {
        console.error("Producto no encontrado:", productoId);
        return;
    }

    // comprobar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find((item) => item.id === productoId);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    //guardar y actualizar el carrito 
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    actualizarNumerito(); 
};

// actualizar el número del carrito
const actualizarNumerito = () => {
    const numeroCarrito = document.getElementById("numerito");
    
        const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
        numeroCarrito.innerText = totalProductos;
    
};

// reiniciar el carrito
const reiniciarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify([])); //vaciar
    carrito = [];
    actualizarNumerito();

    console.log("Carrito reiniciado.");
};

// inicializar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarNumerito();
    //reiniciar el carrito,comprobar el clicj
    const enlaceCarbaShop = document.getElementById("link");
    if (enlaceCarbaShop) {
        enlaceCarbaShop.addEventListener("click", reiniciarCarrito);
    }
});
