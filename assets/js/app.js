class App {

    async init() {

        console.log("Benev initialized");

        this.loadPage();

    }

    loadPage() {

        const page = document.body.dataset.page;

        switch (page) {

            case "home":
                this.initHome();
                break;

            case "shop":
                this.initShop();
                break;

            case "product":
                this.initProduct();
                break;

            case "cart":
                this.initCartPage();
                break;

            case "about":
                this.initAbout();
                break;

        }

    }

    initHome() {

        if (typeof cargarProductos === "function") {

            cargarProductos();

        }

    }

    initShop() {

        if (typeof cargarProductos === "function") {

            cargarProductos();

        }

    }

    initProduct() {
        cargarProducto();

    }

    initCartPage() {

    }

    initAbout() {

    }

}

document.addEventListener("DOMContentLoaded", () => {

    const app = new App();

    app.init();

});