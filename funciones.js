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
        console.log((buscarObj) ? (`producto encontrado ${JSON.stringify(buscarObj)}`) : ('no se encontró ese id'));
    }

    updateProduct = async(id, viejoValor, nuevoValor) => {
        const itemParaActualizar = await this.getProductById(id);

        if(!itemParaActualizar){
            console.log('no se encuentra ese id');
            return;
        }

        itemParaActualizar[viejoValor] = nuevoValor;

        const list = await this.getProducts();

        await fs.promises.writeFile(this.path, JSON.stringify(list));

        console.log('El producto que fue actualizado:', itemParaActualizar);
    }
}

async function crearUsuarios() {
    const nuevoProducto = new ProductManager('archivo.json');
    await nuevoProducto.addProduct('john wick', 'asesino mafioso', 10, 'thumbnail1', 4324, 20)
    await nuevoProducto.addProduct('Matrix', 'nueva realidad', 5, 'thumbnail2', 524234, 30)

    console.log(await nuevoProducto.getProducts());
    // await nuevoProducto.getProductById(1);


    await nuevoProducto.updateProduct(1, 'title', 'nueva pelicula actualizada');
}

crearUsuarios();


