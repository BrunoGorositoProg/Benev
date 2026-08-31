class Navbar {
  render() {
    return `
<header class="navbar">
  <div class="container navbar-container">

    <a href="index.html" class="nav-logo">
      <img src="assets/img/BenevSinFondo.png" alt="Benev">
    </a>

    <nav class="nav-menu">
      <a href="index.html">Home</a>
      <a href="shop.html">Shop</a>
    </nav>

    <div class="nav-actions">
      <button id="cart-button" class="nav-icon" aria-label="Cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <span id="cart-count">0</span>
      </button>
      <button id="menu-button" class="nav-icon mobile-only" aria-label="Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

  </div> 
</header>

<div id="mobile-menu" class="mobile-menu">
  <a href="index.html">Home</a>
  <a href="shop.html">Shop</a>
</div>

<div id="cart-drawer"></div>
    `;
  }
}

document.getElementById('navbar').innerHTML = new Navbar().render();

/* MOBILE MENU */
const menuButton  = document.getElementById('menu-button');
const mobileMenu  = document.getElementById('mobile-menu');
const menuIcon    = menuButton?.querySelector('i');

menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('active');
  if (menuIcon) {
    menuIcon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }
});

/* Close on link click */
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    if (menuIcon) menuIcon.className = 'fa-solid fa-bars';
  });
});

/* SCROLL */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });