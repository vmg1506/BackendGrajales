
import { promises as fs } from "fs"

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    isCodeUnique = async code => {
        try {
            const products = await this.getProducts();
            return products.some((product) => product.code === code);
        } catch (error) {
            console.log(error);
        }
    }

    validateFields (product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock
        )
    }

    writeFile = async data => {
        try {
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async product => {
        try {
            if(await this.isCodeUnique(product.code)) {
                return 'this product already exist';
            }
            if(!this.validateFields(product)) {
                return 'all fields of the product must be added';
            }
            let products = await this.getProducts();
            const newProduct = {
                ...product,
                id: products.length > 0 ? products[products.length - 1].id + 1 : 1
            }
            products.push(newProduct);
            await this.writeFile(products);
            return 'Product added';
        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async() => {
        try {
            const products = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            if(error.message.includes('no such file or directory')) return [];
            console.log(error);
        }
    }

    getProductById = async id => {
        const products = await this.getProducts();
        try {
            const product = products.find(product => product.id === id);
            return product ? product : false;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductById = async id => {
        const products = await this.getProducts();
        try {
            const product = await this.getProductById(id);
            if(product) {
                const newProducts = products.filter(product => product.id !== id);
                await this.writeFile(newProducts);
                return 'Product eliminated';
            }else {
                return 'Producto not exist';
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, updatedFields) => {
        let products = await this.getProducts();
        try {
            const product = await this.getProductById(id);
            if(product) {
                const productIndex = products.findIndex((product) => product.id === id);
                products[productIndex] = {
                    ...products[productIndex],
                    ...updatedFields
                }
                await this.writeFile(products);
                return 'Product Updated';
            } else {
                return 'Product not found';
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const product1 = {
    title: 'Xbox Series s',
    description: 'Best low-price new generation console',
    price: 299,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_986729-MLA69587766137_052023-O.webp',
    code: 'xbs01',
    stock: 25
};
const product2 = {
    title: 'Playstation 5',
    description: 'Best console of the market',
    price: 429,
    thumbnail: 'https://hips.hearstapps.com/hmg-prod/images/ps5-sony-consola-1600378972.jpg?crop=0.75993091537133xw:1xh;center,top&resize=1200:*',
    code: 'ps501',
    stock: 5
};

const product3 = {
    title: 'Xbox Series x',
    description: 'Most powerful xbox ever',
    price: 499,
    thumbnail: 'https://assets.xboxservices.com/assets/f1/68/f1680ea5-9e4b-4381-b684-4fe2bbfd1773.jpg?n=Hogwarts-Legacy_Feature-Background-0_XSX_767x628.jpg',
    code: 'xbx01',
    stock: 5
}

const manager = new ProductManager('./products.json');

async function test () {
    console.log(await manager.addProduct(product1));
    console.log(await manager.addProduct(product2));
    console.log(await manager.addProduct(product3));
    console.log(await manager.getProducts());
    console.log(await manager.getProductById(1));
    console.log(await manager.updateProduct(2,
        {
            stock: 10,
            price: 299
        }
    ));
    console.log(await manager.updateProduct(4, 
        {
            code: 'xbx02',
            stock: 4
        }
        ));

    console.log(await manager.getProducts());
    console.log(await manager.deleteProductById(5));
    

}

test();