/*==================================================
BENEV
APP
==================================================*/

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await iniciarAplicacion();

    } catch (error) {

        console.error(error);

    }

});

async function iniciarAplicacion() {

    iniciarComponentes();

    iniciarAnimaciones();

    await cargarDatos();

}

function iniciarComponentes() {

    if (typeof Navbar !== "undefined") {

        new Navbar();

    }

    if (typeof Footer !== "undefined") {

        new Footer();

    }

}

async function cargarDatos() {

    if (typeof cargarProductos === "function") {

        await cargarProductos();

    }

    if (typeof cargarProducto === "function") {

        await cargarProducto();

    }

}

function iniciarAnimaciones() {

    if (typeof Animation !== "undefined") {

        Animation.init();

    }

}