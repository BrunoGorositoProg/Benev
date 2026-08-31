class CartDrawer {

    render() {

        return `

<div id="cart-overlay" class="cart-overlay"></div>

<aside id="cart-drawer-panel" class="cart-drawer">

    <div class="cart-header">

        <div>

            <span class="cart-label">

                SHOPPING BAG

            </span>

            <h2>

                Your Bag

            </h2>

        </div>

        <button
            id="close-cart"
            class="close-cart">

            <i class="fa-solid fa-xmark"></i>

        </button>

    </div>

    <div
        id="cart-items"
        class="cart-items">

        <div class="cart-empty">

            <i class="fa-solid fa-bag-shopping"></i>

            <h3>

                Your bag is empty

            </h3>

            <p>

                Add products to start your order.

            </p>

        </div>

    </div>

    <div class="cart-footer">

        <div class="cart-total">

            <span>
 
                Total

            </span>

            <strong id="cart-total">

                $0

            </strong>

        </div>

        <button
            id="checkout-btn"
            class="btn-primary cart-checkout">

            Request Order

        </button>

    </div>

</aside>

        `;

    }

}

document.getElementById("cart-drawer").innerHTML = new CartDrawer().render();