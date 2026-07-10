function abrirCarrito(){

    drawer.classList.add("active");

    overlay.classList.add("active");

}

function cerrarCarrito(){

    drawer.classList.remove("active");

    overlay.classList.remove("active");

}
/*==================================================
BENEV CART V1
==================================================*/

class Cart {

    constructor() {

        this.storageKey = "benev-cart";

        this.items = [];

        this.drawer = document.getElementById("cart-drawer-panel");
        this.overlay = document.getElementById("cart-overlay");

        this.itemsContainer = document.getElementById("cart-items");
        this.totalElement = document.getElementById("cart-total");
        this.counterElement = document.getElementById("cart-count");

        this.checkoutButton = document.getElementById("checkout-btn");

        this.load();

        this.events();

        this.render();

    }

    /*==================================
    STORAGE
    ==================================*/

    load() {

        const data = localStorage.getItem(this.storageKey);

        this.items = data ? JSON.parse(data) : [];

    }

    save() {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(this.items)

        );

    }

    /*==================================
    DRAWER
    ==================================*/

    open() {

        this.drawer.classList.add("active");

        this.overlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    close() {

        this.drawer.classList.remove("active");

        this.overlay.classList.remove("active");

        document.body.style.overflow = "";

    }

    /*==================================
    EVENTS
    ==================================*/

    events() {

        document.addEventListener("click", (e) => {

            if (e.target.closest("#cart-button")) {

                this.open();

            }

            if (e.target.closest("#close-cart")) {

                this.close();

            }

            if (e.target === this.overlay) {

                this.close();

            }

        });

        this.checkoutButton?.addEventListener(

            "click",

            () => this.checkout()

        );

    }

    /*==================================
    ADD PRODUCT
    ==================================*/

    add(producto, variante) {

        const existente = this.items.find(item =>

            item.id === producto.id &&

            item.varianteId === variante.id

        );

        if (existente) {

            existente.cantidad++;

        } else {

            this.items.push({

                id: producto.id,

                nombre: producto.nombre,

                imagen: producto.imagen_principal,

                precio: Number(producto.precio),

                varianteId: variante.id,

                talle: variante.talle,

                cantidad: 1

            });

        }

        this.save();

        this.render();

        this.open();

    }

    /*==================================
    REMOVE
    ==================================*/

    remove(index) {

        this.items.splice(index, 1);

        this.save();

        this.render();

    }

    /*==================================
    INCREASE
    ==================================*/

    increase(index) {

        this.items[index].cantidad++;

        this.save();

        this.render();

    }

    /*==================================
    DECREASE
    ==================================*/

    decrease(index) {

        if (this.items[index].cantidad > 1) {

            this.items[index].cantidad--;

        } else {

            this.remove(index);

            return;

        }

        this.save();

        this.render();

    }

    /*==================================
    CLEAR
    ==================================*/

    clear() {

        this.items = [];

        this.save();

        this.render();

    }
        /*==================================
    RENDER
    ==================================*/

    render() {

        this.renderCounter();

        if (!this.itemsContainer) return;

        if (this.items.length === 0) {

            this.itemsContainer.innerHTML = `

                <div class="cart-empty">

                    <i class="fa-solid fa-bag-shopping"></i>

                    <h3>

                        Your bag is empty

                    </h3>

                    <p>

                        Add products to start your order.

                    </p>

                </div>

            `;

            if (this.totalElement) {

                this.totalElement.textContent = "$0";

            }

            return;

        }

        this.itemsContainer.innerHTML = "";

        let total = 0;

        this.items.forEach((item, index) => {

            total += item.precio * item.cantidad;

            this.itemsContainer.innerHTML += this.itemTemplate(item, index);

        });

        if (this.totalElement) {

            this.totalElement.textContent =

                "$" + total.toLocaleString("es-AR");

        }

        this.bindItemEvents();

    }
        /*==================================
    SUBTOTAL
    ==================================*/

    getSubtotal() {

        return this.items.reduce((total, item) => {

            return total + (item.precio * item.cantidad);

        }, 0);

    }

    /*==================================
    CHECKOUT
    ==================================*/

    checkout() {

        if (this.items.length === 0) {

            alert("Your bag is empty.");

            return;

        }

        let mensaje = `*Benev*%0A`;
        mensaje += `Built Different.%0A%0A`;

        mensaje += `*Pedido:*%0A%0A`;

        this.items.forEach(item => {

            mensaje += `• ${item.nombre}%0A`;

            mensaje += `   Talle: ${item.talle}%0A`;

            mensaje += `   Cantidad: ${item.cantidad}%0A`;

            mensaje += `   Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-AR")}%0A%0A`;

        });

        mensaje += `*TOTAL:* $${this.getSubtotal().toLocaleString("es-AR")}`;

        const telefono = "5493492XXXXXXXX";

        window.open(

            `https://wa.me/${telefono}?text=${mensaje}`,

            "_blank"

        );

    }

    /*==================================
    EXISTS
    ==================================*/

    exists(productoId, varianteId) {

        return this.items.find(item =>

            item.id === productoId &&

            item.varianteId === varianteId

        );

    }

    /*==================================
    TOTAL ITEMS
    ==================================*/

    getTotalItems() {

        return this.items.reduce(

            (acc, item) => acc + item.cantidad,

            0

        );

    }

    /*==================================
    DEBUG
    ==================================*/

    print() {

        console.table(this.items);

    }

    /*==================================
    ITEM TEMPLATE
    ==================================*/

    itemTemplate(item, index) {

        return `

<div class="cart-item">

    <img
        src="${item.imagen}"
        class="cart-item-image"
        alt="${item.nombre}">

    <div class="cart-item-content">

        <h4>

            ${item.nombre}

        </h4>

        <span class="cart-item-size">

            ${item.talle}

        </span>

        <p>

            $${item.precio.toLocaleString("es-AR")}

        </p>

        <div class="cart-quantity">

            <button
                class="cart-minus"
                data-index="${index}">

                −

            </button>

            <span>

                ${item.cantidad}

            </span>

            <button
                class="cart-plus"
                data-index="${index}">

                +

            </button>

        </div>

    </div>

    <button
        class="cart-remove"
        data-index="${index}">

        <i class="fa-solid fa-trash"></i>

    </button>

</div>

`;

    }

    /*==================================
    COUNTER
    ==================================*/

    renderCounter() {

        if (!this.counterElement) return;

        const total = this.items.reduce(

            (acc, item) => acc + item.cantidad,

            0

        );

        this.counterElement.textContent = total;

    }

    /*==================================
    ITEM EVENTS
    ==================================*/

    bindItemEvents() {

        document

            .querySelectorAll(".cart-plus")

            .forEach(button => {

                button.onclick = () =>

                    this.increase(

                        Number(button.dataset.index)

                    );

            });

        document

            .querySelectorAll(".cart-minus")

            .forEach(button => {

                button.onclick = () =>

                    this.decrease(

                        Number(button.dataset.index)

                    );

            });

        document

            .querySelectorAll(".cart-remove")

            .forEach(button => {

                button.onclick = () =>

                    this.remove(

                        Number(button.dataset.index)

                    );

            });

    }

}
const cart = new Cart();

window.cart = cart;
window.addEventListener("storage", () => {

    cart.load();

    cart.render();

});