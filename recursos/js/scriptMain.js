// añadir json
const JSON = "./js/productos.json";

// cargar productos
const cargarProductos = function () {
    
    fetch(JSON)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error al cargar productos: " + respuesta.status);
            }
            return respuesta.json();
        })
        .then(function (productos) {
            
            renderizarProductos(productos);

            // eventos de los botones
            document.getElementById("todos").addEventListener("click", function () {
                renderizarProductos(productos);
            });

            document.getElementById("moviles").addEventListener("click", function () {
                const moviles = productos.filter(producto => producto.categoria.id === "moviles");
                renderizarProductos(moviles);
            });

            document.getElementById("portatiles").addEventListener("click", function () {
                const portatiles = productos.filter(producto => producto.categoria.id === "portatiles");
                renderizarProductos(portatiles);
            });

            document.getElementById("televisiones").addEventListener("click", function () {
                const televisores = productos.filter(producto => producto.categoria.id === "televisiones");
                renderizarProductos(televisores);
            });
        })
        .catch(function (error) {
            console.error("Error al cargar los productos:", error);
        });
};

// renderizar los productos
const renderizarProductos = function (productos) {
    const contenedorProductos = document.getElementById("contenedor-productos");

    // Limpiar cualquier contenido anterior 
    contenedorProductos.innerHTML = "";

    
    productos.forEach(function (producto) {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");

        // contenido del producto
        productoElemento.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;

        // Agregar el producto al contenedor principal
        contenedorProductos.appendChild(productoElemento);
    });
};



document.addEventListener("DOMContentLoaded", cargarProductos());

