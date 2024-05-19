import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

export const Publicacion = sequelize.define(
  "Publicacion",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Publicacion",
    timestamps: false,
  }
);
