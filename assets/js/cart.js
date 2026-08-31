/* ============================================================
   BENEV CART — drawer + lógica en un solo archivo
   Se carga DESPUÉS de navbar.js (que inyecta #cart-drawer)
   ============================================================ */

/* ── 1. Inyectar el drawer en el contenedor que crea navbar ── */
const _drawerContainer = document.getElementById("cart-drawer");
if (_drawerContainer) {
    _drawerContainer.innerHTML = `
<div id="cart-overlay" class="cart-overlay"></div>

<aside id="cart-drawer-panel" class="cart-drawer">

    <div class="cart-header">
        <div class="cart-header-info">
            <span class="cart-label">Tu bolsa</span>
            <h2>Carrito</h2>
        </div>
        <button id="close-cart" class="close-cart" aria-label="Cerrar carrito">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>

    <div id="cart-items" class="cart-items">
        <div class="cart-empty">
            <i class="fa-solid fa-bag-shopping"></i>
            <h3>Tu bolsa está vacía</h3>
            <p>Agregá productos para empezar tu pedido.</p>
        </div>
    </div>

    <div class="cart-footer">
        <div class="cart-total">
            <span>Total</span>
            <strong id="cart-total">$0</strong>
        </div>
        <button id="checkout-btn" class="cart-checkout">
            Realizar pedido por WhatsApp
        </button>
    </div>

</aside>`;
}

/* ============================================================
   CART CLASS
   ============================================================ */
class Cart {

    constructor() {
        this.storageKey = "benev-cart";
        this.items      = [];

        /* referencias al DOM — existen porque el drawer ya fue inyectado */
        this.drawer          = document.getElementById("cart-drawer-panel");
        this.overlay         = document.getElementById("cart-overlay");
        this.itemsContainer  = document.getElementById("cart-items");
        this.totalElement    = document.getElementById("cart-total");
        this.counterElement  = document.getElementById("cart-count");
        this.checkoutButton  = document.getElementById("checkout-btn");

        this.load();
        this.events();
        this.render();
    }

    /* ── STORAGE ─────────────────────────────────────────── */
    load() {
        const data = localStorage.getItem(this.storageKey);
        this.items = data ? JSON.parse(data) : [];
    }
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    /* ── DRAWER ──────────────────────────────────────────── */
    open() {
        this.drawer?.classList.add("active");
        this.overlay?.classList.add("active");
        document.body.style.overflow = "hidden";
    }
    close() {
        this.drawer?.classList.remove("active");
        this.overlay?.classList.remove("active");
        document.body.style.overflow = "";
    }

    /* ── EVENTS ──────────────────────────────────────────── */
    events() {
        document.addEventListener("click", e => {
            if (e.target.closest("#cart-button"))  this.open();
            if (e.target.closest("#close-cart"))   this.close();
            if (e.target === this.overlay)          this.close();
        });

        /* cerrar con Escape */
        document.addEventListener("keydown", e => {
            if (e.key === "Escape") this.close();
        });

        this.checkoutButton?.addEventListener("click", () => this.checkout());
    }

    /* ── ADD ─────────────────────────────────────────────── */
    add(producto, variante) {
        const existente = this.items.find(i =>
            i.id === producto.id && i.varianteId === variante.id
        );
        if (existente) {
            existente.cantidad++;
        } else {
            this.items.push({
                id:        producto.id,
                nombre:    producto.nombre,
                imagen:    producto.imagen_principal,
                precio:    Number(producto.precio),
                varianteId: variante.id,
                talle:     variante.talle,
                stock:     variante.stock ?? null,
                cantidad:  1
            });
        } 
        this.save();
        this.render();
        this.open();
    }

    /* ── REMOVE / INCREASE / DECREASE / CLEAR ────────────── */
    remove(index)   { this.items.splice(index, 1); this.save(); this.render(); }
    increase(index) {
        const item = this.items[index];
        if (item.stock !== undefined && item.cantidad >= item.stock) return;
        item.cantidad++;
        this.save();
        this.render();
    }
    decrease(index) {
        if (this.items[index].cantidad > 1) {
            this.items[index].cantidad--;
            this.save();
            this.render();
        } else {
            this.remove(index);
        }
    }
    clear() { this.items = []; this.save(); this.render(); }

