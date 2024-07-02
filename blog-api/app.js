import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import userRoute from "./routes/userroutes.js";
import publicationRoute from "./routes/publicationroutes.js";
import commentRoute from "./routes/commentroutes.js";
import { sequelize } from "./config/mysql.js";
import { Rol } from "./models/user.js";
const app = express();

// Middleware para parsear JSON en las solicitudes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  "/images/publication_photo",
  express.static(path.join(__dirname, "public/images/publication_photo"))
);
app.use(
  "/images/perfil_photo",
  express.static(path.join(__dirname, "public/images/perfil_photo"))
);
app.use(express.json());
app.use(cors());
// Rutas
app.use("/usuarios", userRoute);
app.use("/publicaciones", publicationRoute);
app.use("/comentarios", commentRoute);

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

(async () => {
  try {
    // Sincronizar modelos y definir relaciones
    await sequelize
      .sync({ alter: true })
      .then(() =>
        // console.log(
        //   "Modelos sincronizados y relaciones establecidas correctamente."
        // )
        console.log("Modelos sincronizados correctamente.")
      )
      .catch((err) => {
        console.log("Error al sincronizar los modelos y relaciones");
      });

    // Si ya están creados anteriormente los Roles
    let condition = await Rol.findByPk(1);
    if (!condition) {
      Rol.create({ id: 1, nombre: "Propietario" });
    }
    condition = await Rol.findByPk(2);
    if (!condition) {
      Rol.create({ id: 2, nombre: "Usuario" });
    }
    console.log("Inserción inicial en la tabla Rol completada.");
  } catch (error) {
    console.error("Error:", error);
  }
})();
