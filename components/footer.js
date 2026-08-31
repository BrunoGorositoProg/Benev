class Footer {
  render() {
    const year = new Date().getFullYear();
    return `
<footer class="footer">
  <div class="container footer-container">

    <div class="footer-brand">
      <img src="assets/img/BenevSinFondoBlanco.png" alt="Benev">
      <p>Hecho con intención.</p>
      <p>Los detalles cuentan. Nosotros empezamos por ellos.</p>
    </div>

    <div class="footer-links">
      <div>
        <h4>Navigate</h4>
        <a href="index.html">Home</a>
        <a href="shop.html">Shop</a>
      </div>
      <div>
        <h4>Contact</h4>
        <a href="https://instagram.com/benev.oficial" target="_blank" rel="noopener">Instagram</a>
        <a href="https://wa.me/5493492603416" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>

  </div> 

  <div class="container footer-bottom">
    © ${year} Benev — Built Different.
  </div>
</footer>
    `;
  }
}

document.getElementById('footer').innerHTML = new Footer().render();