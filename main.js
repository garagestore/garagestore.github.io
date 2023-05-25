class Modal{
    constructor(){
        this.ui = document.getElementById("modal_content");
        this.btn_cerrar = document.getElementById("boton_modal");
        this.title = document.getElementById("titulo_modal");
        this.message = document.getElementById("mensaje_modal");
        this.init_events();
        //this.update("Tus caricias","dime porque porque porque, pi ri pi piii amneciaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa amneciaaaaaaaaaaaaaaaaaaaaaaa")
    }

    init_events(){
        this.btn_cerrar.addEventListener("click",()=>this.show(false))
        
    }
    update(titulo,mensaje){
        this.title.textContent = titulo
        this.message.textContent = mensaje
    }

    show(show){
        let scale
        if (show){
            scale = "1"
        }
        else{
            scale = "0"
        }
        // console.log(true)
        this.ui.style.transform = `scale(${scale})`
    }
}

class MenuSlider{
    constructor(){
        this.is_active = false;
        this.btn_slide_menu = document.getElementById("slide_button");
        this.main_obj = document.getElementById("slide_menu");
        this.bg_slide = document.getElementById("slide_menu");
        this.btn_slide_menu_close = document.getElementById("slide_button_close");
        this.init_events()
    }
    init_events(){
        this.btn_slide_menu.addEventListener("click",()=>this.show(true))
        this.btn_slide_menu_close.addEventListener("click",()=>{
            // this.is_active = false
            this.show(false)
        })
        
    }
    show(show){
        let trans
        if (show == true || show == "no"){
            trans = "0"    
        }
        else{
            
            trans = "-120"
            
        }
        this.main_obj.style.transform = `translateX(${trans}%)`
        this.main_obj.style.boxShadow = "5px 0 10px #00000044"
    }

}

class Productos{
    constructor(){
        this.lista = document.getElementById("productos").getElementsByTagName('section')
        this.productos_en_carrito
        this.se_obtubo = false
        this.imagenes = document.getElementsByClassName("imagenes_productos");
        this.init_events()
    }

    init_events(){
        for(let i = 0;i<this.imagenes.length;i++){
            this.imagenes[i].image_active = false;
                    this.imagenes[i].addEventListener("click",function(){
                        let scale;
                        if(this.image_active == false){
                            scale = "1.7"
                            this.image_active = true
                        }
                        else{
                            scale = "1"
                            this.image_active = false
                        }

                        this.style.transform = `scale(${scale})`
                    })
                }
        //lo mismo pero para la galeria 
        let imagenes = document.getElementById("galeria_productos").getElementsByTagName("img")
        for(let i = 0;i<imagenes.length;i++){
            imagenes[i].image_galery_active = false
            imagenes[i].addEventListener("click",function(){
                let width;
                let opacity;
                let contrast;
                if(this.image_galery_active == false){
                    width = "max(40vw,250px)"
                    opacity = "1"
                    contrast = "contrast(110%)"
                    this.image_galery_active = true
                }
                else{
                    width = "0"
                    opacity = "0.7"
                    contrast = "contrast(100%)"
                    
                    this.image_galery_active = false
                }
                this.style.width = width;
                this.style.opacity = opacity;
                this.style.filter = `${contrast}`

            })
        }
    };

    obtener(){
        let productos = []
        let cont = 0
        for(let i = 0;i<this.lista.length;i++){
            if(this.lista[i].getElementsByClassName("check_producto")[0].checked){
                productos[cont] = this.lista[i]
                cont ++
            }
            // if (this.lista[i].getElementsByClassName("check_producto")[0].checked)
        }
        this.productos_en_carrito = productos
        this.se_obtubo = true
        // console.log(this.productos_en_carrito)
    }

    separar_data_carrito(){
        if (this.se_obtubo){
            let productos_data = []
            for (let i = 0;i<this.productos_en_carrito.length;i++){
                productos_data[i] = {
                    nombre:this.productos_en_carrito[i].getElementsByClassName("titulo_producto")[0].textContent,
                    precio:this.productos_en_carrito[i].getElementsByClassName("precio_producto")[0].textContent,
                    img:this.productos_en_carrito[i].getElementsByClassName("imagenes_productos")[0].src
                }

            }
            this.productos_en_carrito = productos_data
            
            return productos_data

        }
        else{
            return false
        }
    }

}

class Carrito{
    constructor(){
        this.content_carrito = document.getElementById("content_products");
        // this.productos;
        this.productos = new Productos()
        this.btn_carrito = document.getElementById("carrito_button");
        this.btn_carrito_close = document.getElementById("carrito_close")
        this.init_events()
        this.carrito = document.getElementById("carrito_content")
        this.total_compra = 0
        this.fecha_entrega = undefined

    }

