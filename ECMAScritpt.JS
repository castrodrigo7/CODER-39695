const fs = require('fs')
const { json } = require('stream/consumers')
class ProductManager {

elementos

    constructor(){
        this.elementos = []
    }

    saveProduct() {
        fs.writeFileSync('./productos.json', JSON.stringify(this.elementos, null, '\t'))
    }
    
    addProduct({title, description, price, thumbnail, code, stock}) {
        if ((!title || !description || !price || !thumbnail || !code || !stock)) {
            return console.log("Los campos son obligatorios");
        }
        
        if (this.elementos.find(e => e.code === code)) {
            return console.error("Error. Código repetido")
        }

        let id = this.elementos.length+1
        const producto = new Producto({title, description, price, thumbnail, code, stock, id})
        this.elementos.push(producto)
        console.log(`Producto Agregado correctamente. ID: ${id}`);
    }

    getProducts() {
        return console.log(this.elementos); 
    }
    
    getProductById(id) {
        const producto = this.elementos.find(e => e.id === id)
        if (!producto) {
            throw new Error("Producto no encontrado") 
        } else {
            console.log(producto);
        }
    }

    loadProductsFromFile() {
        JSON.parse(fs.readFileSync("./productos.json", "utf-8"))

/*         this.elementos = this.elementos.concat(elementos); */
    }

    eliminarProducto(id) {
        let producto = this.elementos.find(producto => producto.id === id);
        if (!producto) {
            console.log("Not found");
            return;
        }
        this.elementos.splice(producto, 1);
    }

    updateProduc(id, title, description, price, thumbnail, code, stock) {
        let producto = this.elementos.find(producto => producto.id === id);
        if (!producto) {
            console.log("Not found");
            return;
        }
        producto.title = title;
        producto.description = description;
        producto.price = price;
        producto.thumbnail = thumbnail;
        producto.code = code;
        producto.stock = stock;
    }

}

class Producto {
    title
    description
    price
    thumbnail
    code
    stock
    id

    constructor({title, description, price, thumbnail, code, stock, id}) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }

}

const productManager = new ProductManager()
productManager.loadProductsFromFile()

productManager.addProduct({title:"Galaxy Watch5 44mm Graphite", code:"SM-R910NZAAARO", description:"Samsung es sinónimo de calidad y evolución tecnológica. Su sistema de navegación intuitivo y la buena integración con otros dispositivos hacen de los relojes inteligentes de esta marca una opción siempre confiable. Además, posee muchas opciones de personalización para que encuentres el estilo que va con vos. Descansá mejor, rendí más. Gracias a la función de monitoreo del sueño podrás aprender más acerca de tus hábitos por las noches y la calidad de tu descanso para que puedas rendir mejor al día siguiente.", thumbnail:"https://samsungar.vtexassets.com/arquivos/ids/184157-600-auto?width=600&height=auto&aspect=true", price:91999, stock:10})
productManager.addProduct({title:"Galaxy Tab S7 FE Negro", code:"SM-T733NZKMARO", description:"Esta tablet Samsung es la compañera ideal, con capacidad de sobra para cada una de tus actividades. El diseño delgado, compacto y portátil, con facilidad para sostener en una mano, lo convierte en una combinación perfecta de rendimiento y versatilidad. Transferir, sincronizar y acceder a tus dispositivos las veces que quieras ahora es posible. Sus conexiones bluetooth, wi-fi, mu-mimo, usb-c, smart switch, wi-fi direct te permiten potenciar sus funciones al máximo. Gracias a su cámara principal de 8 Mpx y frontal de 5 Mpx, podrás hacer videollamadas o sacarte fotos en cualquier momento y lugar, con una excelente calidad de thumbnail. Nitidez, brillo y colores vibrantes harán que tus experiencias se reflejen de manera óptima.", thumbnail:"https://samsungar.vtexassets.com/arquivos/ids/175848-600-auto?width=600&height=auto&aspect=true", price:199999, stock:5})
productManager.addProduct({title:"43 Full HD Smart TV T5300", code:"UN43T5300AGCZB", description:"Con el Smart TV UN43T5300 vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos. Sumergite en la pantalla. Su resolución Full HD muestra una clara evolución frente a su antecesora. Las imágenes que vas a ver van a tener una calidad superior con un alto nivel de detalle y colores mucho más llamativos.", thumbnail:"https://samsungar.vtexassets.com/arquivos/ids/164879-600-auto?width=600&height=auto&aspect=trueY", price:89249, stock:20})
productManager.getProducts()
productManager.getProductById(6)
productManager.saveProduct()

productManager.eliminarProducto(5);
console.log(productManager.getProducts());
productManager.saveProduct();

productManager.updateProduc(1, "Celular Galaxy S21 FE 5G", "Descripción del producto 1 actualizada de nuevo", 199999, "https://via.placeholder.com/150", "SM-G990EZAA", 60);
console.log(productManager.getProducts());
productManager.saveProduct();