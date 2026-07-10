class Navbar {

    render() {

        return `

<header class="navbar">

    <div class="container navbar-container">

        <a href="index.html" class="nav-logo">

            <img
                src="assets/img/logo01.png"
                alt="Benev">

        </a>

        <nav class="nav-menu">

            <a href="index.html">

                Home

            </a>

            <a href="shop.html">

                Shop

            </a>

            <a href="about.html">

                About

            </a>

        </nav>

        <div class="nav-actions">

            <button
                id="cart-button"
                class="nav-icon"
                aria-label="Carrito">

                <i class="fa-solid fa-bag-shopping"></i>

                <span id="cart-count">

                    0

                </span>

            </button>

            <button
                id="menu-button"
                class="nav-icon mobile-only"
                aria-label="Menú">

                <i class="fa-solid fa-bars"></i>

            </button>

        </div>

    </div>

</header>

<div id="mobile-menu" class="mobile-menu">

    <a href="index.html">

        Home

    </a>

    <a href="shop.html">

        Shop

    </a>

    <a href="about.html">

        About

    </a>

</div>

<div id="cart-drawer"></div>

        `;

    }

}

document.getElementById("navbar").innerHTML = new Navbar().render();

/*=========================
MENU MOBILE
=========================*/

const menuButton = document.getElementById("menu-button");

const mobileMenu = document.getElementById("mobile-menu");

menuButton?.addEventListener("click",()=>{

    mobileMenu.classList.toggle("active");

});

/*=========================
SCROLL
=========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});