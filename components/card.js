class Card{

    constructor(producto){

        this.producto=producto;

    }

    render(){

        return `

<article class="product-card fade-up">

<a href="product.html?id=${this.producto.id}">

<div class="product-image">

<img
src="${this.producto.imagen_principal}"
alt="${this.producto.nombre}"
loading="lazy">

${this.producto.nuevo?`

<span class="product-tag">

NEW

</span>

`:""}

</div>

<div class="product-info">

<span>

${this.producto.categoria}

</span>

<h3>

${this.producto.nombre}

</h3>

<p>

$${Number(this.producto.precio).toLocaleString("es-AR")}

</p>

</div>

</a>

</article>

`;

    }

}

window.Card=Card;