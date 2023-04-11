import fs from 'fs';

export default class productsManagerFile {
    constructor (path) {
        this.path = path;
    }

    async createProduct (product) {
        try {
            const productsFile = await this.getAllProducts();
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllProducts () {
        try {
            if(fs.existsSync(this.path)){
                const productsFile = await fs.promises.readFile(path, 'utf8');
                return JSON.parse(productsFile);
            }
        } catch (error) {
            
        }
    }
}