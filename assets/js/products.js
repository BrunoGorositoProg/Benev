let productos = [];
let productosFiltrados = [];

/*==================================
CARGAR TODOS LOS PRODUCTOS
==================================*/

async function cargarProductos() {

    try {

        productos = await DB.getProductos();

        productosFiltrados = [...productos];

        renderHomeProducts();

        renderShopProducts();

        iniciarOrdenamiento();

    } catch (error) {

        console.error("Error cargando productos:", error);

    }

}

/*==================================
HOME
==================================*/

function renderHomeProducts() {

    const container = document.getElementById("featured-products");

    if (!container) return;

    container.innerHTML = "";

    const destacados = productos
        .filter(producto => producto.destacado)
        .slice(0, 4);

    destacados.forEach(producto => {

        const card = new Card(producto);

        container.innerHTML += card.render();

    });

}

/*==================================
SHOP
==================================*/

function renderShopProducts() {

    const container = document.getElementById("shop-products");

    if (!container) return;

    container.innerHTML = "";

    if (productosFiltrados.length === 0) {

        container.innerHTML = `
            <div class="shop-empty">
                <h2>No products found.</h2>
            </div>
        `;

        return;

    }

    productosFiltrados.forEach(producto => {

        const card = new Card(producto);

        container.innerHTML += card.render();

    });
    if (typeof Animation !== "undefined") {

    Animation.fadeElements();

}

    const contador = document.getElementById("product-count");

    if (contador) {

        contador.textContent = productosFiltrados.length;

    }

}

/*==================================
PRODUCT
==================================*/
function iniciarOrdenamiento(){

    const select = document.getElementById("sort-products");

    if(!select) return;

    select.addEventListener("change",()=>{

        switch(select.value){

            case "Newest":

                productosFiltrados.sort((a,b)=>b.id-a.id);

            break;

            case "Price ↑":

                productosFiltrados.sort((a,b)=>a.precio-b.precio);

            break;

            case "Price ↓":

                productosFiltrados.sort((a,b)=>b.precio-a.precio);

            break;

        }

        renderShopProducts();

    });

}

async function cargarProducto() {

    const container = document.getElementById("product-page");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (!id) return;

    const producto = await DB.getProducto(id);

    if (!producto) {

        container.innerHTML = `
            <h2>Producto no encontrado.</h2>
        `;

        return;

    }

    const variantes = await DB.getVariantes(id);

    let imagenes = await DB.getImagenes(id);

    /*==================================
    IMÁGENES
    ==================================*/

    if (!imagenes || imagenes.length === 0) {

        imagenes = [];

        [
            producto.imagen_principal,
            producto.imagen2,
            producto.imagen3,
            producto.imagen4

        ].forEach(imagen => {

            if (imagen) {

                imagenes.push({

                    imagen

                });

            }

        });

    }

    container.innerHTML = `

<section class="product-view">

    <div class="product-gallery">

        <div
            class="gallery-thumbnails"
            id="gallery-thumbnails">

        </div>

        <div class="gallery-main">

            <img
                id="main-product-image"
                src="${imagenes[0].imagen}"
                alt="${producto.nombre}">

        </div>

    </div>

    <div class="product-information">

        <span class="product-category">

            ${producto.categoria}

        </span>

        <h1>

            ${producto.nombre}

        </h1>

        <p class="product-price">

            $${Number(producto.precio).toLocaleString("es-AR")}

        </p>

        <p class="product-description">

            ${producto.descripcion || ""}

        </p>

        <div
            class="size-selector"
            id="size-selector">

        </div>

        <button
            class="btn-primary"
            id="add-cart-btn">

            Add To Bag

        </button>

        <ul class="product-details">

            <li>

                ${producto.fit}

            </li>

            <li>

                ${producto.gramaje}

            </li>

            <li>

                ${producto.composicion}

            </li>

        </ul>

    </div>

</section>

`;

    /*==================================
    MINIATURAS
    ==================================*/

    const thumbs = document.getElementById("gallery-thumbnails");

    imagenes.forEach(img => {

        thumbs.innerHTML += `

<div class="gallery-thumb">

    <img
        src="${img.imagen}"
        onclick="changeImage('${img.imagen}')">

</div>

`;

    });

    /*==================================
    TALLES
    ==================================*/

    const sizeContainer = document.getElementById("size-selector");

    variantes.forEach(variante => {

        sizeContainer.innerHTML += `

<button
    class="size-btn"
    data-id="${variante.id}">

    ${variante.talle}

</button>

`;

    });

}

/*==================================
CAMBIAR IMAGEN
==================================*/

function changeImage(url) {

    const image = document.getElementById("main-product-image");

    if (!image) return;

    image.style.opacity = 0;

    setTimeout(() => {

        image.src = url;

        image.onload = () => {

            image.style.opacity = 1;

        };

    }, 150);

}

window.changeImage = changeImage;