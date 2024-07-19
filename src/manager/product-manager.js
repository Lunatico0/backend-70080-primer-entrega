import { promises as fs } from "fs";

class ProductManager {

  constructor(path) {
    this.products = [];
    this.path = path;
  };

  async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {

    try {
      const arrayProductos = await this.readFile();

      if (!title || !description || !price || !img || !code || !stock || !category) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      if (arrayProductos.some(item => item.code === code)) {
        console.log("El codigo debe ser unico..");
        return;
      }

      const newProduct = {
        id: ++ProductManager.lastId,
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || []
      }

      if (arrayProductos.length > 0) {
        ProductManager.lastId = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0);
      }

      newProduct.id = ++ProductManager.lastId;

      arrayProductos.push(newProduct);

      await this.saveFile(arrayProductos);

    } catch (error) {
      console.log("Error al agregar productos");
      throw error;
    }
  }

  async getProducts() {
    const newArray = await this.readFile();
    return newArray;
  };

  async updateProduct(id, data) {
    const arrayProd = await this.readFile();
    const indexProd = arrayProd.findIndex((item) => item.id === id);

    if (indexProd !== -1) {
      arrayProd[indexProd].title = data.title;
      arrayProd[indexProd].description = data.description;
      arrayProd[indexProd].price = data.price;
      arrayProd[indexProd].img = data.img;
      arrayProd[indexProd].code = data.code;
      arrayProd[indexProd].stock = data.stock;
      arrayProd[indexProd].category = data.category;
      arrayProd[indexProd].status = data.status;
      arrayProd[indexProd].thumbnails = data.thumbnails;

      await this.saveFile(arrayProd);
      return true;
    } else {
      console.error("No se encuentra el producto");
      return Promise.reject(null);
    }
  };

  async deleteProduct(id, data) {
    const arrayProd = await this.readFile();
    const indexProd = arrayProd.findIndex((item) => item.id === id);

    if (indexProd !== -1) {
      arrayProd.splice(indexProd, 1);
    } else {
      console.log("No se encuentra el producto");
    }
  };

  async getProductsById(id) {
    const arrayProd = await this.readFile();
    const found = arrayProd.find((item) => item.id === id);

    if (!found) {
      return console.error("El producto no existe");
    } else {
      return found;
    };

  };

  async readFile() {
    const res = await fs.readFile(this.path, "utf-8");
    const arrayProd = JSON.parse(res);
    return arrayProd;
  }

  async saveFile(arrayProd) {
    await fs.writeFile(this.path, JSON.stringify(arrayProd, null, 2));
  }

};

export default ProductManager;