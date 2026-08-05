class Card {

    constructor(producto) {
        this.producto = producto;
    }

    render() {
        const p   = this.producto;
        const img2 = p.imagen2 || p.imagen_principal;

        return `
<article class="product-card fade-up">
    <a class="product-card-link" href="product.html?id=${p.id}">

        <div class="product-image">
            <img class="img-front" src="${p.imagen_principal}" alt="${p.nombre}" loading="lazy">
            <img class="img-back"  src="${img2}"               alt="${p.nombre}" loading="lazy">
            ${p.nuevo ? `<span class="product-tag">Nuevo</span>` : ""}
            ${p.destacado && !p.nuevo ? `<span class="product-tag">Destacado</span>` : ""}
        </div>

        <div class="product-info">
            <span class="product-category">${p.categoria || ""}</span>
            <div class="product-row">
                <span class="product-name">${p.nombre}</span>
                <span class="product-price">$${Number(p.precio).toLocaleString("es-AR")}</span>
            </div>
            <span class="product-fit">${p.fit || "Oversized Fit"}</span>
        </div>

    </a>
</article>`;
    }
}

window.Card = Card;