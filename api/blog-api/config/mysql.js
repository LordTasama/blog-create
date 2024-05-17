// Importamos las librerias necesarias
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Inicializamos el dotenv para poder usar las variables del .env

dotenv.config({ path: "../.env" });

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });
