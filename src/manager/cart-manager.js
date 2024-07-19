import { promises as fs } from "fs";

class Cartmanager {
  static lastId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  };

  async addProduct(title, description, price, img, code, stock) {

    if (!title || !description || !price || !img || !code || !stock) {
      console.error("Todos os campos son obligatorios");
      return;
    };

    if (this.products.some(item => item.code === code)) {
      console.error("El codigo deve ser unico!");
      return;
    };

    const newProduct = {
      id: ++Cartmanager.lastId,
      title,
      description,
      price,
      img,
      code,
      stock
    };

    this.products.push(newProduct);

    await this.saveFile(this.products);
  };

  async getProducts() {
    const newArray = await this.readFile();
    return newArray;
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


export default Cartmanager;