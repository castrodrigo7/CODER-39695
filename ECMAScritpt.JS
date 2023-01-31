class ProductManager {

elementos

    constructor(){
        this.elementos = []
    }


    addProduct({title, description, price, thumbnail, code, stock, id}) {
        if (this.elementos.find(e => e.code === code)) {
            return console.error("Error. Código repetido")
        }
        const elementos = new Producto({title, description, price, thumbnail, code, stock, id})
        this.elementos.push(elementos)
        console.log(`Producto Agregado correctamente. ID: ${id}`);
    }

    getProducts() {
        return this.elementos
    }
    
    getProductById(id) {
        const producto = this.elementos.find(e => e.id === id)
        if (!producto) {
            throw new Error("Producto no encontrado") 
        } else {
            console.log(producto);
        }
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
        this.title = title
        if (title === undefined){
            throw new Error("el titulo es un campo obligatorio")
        }
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = id ++
    }

}

const productManager = new ProductManager()

productManager.addProduct({ title: "Celular Galaxy S21 FE 5G Graphite", description: "Triple Cámara trasera de 12 MP + 12 MP + 8 MP Cámara Frontal de 32 MP. Infinity-O Display de 6.4 FHD+ Dynamic AMOLED 2X HID 120Hz. Procesador Exynos 2100 | Octa-Core 2.9GHz,2.8GHz,2.2GHz. 4.500 mAh para mayor duración de la batería y 25W Super Fast charging", price: 115999, thumbnail: "https://samsungar.vtexassets.com/arquivos/ids/177291-600-auto?width=600&height=auto&aspect=true", code: "SM-G990EZAAARO", stock: 16, id:1})
console.log(productManager.getProducts()); 
productManager.getProductById(1)