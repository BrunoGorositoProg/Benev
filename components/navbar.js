class Navbar {

    render() {

        return `

<header class="navbar">

    <div class="navbar-container">

        <nav class="navbar-left">

            <a href="shop.html">Collection</a>

            <a href="about.html">About</a>

        </nav>

        <a href="index.html" class="navbar-logo">

            <img src="assets/img/logo01.png" alt="Benev">

        </a>

        <div class="navbar-right">

            <button class="icon-btn">

                <i class="fa-solid fa-magnifying-glass"></i>

            </button>

            <button class="icon-btn cart-btn" id="cart-btn">

                <i class="fa-solid fa-bag-shopping"></i>

                <span id="cart-count">0</span>

            </button>

            <button class="menu-btn">

                <i class="fa-solid fa-bars"></i>

            </button>

        </div>

    </div>

</header>

`;

    }

}

document.getElementById("navbar").innerHTML = new Navbar().render();