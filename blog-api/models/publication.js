import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";
import { Usuario } from "../models/user.js";
export const Publicacion = sequelize.define(
  "Publicacion",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(2500),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "La identificación proporcionada no es válida",
        },
      },
    },
  },
  {
    tableName: "Publicacion",
    timestamps: false,
  }
);

// Publicacion.belongsTo(Usuario, { foreignKey: "usuario_id" });
// Usuario.hasMany(Publicacion, { foreignKey: "usuario_id" });
