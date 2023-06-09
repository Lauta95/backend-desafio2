const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    // ----------------------------------------------------------------------------------
    // CREADOR DE PRODUCTOS:
    createUser = async (title, description, price, thumbnail, code, stock) => {
        const productos = { title, description, price, thumbnail, code, stock }
        const list = await this.getProducts()
        list.push(productos)

        await fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, this.format)
            const dataObj = JSON.parse(data)
            return dataObj
        }
        // si hay un error, devolvemos el array vacío sin bloquear el código:
        catch (error) {
            console.log('el archivo no existe, se devuelve vacío');
            return[]
        }
    }
}

async function crearUsuarios() {
    const nuevoProducto = new ProductManager('archivo.json');
    await nuevoProducto.createUser('john wick', 'asesino mafioso', 10, 'thumbnail1', 1, 20)
    await nuevoProducto.createUser('Matrix', 'nueva realidad', 5, 'thumbnail2', 2, 30)
    
    console.log(await nuevoProducto.getProducts());
}

crearUsuarios();


// ----------------------------------------------------------------------------------

//     getNextId = async () => {
//         const count = this.products.length;
//         const nextId = (count > 0) ? this.products[count - 1].id + 1 : 1
//         return nextId;
//     }

//     addProduct = (title, description, price, thumbnail, code, stock) => {

//         const yaExisteCode = this.products.find((product) => product.code === code);
//         if (yaExisteCode) {
//             console.log('ERROR: se repite el campo CODE');
//             // return early
//             return;
//         }

//         const agregar = {
//             id: this.getNextId(),
//             title,
//             description,
//             price,
//             thumbnail,
//             code,
//             stock,
//         }
//         const obligatorios = !(title && description && price && thumbnail && code && stock) ? console.log('Error: todos los campos son obligatorios') : this.products.push(agregar);
//         return obligatorios;
//     }



//     // para buscar un id:
//     getProductById = (id) => {
//         const product = this.products.find((product) => product.id === id);
//         console.log((product) ? (`producto encontrado: ${JSON.stringify(product)}`) : ('no se encontró el producto con ese id'));
//     }

//     updateProduct = (id) => {

//     }

//     deleteProduct = (id) => {

//     }
// }



// producto.addProduct('titulo', 'description: dsa', 423, 'dsaf', 15, 40)
// producto.addProduct('titulo2', 'description: otra', 200, 'thumbnail', 14, 20,)
// console.log(producto.getProducts());
// // para buscar un id:
// // producto.getProductById(3);
// producto.getProductById(2);

