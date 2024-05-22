import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    identificacion: {
      type: DataTypes.BIGINT,
      autoIncrement: false,
      primaryKey: true,
      validate: {
        isNumeric: {
          msg: "La identificación proporcionada no es válida",
        },
      },
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
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El correo proporcionado no es válido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "El rol proporcionado no es válido",
        },
      },
    },
  },
  {
    tableName: "Usuario",
    timestamps: false,
  }
);

export const Rol = sequelize.define(
  "Rol",
  {
    id: {
      type: DataTypes.INTEGER(1),
      autoIncrement: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "Rol",
    timestamps: false,
  }
);
Usuario.belongsTo(Rol, { foreignKey: "rol_id" });
Rol.hasMany(Usuario, { foreignKey: "rol_id" });
