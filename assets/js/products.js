let productos = [];
let productosFiltrados = [];

/*==================================
CARGAR PRODUCTOS
==================================*/

async function cargarProducto() {

    const container = document.getElementById("product-page");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    if (!id) return;

    const producto = await DB.getProducto(id);

    if (!producto) {

        container.innerHTML = `
            <h2>Producto no encontrado</h2>
        `;

        return;

    }

    container.innerHTML = `

    <section class="product-view">

        <div class="product-gallery">

            <img
                src="${producto.imagen_principal}"
                alt="${producto.nombre}"
            >

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

            <div class="size-selector">

                <button class="size-btn">XS</button>

                <button class="size-btn">S</button>

                <button class="size-btn">M</button>

                <button class="size-btn">L</button>

                <button class="size-btn">XL</button>

            </div>

            <div class="product-actions">

                <button class="btn-primary">

                    Add To Bag

                </button>

            </div>

            <ul class="product-details">

                <li>
                    ${producto.gramaje || ""}
                </li>

                <li>
                    ${producto.composicion || ""}
                </li>

                <li>
                    ${producto.fit || ""}
                </li>

            </ul>

        </div>

    </section>

    `;

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

    if (productos.length === 0) {

        productos = await DB.getProductos();

    }

    const producto = productos.find(p => p.id === id);

    if (!producto) {

        container.innerHTML = "<h2>Producto no encontrado.</h2>";

        return;

    }

    container.innerHTML = `

<section class="product-view">

    <div class="product-gallery">

        <img src="${producto.imagen}" alt="${producto.nombre}">

    </div>

    <div class="product-information">

        <span class="product-category">

            PREMIUM COLLECTION

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

        <div class="product-actions">

            <button class="btn-primary">

                Add to Bag

            </button>

        </div>

    </div>

</section>

`;

}