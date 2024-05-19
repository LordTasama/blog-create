import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    identificacion: {
      type: DataTypes.BIGINT,
      autoIncrement: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    foto_perfil: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Usuario",
    timestamps: false,
  }
);
