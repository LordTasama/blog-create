import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";
import { Usuario } from "../models/user.js";
import { Publicacion } from "../models/publication.js";

export const Comentario = sequelize.define(
  "Comentario",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    contenido: {
      type: DataTypes.STRING(2500),
      allowNull: false,
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "La fecha proporcionada no es válida" },
      },
    },
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: { msg: "La identificación proporcionada no es válida" },
      },
    },
    publicacion_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: { msg: "El id proporcionado no es válido" },
      },
    },
  },
  {
    tableName: "Comentario",
    timestamps: false,
  }
);
Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });
Usuario.hasMany(Comentario, { foreignKey: "usuario_id" });

Comentario.belongsTo(Publicacion, { foreignKey: "publicacion_id" });
Publicacion.hasMany(Comentario, { foreignKey: "publicacion_id" });
