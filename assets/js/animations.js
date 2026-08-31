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
const Lookbook = {

    speed: 0.45,

    position: 0,

    paused: false,

    init() {

        const track = document.getElementById("lookbookTrack");

        if (!track) return;

        this.track = track;

        // Duplicar automáticamente las imágenes
        track.innerHTML += track.innerHTML;

        this.totalWidth = track.scrollWidth / 2;

        track.parentElement.addEventListener("mouseenter", () => {

            this.paused = true;

        });

        track.parentElement.addEventListener("mouseleave", () => {

            this.paused = false;

        });

        requestAnimationFrame(() => this.animate());

    },

    animate() {

        if (!this.paused) {

            this.position += this.speed;

            if (this.position >= this.totalWidth) {

                this.position = 0;

            }

            this.track.style.transform =
                `translateX(-${this.position}px)`;

        }

        requestAnimationFrame(() => this.animate());

    }

};

window.Animation = Animation;