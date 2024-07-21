import { Router } from "express";
import Cartmanager from "../manager/cart-manager.js";

const cartManager = new Cartmanager('./src/data/carts.json');

const router = Router();

router.post("/", async (req, res) => {

  const newCart = req.body;
  
  try {
    await cartManager.addCart(newCart);
    res.status(201).send({ message: "Carrito creado exitosamente", newCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }

});

export default router;