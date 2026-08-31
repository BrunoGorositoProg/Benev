const SUPABASE_URL = "https://mojwlddkxztnkbntpulh.supabase.co";
const SUPABASE_KEY = "sb_publishable_-jVVmWkAH8ragZhJoU5eeA_SS6L_h19";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const DB = {

    /*==================================
    PRODUCTOS
    ==================================*/

    async getProductos() {
        const { data, error } = await supabaseClient
            .from("productos")
            .select("*")
            .eq("activo", true)
            .order("created_at", { ascending: false });
        if (error) { console.error(error); return []; }
        return data;
    },

    async getProducto(id) {
        const { data, error } = await supabaseClient
            .from("productos")
            .select("*")
            .eq("id", id)
            .single();
        if (error) { console.error(error); return null; }
        return data;
    },

    /*==================================
    IMAGENES
    ==================================*/

    async getImagenes(productoId) {
        const { data, error } = await supabaseClient
            .from("imagenes_producto")
            .select("*")
            .eq("producto_id", productoId)
            .order("orden");
        if (error) { console.error(error); return []; }
        return data;
    },

    /*==================================
    TALLES
    ==================================*/

    async getVariantes(productoId) {
        const { data, error } = await supabaseClient
            .from("variantes")
            .select("*")
            .eq("producto_id", productoId);
        if (error) { console.error(error); return []; }
        return data;
    },

    /*==================================
    GUÍA DE TALLES
    ==================================*/
 
    async getSizeGuide(id) {
        const { data, error } = await supabaseClient
            .from("size_guides")
            .select("talles")
            .select("talles, imagen_guia")
            .eq("id", id)
            .single();
        if (error) { console.error(error); return null; }
        return data;
    }

};