const SUPABASE_URL = "https://supabase.com/dashboard/project/mojwlddkxztnkbntpulh";

const SUPABASE_KEY = "sb_publishable_-jVVmWkAH8ragZhJoU5eeA_SS6L_h19";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const DB = {

    /*==================================
    PRODUCTOS
    ==================================*/

    async getProductos(){

        const { data, error } = await supabase
            .from("productos")
            .select("*")
            .eq("activo", true)
            .order("created_at", { ascending:false });

        if(error){

            console.error(error);

            return [];

        }

        return data;

    },

    async getProducto(id){

        const { data, error } = await supabase

            .from("productos")

            .select("*")

            .eq("id", id)

            .single();

        if(error){

            console.error(error);

            return null;

        }

        return data;

    },

    /*==================================
    IMAGENES
    ==================================*/

    async getImagenes(productoId){

        const { data, error } = await supabase

            .from("imagenes_producto")

            .select("*")

            .eq("producto_id", productoId)

            .order("orden");

        if(error){

            console.error(error);

            return [];

        }

        return data;

    },

    /*==================================
    TALLES
    ==================================*/

    async getVariantes(productoId){

        const { data, error } = await supabase

            .from("variantes")

            .select("*")

            .eq("producto_id", productoId);

        if(error){

            console.error(error);

            return [];

        }

        return data;

    }

};