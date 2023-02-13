const fs = require('fs');
class ProductManager {

elementos

    constructor(){
        this.elementos = []
    }

    saveProducts() {
        fs.writeFileSync('./products.json', JSON.stringify(this.products, null, '\t'));
    
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
        let productsData = fs.readFileSync("./products.json", "utf-8");
        let products = JSON.parse(productsData);
        this.products = this.products.concat(products);
    }

    eliminarProducto(id) {
        let product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Not found");
            return;
        }
        this.products.splice(product, 1);
    }

    updateProduc(id, title, description, price, thumbnail, code, stock) {
        let product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Not found");
            return;
        }
        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;
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

productManager.addProduct({title: "Celular Galaxy S21 FE 5G Graphite", description: "Triple Cámara trasera de 12 MP + 12 MP + 8 MP Cámara Frontal de 32 MP. Infinity-O Display de 6.4 FHD+ Dynamic AMOLED 2X HID 120Hz. Procesador Exynos 2100 | Octa-Core 2.9GHz,2.8GHz,2.2GHz. 4.500 mAh para mayor duración de la batería y 25W Super Fast charging", price: 115999, thumbnail: "https://samsungar.vtexassets.com/arquivos/ids/177291-600-auto?width=600&height=auto&aspect=true", code: "SM-G990EZAAARO", stock: 16})
productManager.getProducts()
productManager.getProductById(6)
productManager.saveProducts()

productManager.eliminarProducto(5);
console.log(productManager.getProducts());
productManager.saveProducts();

productManager.updateProduc(1, "Producto 1 actualizado", "Descripción del producto 1 actualizada de nuevo", 600, "https://via.placeholder.com/150", "123460", 60);
console.log(productManager.getProducts());
productManager.saveProducts();