let productos = [];
let productosFiltrados = [];
let productoActual = null;
let varianteSeleccionada = null;
/*==================================
CARGAR TODOS LOS PRODUCTOS
==================================*/

async function cargarProductos() {

    try {

        productos = await DB.getProductos(id);
        productoActual = producto;
        productosFiltrados = [...productos];

        renderHomeProducts();

        renderShopProducts();

    } catch (error) {

        console.error(error);

    }

}

/*==================================
HOME
==================================*/

function renderHomeProducts() {

    const container = document.getElementById("featured-products");

    if (!container) return;

    container.innerHTML = "";

    productos
        .filter(producto => producto.destacado)
        .slice(0, 3)
        .forEach(producto => {

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

    productosFiltrados.forEach(producto => {

        const card = new Card(producto);

        container.innerHTML += card.render();

    });

}

/*==================================
PRODUCT
==================================*/

async function cargarProducto() {

    const container = document.getElementById("product-page");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (!id) return;

    const producto = await DB.getProducto(id);

    if (!producto) {

        container.innerHTML = "<h2>Producto no encontrado.</h2>";

        return;

    }

    const imagenes = await DB.getImagenes(id);

    const variantes = await DB.getVariantes(id);

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
                src="${producto.imagen_principal}"
                alt="${producto.nombre}"
            >

        </div>

    </div>

    <div class="product-information">

        <span class="product-category">

            ${producto.categoria || "COLLECTION"}

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

        <div class="product-actions">

            <button
                class="btn-primary"
                id="add-cart-btn">

                Add To Bag

            </button>

        </div>

        <ul class="product-details">

            <li>${producto.gramaje || ""}</li>

            <li>${producto.composicion || ""}</li>

            <li>${producto.fit || ""}</li>

        </ul>

    </div>

</section>

`;

    /*==========================
    GALERÍA
    ==========================*/

    const thumbs = document.getElementById("gallery-thumbnails");

    if (imagenes.length > 0) {

        imagenes.forEach(img => {

            thumbs.innerHTML += `

                <div class="gallery-thumb">

                    <img
                        src="${img.imagen}"
                        onclick="changeImage('${img.imagen}')"
                    >

                </div>

            `;

        });

    } else {

        thumbs.innerHTML = `

            <div class="gallery-thumb">

                <img
                    src="${producto.imagen_principal}"
                    onclick="changeImage('${producto.imagen_principal}')"
                >

            </div>

        `;

    }

    /*==========================
    TALLES
    ==========================*/

    const sizeContainer = document.getElementById("size-selector");

    variantes
    .filter(variant => variant.stock > 0)
    .forEach(variant => {

        sizeContainer.innerHTML += `

            <button
                class="size-btn"
                data-id="${variant.id}"
                data-talle="${variant.talle}">

                ${variant.talle}

            </button>

        `;

    });

document.querySelectorAll(".size-btn").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".size-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        varianteSeleccionada = {

            id: Number(button.dataset.id),

            talle: button.dataset.talle

        };

    });

});

document
    .getElementById("add-cart-btn")
    .addEventListener("click", () => {

        if (!varianteSeleccionada) {

            alert("Seleccioná un talle.");

            return;

        }

        cart.add(

            productoActual,

            varianteSeleccionada

        );

    });

}

/*==================================
CAMBIAR IMAGEN
==================================*/

function changeImage(url){

    const image = document.getElementById("main-product-image");

    image.style.opacity = 0;

    setTimeout(()=>{

        image.src = url;

        image.onload = ()=>{

            image.style.opacity = 1;

        };

    },150);

}

window.changeImage = changeImage;