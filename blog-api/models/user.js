import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre no puede ser nulo",
        },
        notNull: {
          msg: "El nombre no puede estar vacío",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El apellido no puede ser nulo",
        },
        notNull: {
          msg: "El apellido no puede estar vacío",
        },
      },
    },
    foto_perfil: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING(255),
      unique: {
        name: "correo_unique",
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: "El correo proporcionado no es válido",
        },

        notEmpty: {
          msg: "El correo no puede ser nulo",
        },
        notNull: {
          msg: "El correo no puede estar vacío",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La contraseña no puede ser nula",
        },
        notNull: {
          msg: "La contraseña no puede estar vacía",
        },
      },
    },
    rol_id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "El rol proporcionado no es válido",
        },

        notEmpty: {
          msg: "El rol no puede ser nulo",
        },
        notNull: {
          msg: "El rol no puede estar vacío",
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
