import express from "express";
import productsRouter from "./routes/products.routes.js"; // Importamos el router de productos
import cartRouter from "./routes/cart.routes.js"; // Importamos el router de carritos

const app = express();
const PUERTO = 8080;

app.use(express.json()); // Middleware para recibir datos en formato JSON
app.use(express.static("./src/public")); // Middleware para servir archivos estáticos
app.use("/api/carts", cartRouter); // Middleware para manejar las rutas de carritos
app.use("/api/products", productsRouter); // Middleware para manejar las rutas de productos
app.use("/static", express.static("./src/public")); // Middleware para servir archivos estáticos con un alias

app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);
});
