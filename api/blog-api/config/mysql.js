// Importamos las librerias necesarias
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("blog", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });
