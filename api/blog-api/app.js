import express from "express";
import userRoute from "./routes/userroutes.js";

const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Rutas de usuarios
app.use("/usuarios", userRoute);

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
