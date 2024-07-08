// Importar el modelo de 'Usuario'
import { Usuario } from "../models/user.js";

// Importar la biblioteca de encriptación bcrypt
import bcrypt from "bcrypt";

// Importar la biblioteca multer para gestionar archivos
import multer from "multer";

// Importar la función borrarArchivo desde el archivo globals.js
import borrarArchivo from "../config/globals.js";

import jwt from "jsonwebtoken";
import { sequelize } from "../config/mysql.js";

// Configuración de multer para subir archivos
export const storage = multer.diskStorage({
  // Configuración del destino de los archivos (ruta donde se guardarán)
  destination: (req, file, cb) => {
    // Dependiendo del campo de formulario (fieldname), se establece la ruta de destino
    if (file.fieldname === "foto_perfil") {
      cb(null, "./public/images/perfil_photo");
    } else {
      cb(null, "./public/images/publication_photo");
    }
  },
  // Configuración del nombre del archivo a guardar en el disco duro
  filename: function (req, file, cb) {
    // Se crea un nombre de archivo único con la fecha y hora actual, y el nombre original del archivo
    cb(null, "user" + "-" + Date.now() + "_" + file.originalname);
  },
});

// Crear una instancia de multer con la configuración de storage
export const upload = multer({ storage: storage });

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.findAll();
    // Devolver la lista de usuarios con el código de estado 200 (OK)
    res.status(200).json(usuarios);
  } catch (error) {
    // Manejar errores
    // Devolver un mensaje de error con el código de estado 500 (Internal Server Error)
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
      // Si no se encuentra el usuario, devolver un mensaje de usuario no encontrado con el código de estado 404 (Not Found)
      res.status(404).json({ message: ["Usuario no encontrado"] });
    }
  } catch (error) {
    // Manejar errores
    // Devolver un mensaje de error con el código de estado 500 (Internal Server Error)
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
        // Borrar el archivo antiguo si se subió un nuevo archivo
        const nameOldFile = await Usuario.findByPk(id, {
          attributes: ["foto_perfil"],
        });
        borrarArchivo(nameOldFile.dataValues.foto_perfil, "perfil_photo");
        // Verificar si el archivo subido es una imagen válida (png o jpeg)
        const condition =
          req.file.mimetype != "image/png" && req.file.mimetype != "image/jpeg";
        if (condition) {
          // Si no es una imagen válida, devolver un error 415 (Unsupported Media Type)
          res.status(415).send({
            message: ["El formáto no es correcto debe ser(.png,jpg o jpeg)"],
          });
          // Borrar el archivo subido
          borrarArchivo(req.file.filename, "perfil_photo");
          return;
        }
        // Asignar el nombre del archivo subido al campo foto_perfil del usuario
        req.body.foto_perfil = req.file.filename;
      } else {
        // Si no se subió un archivo, eliminar el campo foto_perfil del usuario
        delete req.body.foto_perfil;
      }
      if (req.body.password == "") {
        // Si no se proporcionó una contraseña, eliminar el campo password del usuario
        delete req.body.password;
      } else {
        // Encriptar la contraseña del usuario
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
      }
      // Actualizar el usuario en la base de datos
      await Usuario.update(req.body, {
        where: { identificacion: id },
      });
      // Devolver un mensaje de éxito con el código de estado 200 (OK)
      res.status(200).json({ message: "Usuario actualizado correctamente" });
    } else {
      // Si no se encuentra el usuario, devolver un mensaje de usuario no encontrado con el código de estado 404 (Not Found)
      res.status(404).json({ message: "Usuario no encontrado" });
      if (req.file.filename) {
        // Borrar el archivo subido si no se encontró el usuario
        borrarArchivo(req.file.filename, "perfil_photo");
      }
    }
  } catch (error) {
    // Manejar errores
    if (req.file.filename) {
      // Borrar el archivo subido si ocurre un error
      borrarArchivo(req.file.filename, "perfil_photo");
    }
    // Devolver un mensaje de error con el código de estado 400 (Bad Request) o 500 (Internal Server Error)
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
      // Borrar el archivo de perfil del usuario
      borrarArchivo(eliminado.dataValues.foto_perfil, "perfil_photo");
      // Eliminar el usuario de la base de datos
      eliminado.destroy();
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      // Si no se encuentra el usuario, devolver un mensaje de usuario no encontrado con el código de estado 404 (Not Found)
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    // Manejar errores
    // Devolver un mensaje de error con el código de estado 400 (Bad Request) o 500 (Internal Server Error)
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
// Función para obtener el id de un usuario mediante un token
export const userId = async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    // Si no se proporciona un token, devolvemos un mensaje de error con código 401 (Unauthorized)
    return res.status(401).json({ message: "Token vacío" });
  }
  try {
    // Verificamos el token de autenticación
    const decoded = jwt.verify(token, "blog-tasama-2671333");
    const userId = decoded.userId;
    const usuario = await Usuario.findByPk(userId);

    delete usuario.dataValues.password;

    return res.status(200).json(usuario);
  } catch (error) {
    // Si el token es inválido, devolvemos un mensaje de error con código 401 (Unauthorized)
    return res.status(401).json({ message: "Token no válido", error });
  }
};
