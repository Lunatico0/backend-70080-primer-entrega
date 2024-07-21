import { promises as fs } from "fs";

class CartManager {

  static lastId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  };

  async addCart({ id, products }) {
    const { prodId, quantity } = products;
    try {

      const arrayCarts = await this.readFile();

      const newCart = {
        id,
        products: products || [{
          prodId,
          quantity: quantity ? quantity : 1
        }]
      };

      if (arrayCarts.length > 0) {
        CartManager.lastId = arrayCarts.reduce((maxId, cart) => Math.max(maxId, cart.id), 0);
      }

      newCart.id = ++CartManager.lastId;
      arrayCarts.push(newCart);
      this.saveFile(arrayCarts);

    } catch (error) {

      console.log(error);
      throw error;

    }
  }

  async readFile() {
    const res = await fs.readFile(this.path, "utf-8");
    const arrayCart = JSON.parse(res);
    return arrayCart;
  }

  async saveFile(arrayCart) {
    await fs.writeFile(this.path, JSON.stringify(arrayCart, null, 2));
  }

};

export default CartManager;