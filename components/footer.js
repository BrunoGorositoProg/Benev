class Footer {

    render() {

        return `

<footer class="footer">

    <div class="container footer-container">

        <div class="footer-brand">

            <img src="assets/img/logo01.png" alt="Benev">

            <p>

                Premium oversized essentials designed
                to last.

            </p>

        </div>

        <div class="footer-links">

            <h4>Navigation</h4>

            <a href="index.html">Home</a>

            <a href="shop.html">Collection</a>

            <a href="about.html">About</a>

        </div>

        <div class="footer-links">

            <h4>Social</h4>

            <a href="#">Instagram</a>

            <a href="#">TikTok</a>

            <a href="#">WhatsApp</a>

        </div>

    </div>

    <div class="footer-bottom">

        © 2026 Benev.

    </div>

</footer>

`;

    }

}

document.getElementById("footer").innerHTML = new Footer().render();