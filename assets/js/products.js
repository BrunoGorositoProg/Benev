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
        iniciarFiltros();
        iniciarOrdenamiento();
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

/*==================================
HOME — destacados
==================================*/
function renderHomeProducts() {
    const container = document.getElementById("featured-products");
    if (!container) return;
    const destacados = productos.filter(p => p.destacado).slice(0, 3);
    container.innerHTML = destacados.map(p => new Card(p).render()).join("");
}

/*==================================
SHOP — grilla completa
==================================*/
function renderShopProducts() {
    const container = document.getElementById("shop-products");
    if (!container) return;

    if (productosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="shop-empty">
                <h2>No hay productos disponibles.</h2>
                <p>Volvé más tarde.</p>
            </div>`;
        return;
    }

    container.innerHTML = productosFiltrados.map(p => new Card(p).render()).join("");

    if (typeof Animation !== "undefined") Animation.fadeElements();
}

/*==================================
FILTROS DE CATEGORÍA
==================================*/
function iniciarFiltros() {
    const btns = document.querySelectorAll(".filter-btn");
    if (!btns.length) return;

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filtro = btn.dataset.filter;
            productosFiltrados = filtro === "all"
                ? [...productos]
                : productos.filter(p => p.categoria?.toLowerCase() === filtro);

            renderShopProducts();
        });
    });
}

/*==================================
ORDENAMIENTO
==================================*/
function iniciarOrdenamiento() {
    const select = document.getElementById("sort-products");
    if (!select) return;

    select.addEventListener("change", () => {
        switch (select.value) {
            case "new":
                productosFiltrados.sort((a, b) => b.id - a.id);
                break;
            case "price-asc":
                productosFiltrados.sort((a, b) => a.precio - b.precio);
                break;
            case "price-desc":
                productosFiltrados.sort((a, b) => b.precio - a.precio);
                break;
        }
        renderShopProducts();
    });
}

/*==================================
PÁGINA DE PRODUCTO
==================================*/
async function cargarProducto() {
    const container = document.getElementById("product-page");
    if (!container) return;

    const id = Number(new URLSearchParams(window.location.search).get("id"));
    if (!id) return;

    const producto = await DB.getProducto(id);
    if (!producto) {
        container.innerHTML = `<h2 style="padding:120px 0;text-align:center">Producto no encontrado.</h2>`;
        return;
    }

    const variantes = await DB.getVariantes(id);
    let imagenes = await DB.getImagenes(id);

    if (!imagenes || imagenes.length === 0) {
        imagenes = [
            producto.imagen_principal,
            producto.imagen2,
            producto.imagen3,
            producto.imagen4
        ].filter(Boolean).map(imagen => ({ imagen }));
    }

    container.innerHTML = `
<section class="product-view">

    <div class="product-gallery">

        <div class="gallery-thumbnails" id="gallery-thumbnails"></div>

        <div class="gallery-main">
            <img
                id="main-product-image"
                src="${imagenes[0].imagen}"
                alt="${producto.nombre}">
        </div>

    </div>

    <div class="product-information">

        <span class="product-category">${producto.categoria || ""}</span>

        <h1>${producto.nombre}</h1>

        <p class="product-price">$${Number(producto.precio).toLocaleString("es-AR")}</p>

        <p class="product-description">${producto.descripcion || ""}</p>

        <span class="size-label">Talle</span>
        <div class="size-selector" id="size-selector"></div>

        <button class="btn-primary btn-add-cart" id="add-cart-btn">
            Agregar al carrito
        </button>

        <ul class="product-details">
            ${producto.fit        ? `<li>${producto.fit}</li>` : ""}
            ${producto.gramaje    ? `<li>${producto.gramaje}</li>` : ""}
            ${producto.composicion? `<li>${producto.composicion}</li>` : ""}
        </ul>

    </div>

</section>`;

    /* miniaturas */
    const thumbs = document.getElementById("gallery-thumbnails");
    imagenes.forEach((img, i) => {
        const div = document.createElement("div");
        div.className = "gallery-thumb" + (i === 0 ? " active" : "");
        div.innerHTML = `<img src="${img.imagen}" alt="">`;
        div.addEventListener("click", () => {
            document.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
            div.classList.add("active");
            changeImage(img.imagen);
        });
        thumbs.appendChild(div);
    });

    /* talles */
    const sizeContainer = document.getElementById("size-selector");
    variantes.forEach(v => {
        const sinStock = (v.stock ?? 0) <= 0;
        const btn = document.createElement("button");
        btn.className   = "size-btn" + (sinStock ? " sin-stock" : "");
        btn.dataset.id  = v.id;
        btn.dataset.stock = v.stock ?? 0;
        btn.disabled    = sinStock;
        btn.title       = sinStock ? "Sin stock" : `Stock: ${v.stock}`;
        btn.textContent = v.talle;
        btn.addEventListener("click", () => {
            document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
        sizeContainer.appendChild(btn);
    });

    /* ── ADD TO CART ── */
    const addBtn = document.getElementById("add-cart-btn");
    addBtn?.addEventListener("click", () => {
        const selectedBtn = document.querySelector(".size-btn.selected");
        if (!selectedBtn) {
            sizeContainer.style.outline = "1px solid red";
            setTimeout(() => sizeContainer.style.outline = "", 1200);
            return;
        }
        const variante = variantes.find(v => v.id === Number(selectedBtn.dataset.id));
        if (!variante || !window.cart) return;

        const stockDisponible = variante.stock ?? 0;
        const enCarrito = window.cart.items
            .filter(i => i.varianteId === variante.id)
            .reduce((acc, i) => acc + i.cantidad, 0);

        if (enCarrito >= stockDisponible) {
            addBtn.textContent = "Sin stock disponible";
            setTimeout(() => { addBtn.textContent = "Agregar al carrito"; }, 2000);
            return;
        }

        window.cart.add(producto, variante);
    });

    /* relacionados */
    cargarRelacionados(producto.categoria, id);
}

/*==================================
PRODUCTOS RELACIONADOS
==================================*/
async function cargarRelacionados(categoria, idActual) {
    const container = document.getElementById("related-products");
    if (!container) return;

    const todos = productos.length ? productos : await DB.getProductos();
    const relacionados = todos
        .filter(p => p.categoria === categoria && p.id !== idActual)
        .slice(0, 4);

    if (!relacionados.length) {
        document.querySelector(".related-products")?.remove();
        return;
    }

    container.innerHTML = relacionados.map(p => new Card(p).render()).join("");
}

/*==================================
CAMBIAR IMAGEN PRINCIPAL
==================================*/
function changeImage(url) {
    const img = document.getElementById("main-product-image");
    if (!img) return;
    img.style.opacity = 0;
    setTimeout(() => {
        img.src = url;
        img.onload = () => { img.style.opacity = 1; };
    }, 150);
}

window.changeImage = changeImage;