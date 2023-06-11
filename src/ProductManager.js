import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';

const filePathTested = './src/public/archivo.json';

const directoryPath = './src/public';

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = readFileSync(this.path, 'utf8');
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error al leer el archivo: ${error.message}`);
    }

		/* 
		validate if json file exists
		if (existsSync(filePathTested)) {
			try {
				// Leer el contenido del archivo
				const content = readFileSync(filePathTested, 'utf8');
				console.log('Contenido del archivo:', content);
			} catch (error) {
				console.error('Error al leer el archivo:', error);
			}
		} else {
			console.log('El archivo no existe.');
		} */


		/* 
		validate files in path
		try {
			const files = readdirSync(directoryPath);
			if (files.length > 0) {
				console.log('Archivos en la carpeta public:');
				files.forEach((file) => {
					console.log(file);
				});
			} else {
				console.log('La carpeta public está vacía.');
			}
		} catch (error) {
			console.error('Error al leer la carpeta:', error);
		} */
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products);
      writeFileSync(this.path, data);
    } catch (error) {
      console.error(`Error al escribir en el archivo: ${error.message}`);
    }
  }

  addProduct(product) {
    const lastProduct = this.products[this.products.length - 1];
    const id = lastProduct ? lastProduct.id + 1 : 100001;
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProduct(id) {
    return this.products.find(product => product.id === id);
  }
	
  getProducts() {
    return this.products;
  }

	deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
			this.products[index] = { id, ...updatedProduct };
      this.saveProducts();
			return { id, ...updatedProduct };
    }
		
		return this.products.find(product => product.id === id);
  }  
}


