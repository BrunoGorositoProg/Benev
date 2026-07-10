/*==================================================
ANIMATIONS
==================================================*/

const Animation = {

    init() {

        this.fadeElements();

        this.navbarShadow();

        this.scrollTop();

    },

    fadeElements() {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        }, {

            threshold: .15

        });

        document

            .querySelectorAll(".fade-up")

            .forEach(element => {

                observer.observe(element);

            });

    },

    navbarShadow() {

        const navbar = document.querySelector(".navbar");

        if (!navbar) return;

        window.addEventListener("scroll", () => {

            navbar.classList.toggle(

                "scrolled",

                window.scrollY > 40

            );

        });

    },

    scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: "instant"

        });

    }

};

window.Animation = Animation;