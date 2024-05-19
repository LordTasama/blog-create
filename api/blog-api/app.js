import express from "express";
import userRoute from "./routes/userroutes.js";
import publicationRoute from "./routes/publicationroutes.js";
import commentRoute from "./routes/commentroutes.js";
const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Rutas
app.use("/usuarios", userRoute);
app.use("/publicaciones", publicationRoute);
app.use("/comentarios", commentRoute);

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
