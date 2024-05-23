// Importar el modelo de 'Usuario'
import { Usuario } from "../models/user.js";

// Importar lo necesario para gestionar archivos

import multer from "multer";
import fs from "fs";
// import path from "path";

import borrarArchivo from "../config/globals.js";

// Subir archivo

// Configuración del multer: creación del espacio de almacenamiento en el servidor

export const storage = multer.diskStorage({
  // Destination es una variable de multer para configurar el directorio de destino de la API

  // Recuerde cerrar la ruta con el slash
  destination: (req, file, cb) => {
    if (file.fieldname === "foto_perfil") {
      cb(null, "./images/perfil_photo");
    } else {
      cb(null, "./images/publication_photo");
    }
  },

  // Configuración del nombre del archivo a guardar en el disco duro de la API
  filename: function (req, file, cb) {
    cb(null, "user" + "-" + Date.now() + "_" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    // Crear un nuevo usuario utilizando los datos del cuerpo de la solicitud
    if (req.file) {
      const condition =
        req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg";

      if (condition) {
        res.status(400).send({
          message: ["El formáto no es correcto debe ser(.png,jpg o jpeg)"],
        });
        borrarArchivo(req.file.filename, "perfil_photo");
        return;
      }

      req.body.foto_perfil = req.file.filename;
    } else {
      req.body.foto_perfil = "default.jpg";
    }

    const nuevoUsuario = await Usuario.create(req.body);
    // Devolver el nuevo usuario creado con el código de estado 201 (Creado)
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (req.file) {
      borrarArchivo(req.file.filename, "perfil_photo");
    }

    // Si ocurre un error, devolver un mensaje de error con el código de estado 400 (Solicitud incorrecta)
    if (error.name === "SequelizeValidationError") {
      // Si es un error de validación de Sequelize
      const validationErrors = error.errors.map((error) => error.message);
      res.status(400).json({ message: validationErrors });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: ["La identificación o correo ya existe en la base de datos"],
      });
    } else {
      // Otro tipo de error
      res.status(500).json({ message: [error.message] });
    }
  }
};

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.findAll();
    // Devolver la lista de usuarios con el código de estado 200 (OK)
    res.status(200).json(usuarios);
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar un usuario por su ID en la base de datos
    const usuario = await Usuario.findByPk(id);
    // Si se encuentra el usuario, devolverlo con el código de estado 200 (OK)
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      // Si no se encuentra el usuario, devolver un mensaje de usuario no encontrado con el código de estado 404 (No encontrado)
      res.status(404).json({ message: ["Usuario no encontrado"] });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};

// Controlador para actualizar un usuario por su ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Actualizar el usuario con los datos proporcionados en el cuerpo de la solicitud
    const user = await Usuario.findByPk(id);

    if (user) {
      if (req.file) {
        const nameOldFile = await Usuario.findByPk(id, {
          attributes: ["foto_perfil"],
        });
        borrarArchivo(nameOldFile.dataValues.foto_perfil, "perfil_photo");
        const condition =
          req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg";

        if (condition) {
          res.status(400).send({
            message: ["El formáto no es correcto debe ser(.png,jpg o jpeg)"],
          });
          borrarArchivo(req.file.filename, "perfil_photo");
          return;
        }
        req.body.foto_perfil = req.file.filename;
      } else {
        delete req.body.foto_perfil;
      }
      await Usuario.update(req.body, {
        where: { identificacion: id },
      });
      // Si se actualiza al menos un usuario, devolver un mensaje de éxito con el código de estado 200 (OK)
      res.status(200).json({ message: "Usuario actualizado correctamente" });
    } else {
      // Si no se encuentra el usuario, devolver un mensaje de usuario no encontrado con el código de estado 404 (No encontrado)
      res.status(404).json({ message: "Usuario no encontrado" });
      if (req.file.filename) {
        borrarArchivo(req.file.filename, "perfil_photo");
      }
    }
  } catch (error) {
    if (req.file.filename) {
      borrarArchivo(req.file.filename, "perfil_photo");
    }
    // Si ocurre un error, devolver un mensaje de error con el código de estado 400 (Solicitud incorrecta)
    if (error.name === "SequelizeValidationError") {
      // Si es un error de validación de Sequelize
      const validationErrors = error.errors.map((error) => error.message);
      res.status(400).json({ message: validationErrors });
    } else {
      // Otro tipo de error
      res.status(500).json({ message: [error.message] });
    }
  }
};

// Controlador para eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar el usuario con el ID especificado
    const eliminado = await Usuario.findByPk(id);
    // Si se elimina al menos un usuario, devolver un mensaje de éxito con el código de estado 200 (OK)
    if (eliminado) {
      borrarArchivo(eliminado.dataValues.foto_perfil, "perfil_photo");
      eliminado.destroy();
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      // Si no se encuentra el usuario, devolver un mensaje de usuario no encontrado con el código de estado 404 (No encontrado)
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 400 (Solicitud incorrecta)
    if (error.name === "SequelizeValidationError") {
      // Si es un error de validación de Sequelize
      const validationErrors = error.errors.map((error) => error.message);
      res.status(400).json({ message: validationErrors });
    } else {
      // Otro tipo de error
      res.status(500).json({ message: [error.message] });
    }
  }
};
