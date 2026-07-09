const cartDrawer = document.getElementById("cart-drawer");

const overlay = document.getElementById("cart-overlay");

const openCartBtn = document.getElementById("cart-btn");

const closeCartBtn = document.getElementById("close-cart");

function openCart(){

    cartDrawer.classList.add("active");

    overlay.classList.add("active");

}

function closeCart(){

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

}

if(openCartBtn){

    openCartBtn.onclick=openCart;

}

if(closeCartBtn){

    closeCartBtn.onclick=closeCart;

}

if(overlay){

    overlay.onclick=closeCart;

}