    /* ── RENDER ──────────────────────────────────────────── */
    render() {
        this.renderCounter();
        if (!this.itemsContainer) return;

        if (this.items.length === 0) {
            this.itemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-bag-shopping"></i>
                <h3>Tu bolsa está vacía</h3>
                <p>Agregá productos para empezar tu pedido.</p>
            </div>`;
            if (this.totalElement) this.totalElement.textContent = "$0";
            return;
        }

        let total = 0;
        this.itemsContainer.innerHTML = this.items.map((item, i) => {
            total += item.precio * item.cantidad;
            return this.itemTemplate(item, i);
        }).join("");

        if (this.totalElement) {
            this.totalElement.textContent = "$" + total.toLocaleString("es-AR");
        }

        this.bindItemEvents();
    }

    /* ── ITEM TEMPLATE ───────────────────────────────────── */
    itemTemplate(item, index) {
        return `
<div class="cart-item">

    <div class="cart-item-img">
        <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
    </div>

    <div class="cart-item-info">
        <span class="cart-item-name">${item.nombre}</span>
        <span class="cart-item-meta">Talle: ${item.talle}</span>
        <span class="cart-item-price">$${item.precio.toLocaleString("es-AR")}</span>

        <div class="cart-qty">
            <button class="cart-qty-btn cart-minus" data-index="${index}" aria-label="Reducir">−</button>
            <span class="cart-qty-num">${item.cantidad}</span>
            <button class="cart-qty-btn cart-plus"  data-index="${index}" aria-label="Aumentar">+</button>
        </div>

        <button class="cart-item-remove" data-index="${index}">Eliminar</button>
    </div>

</div>`;
    }

    /* ── COUNTER ─────────────────────────────────────────── */
    renderCounter() {
        if (!this.counterElement) return;
        const total = this.items.reduce((acc, i) => acc + i.cantidad, 0);
        this.counterElement.textContent = total;
        this.counterElement.style.display = total > 0 ? "flex" : "none";
    }

    /* ── BIND ITEM EVENTS ────────────────────────────────── */
    bindItemEvents() {
        this.itemsContainer.querySelectorAll(".cart-plus").forEach(btn => {
            btn.onclick = () => this.increase(Number(btn.dataset.index));
        });
        this.itemsContainer.querySelectorAll(".cart-minus").forEach(btn => {
            btn.onclick = () => this.decrease(Number(btn.dataset.index));
        });
        this.itemsContainer.querySelectorAll(".cart-item-remove").forEach(btn => {
            btn.onclick = () => this.remove(Number(btn.dataset.index));
        });
    }

    /* ── CHECKOUT → WHATSAPP ─────────────────────────────── */
    getSubtotal() {
        return this.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    }

    checkout() {
        if (this.items.length === 0) {
            alert("Tu bolsa está vacía.");
            return;
        }

        let msg = `*Benev — Built Different*%0A%0A`;
        msg += `*Pedido:*%0A%0A`;
        this.items.forEach(item => {
            msg += `• ${item.nombre}%0A`;
            msg += `  Talle: ${item.talle}%0A`;
            msg += `  Cantidad: ${item.cantidad}%0A`;
            msg += `  Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-AR")}%0A%0A`;
        });
        msg += `*TOTAL: $${this.getSubtotal().toLocaleString("es-AR")}*`;

        window.open(`https://wa.me/5493492603416?text=${msg}`, "_blank");
    }

    /* ── HELPERS ─────────────────────────────────────────── */
    exists(productoId, varianteId) {
        return this.items.find(i => i.id === productoId && i.varianteId === varianteId);
    }
    getTotalItems() {
        return this.items.reduce((acc, i) => acc + i.cantidad, 0);
    }
}

/* ── Instancia global ────────────────────────────────────── */
const cart = new Cart();
window.cart = cart;

/* Sincronizar entre tabs */
window.addEventListener("storage", () => { cart.load(); cart.render(); });