    init_events(){
        this.btn_carrito.addEventListener("click",()=>this.mostrar_carrito())
        this.btn_carrito_close.addEventListener("click",()=>this.show_carrito(false))
    }

    realizar_compra(){
        //!solo obtiene los actuales...
        const productos = document.getElementsByClassName("product_carrito");
        // console.log(productos)
        let total_compra = 0
        for (let i = 0;i<productos.length;i++){
            total_compra += (
                productos[i].getElementsByClassName("product_precio")[0].textContent * productos[i].getElementsByClassName("product_num_piezas")[0].value)
            }  
            const fecha_entrega_widget = document.getElementById("fecha_entrega")
        this.fecha_entrega = fecha_entrega_widget.value
        this.total_compra = total_compra

    }

    add_products(){
        this.total_compra = 0
        for (let i = 0;i<this.productos.productos_en_carrito.length;i++){
            this.content_carrito.innerHTML += `
            <div class="product_carrito">
            <img src="${this.productos.productos_en_carrito[i].img}" class="product_imagen">
            <h5 class="product_titulo">
                ${this.productos.productos_en_carrito[i].nombre}
            </h5>
            <div class="product_precio_content">
                <h5 class="product_precio">
                    ${this.productos.productos_en_carrito[i].precio}
                </h5>
                mx
            </div>
            <div class="product_piezas_content">
                <h5>Numero piezas</h5>
                <input type="number" class="product_num_piezas" value="1">
            </div>
        </div>
            `
        }
        //! aun no terminas esto, apenas estamos viendo como agregar productos al carrito...
    }

    show_carrito(show){
        let trans
        if(show){
            trans = "0"
        }
        else{
            trans = "200"
        }
        this.carrito.style.transform = `translateX(${trans}%)`
    }
    mostrar_carrito(){
        this.content_carrito.innerHTML = ""
        this.productos.obtener()
        const productos_carrito = this.productos.separar_data_carrito()
        // for (let i=0;i<productos_carrito.length;i++){
        //     console.log(productos_carrito[i].nombre,productos_carrito[i].precio)
        // }
        this.add_products()
        this.show_carrito(true)
    }
}


class Admin{
    constructor(){
        this.modal = new Modal()
        this.carrito = new Carrito()
        this.sound = new Audio()
        this.slider = new MenuSlider()
        this.check_box_list = document.getElementsByClassName("check_producto")
        this.btn_productos = document.getElementsByClassName("boton_productos");
        this.btn_comprar = document.getElementById("carrito_boton_comprar");
        this.init_events()
    }
    

    show_products(){
        this.sound.play()
    }
    validate_data(){
        const fecha_entrega_widget = document.getElementById("fecha_entrega")
        const conditions = [fecha_entrega_widget.value.length > 0,
                    this.carrito.productos.productos_en_carrito.length > 0]
        let all_ok = [true,""]
        for (let i in conditions){
            if (conditions[i] == false){
                let mensaje_error
                if (i == 0){
                    mensaje_error = `
                        (sin fecha de entrega)
                    `
                }
                else if(i == 1){
                    mensaje_error = `
                        (sin productos en el carrito)
                    `
                }
                all_ok = [false,mensaje_error]
            }
        }

        return all_ok

    }
    realizar_compra(){
        const result = this.validate_data()
        if (result[0] == true){
            const interpreter_date = (date='')=>{
                // @ format date: 2023-05-27
                const monts = {
                    '01':"enero",
                    '02':"febrero",
                    '03':"marzo",
                    '04':"abril",
                    '05':"mayo",
                    '06':"junio",
                    '07':"julio",
                    '08':"agosto",
                    '09':"septiembre",
                    '10':"octubre",
                    '11':"noviembre",
                    '12':"diciembre"
                }
                let newDate;
                newDate = date.split("-")
                newDate = `${newDate[2]} de ${monts[newDate[1]]} del ${newDate[0]}`

                return newDate
            }
            this.carrito.realizar_compra()
        this.modal.update("LISTO!",`
            La compra se realizo correctamente. El total de tu compra fue de 
            ${this.carrito.total_compra}mxn, y los productos te llegaran el 
            ${interpreter_date(this.carrito.fecha_entrega)}.
        `)

        
        this.carrito.show_carrito(false)
        }
        else{
            this.modal.update("Error de compra",`
                No llenaste un campo necesario para hacer la compra.
                Tu error fue = ${result[1]}
            `)
            
        }
        this.modal.show(true)
    }
    

    init_events(){
        for (let i=0;i<this.btn_productos.length;i++){
            this.btn_productos[i].addEventListener("click",()=>this.show_products())
        }
        this.btn_comprar.addEventListener("click",()=>this.realizar_compra())
        for (let j=0;j<this.check_box_list.length;j++){
            this.check_box_list[j].addEventListener("click",()=>this.carrito.show_carrito(false))
            
        }    
    }

        
}

const admin = new Admin()