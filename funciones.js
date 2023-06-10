const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const productos = { title, description, price, thumbnail, code, stock }
        const list = await this.getProducts();

        let idMasGrande = 0;
        for (const productos of list) {
            if (productos.id > idMasGrande) {
                idMasGrande = productos.id
            }
        }
        const nuevaId = idMasGrande + 1;
        productos.id = nuevaId;

        list.push(productos);

        await fs.promises.writeFile(this.path, JSON.stringify(list));
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, this.format)
            const dataObj = JSON.parse(data)
            return dataObj
        }
        catch (error) {
            console.log('el archivo no existe, se devuelve vacío');
            return []
        }
    }

    getProductById = async (id) => {
        const buscar = await this.getProducts();
        const buscarObj = buscar.find(item => item.id === id);
        console.log((buscarObj) ? (`producto encontrado ${JSON.stringify(buscarObj)}`) : ('ERROR: no existe ese id'));
        return buscarObj;
    }

    updateProduct = async (id, viejoValor, nuevoValor) => {
        const listUpdate = await this.getProducts();

        const itemParaActualizar = listUpdate.find((producto) => producto.id === id);

        if (!itemParaActualizar) {
            console.log('no se encuentra ese id');
            return;
        }

        itemParaActualizar[viejoValor] = nuevoValor;

        await fs.promises.writeFile(this.path, JSON.stringify(listUpdate));

        console.log('archivo actualizado:', itemParaActualizar);
    }

    deleteProduct = async (id) => {
        const listDelete = await this.getProducts();

        const newList = listDelete.filter((producto) => producto.id !== id);

        if(newList.length === listDelete.length){
            console.log('Error: no existe ese id');
            return;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(newList));

        console.log(`el producto de id ${id} fue eliminado`);
    }
}

async function crearUsuarios() {
    const nuevoProducto = new ProductManager('archivo.json');
    // Checkear prime la devolución de un array vacío:
    console.log(await nuevoProducto.getProducts());
    // Agregar producto nuevo:
    await nuevoProducto.addProduct('producto prueba', 'este es un producto de prueba', 200, 'sin imagen', 'abc123', 25)
    // Buscar un producto por su id:
    await nuevoProducto.getProductById(8);
    // Para modificar un producto existente
    await nuevoProducto.updateProduct(10, 'title', 'probando el metodo updateProduct');
    // Para borrar un id Existente:
    await nuevoProducto.deleteProduct(2);    
}

crearUsuarios();


