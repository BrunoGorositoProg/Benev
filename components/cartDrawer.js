class CartDrawer {

    render() {

        return `

<div class="cart-overlay" id="cart-overlay"></div>

<aside class="cart-drawer" id="cart-drawer">

    <div class="cart-header">

        <h2>Shopping Bag</h2>

        <button id="close-cart">

            <i class="fa-solid fa-xmark"></i>

        </button>

    </div>

    <div class="cart-body" id="cart-items">

        <div class="cart-empty">

            <p>Your bag is empty.</p>

        </div>

    </div>

    <div class="cart-footer">

        <div class="cart-total">

            <span>Subtotal</span>

            <strong id="cart-total">$0</strong>

        </div>

        <button id="checkout-btn">

            Request Order

        </button>

    </div>

</aside>

`;

    }

}

document.body.insertAdjacentHTML(

    "beforeend",

    new CartDrawer().render()

);