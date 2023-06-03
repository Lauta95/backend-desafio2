class ProductManager {

    constructor() {
        this.products = [];
    }

    getNextId = () => {
        const count = this.products.length;
        const nextId = (count > 0) ? this.products[count - 1].id + 1 : 1
        return nextId;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        const yaExisteCode = this.products.find((product) => product.code === code);
        if (yaExisteCode) {
            console.log('ERROR: se repite el campo CODE');
            // return early 
            return;
        }

        const agregar = {
            id: this.getNextId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        const obligatorios = (!(title && description && price && thumbnail && code && stock)) ? console.log('Error: todos los campos son obligatorios') : this.products.push(agregar);
        return obligatorios;
    }

    getProducts = () => { return this.products }
    // para buscar un id:
    getProductById = (id) => {
        const product = this.products.find((product) => product.id === id);
        console.log((product) ? (`producto encontrado: ${JSON.stringify(product)}`) : ('no se encontró el producto con ese id'));
    }
}


const producto = new ProductManager();
producto.addProduct('titulo', 'description: dsa', 423, 'dsaf', 15, 40)
producto.addProduct('titulo2', 'description: otra', 200, 'thumbnail', 14, 20,)
console.log(producto.getProducts());
// para buscar un id:
producto.getProductById(3);
producto.getProductById(2);

