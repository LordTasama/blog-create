import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

export const Comentario = sequelize.define(
  "Comentario",
  {
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Comentario",
    timestamps: false,
  }
);
