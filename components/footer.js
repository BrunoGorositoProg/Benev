class Footer {

    render() {

        const year = new Date().getFullYear();

        return `

<footer class="footer">

    <div class="container footer-container">

        <div class="footer-brand">

            <img
                src="assets/img/BenevSinFondoBlanco.png"
                alt="Benev">

            <p>

             

            </p>

        </div>

        <div class="footer-links">

            <div>

                <h4>

                    Navigation

                </h4>

                <a href="index.html">Home</a>

                <a href="shop.html">Shop</a>

                <a href="about.html">About</a>

            </div>

            <div>

                <h4>

                    Contact

                </h4>

                <a href="https://instagram.com/benev.oficial">

                    Instagram

                </a>

                <a href="https://wa.me/5493492XXXXXXXX">

                    WhatsApp

                </a>

            </div>

        </div>

    </div>

    <div class="footer-bottom">

        © ${year} Benev — Built Different.

    </div>

</footer>

        `;

    }

}

document.getElementById("footer").innerHTML = new Footer().render();