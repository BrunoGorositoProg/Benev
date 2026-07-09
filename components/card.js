class Card {

    constructor(product){

        this.product = product;

    }

    render(){

        return `

<article class="product-card">

    <a href="product.html?id=${this.product.id}">

        <div class="product-image">

            <img
                src="${this.product.imagen}"
                alt="${this.product.nombre}"
                loading="lazy"
            >

        </div>

        <div class="product-information">

            <h3>${this.product.nombre}</h3>

            <span>$${Number(this.product.precio).toLocaleString("es-AR")}</span>

        </div>

    </a>

</article>

`;

    }

}