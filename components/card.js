class Card {

    constructor(producto) {

        this.producto = producto;

    }

    render() {

        const segundaImagen =
            this.producto.imagen2 ||
            this.producto.imagen_principal;

        return `

<article class="product-card fade-up">

    <a href="product.html?id=${this.producto.id}">

        <div class="product-image">

            <img
                class="img-front"
                src="${this.producto.imagen_principal}"
                alt="${this.producto.nombre}"
                loading="lazy">

            <img
                class="img-back"
                src="${segundaImagen}"
                alt="${this.producto.nombre}"
                loading="lazy">

            ${this.producto.nuevo ? `

                <span class="product-tag">

                    NEW

                </span>

            ` : ""}

        </div>

        <div class="product-info">

    <div class="product-header">

        <h3>

            ${this.producto.nombre}

        </h3>

        <span class="product-price">

            $${Number(this.producto.precio).toLocaleString("es-AR")}

        </span>

    </div>

    <span class="product-fit">

        ${this.producto.fit || "Oversized Fit"}

    </span>

</div>

    </a>

</article>

`;

    }

}

window.Card = Card;