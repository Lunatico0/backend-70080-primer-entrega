import express from "express";
import multer from "multer";
import productsRouter from "./routes/products.routes.js"; // Importamos el router de productos
import cartRouter from "./routes/products.routes.js"; // Importamos el router de usuarios
const app = express();
const PUERTO = 8080;


app.use(express.json()); // Middleware para recibir datos en formato JSON
app.use(express.static("./src/public")); // Middleware para servir archivos estaticos
app.use("/api/cart", cartRouter); // Middleware para manejar las rutas de usuarios
app.use("/api/products", productsRouter); // Middleware para manejar las rutas de productos
app.use("/static", express.static("./src/public")); // Middleware para servir archivos estaticos con un alias
app.use(express.json()); // Middleware para recibir datos en formato JSON

app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto http://localhost:${PUERTO}`)
});