import bcrypt from "bcrypt";
import { Usuario } from "../models/user.js";
import jwt from "jsonwebtoken";

// Función para manejar el login de un usuario

export const login = async (req, res) => {
  try {
    // Buscamos el usuario en la base de datos por correo electrónico
    const usuario = await Usuario.findOne({
      where: { correo: req.body.correo },
    });
    if (usuario) {
      // Verificamos la contraseña del usuario
      const validation = await bcrypt.compare(
        req.body.password,
        usuario.dataValues.password
      );
      if (!validation) {
        // Si la contraseña es incorrecta, devolvemos un mensaje de error con código 401 (Unauthorized)
        res.status(401).json({ message: "Contraseña incorrecta" });
        return;
      }
      // Generamos un token de autenticación para el usuario
      const token = jwt.sign({ userId: usuario.id }, "blog-tasama-2671333", {
        expiresIn: "12h",
      });
      // Devolvemos el token y un mensaje de éxito con código 200 (OK)
      res.status(200).json({ message: "Datos validados", token });
    } else {
      // Si no se encuentra el usuario, devolvemos un mensaje de error con código 404 (Not Found)
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    // Si ocurre un error, devolvemos un mensaje de error con código 400 (Bad Request)
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

// Función para autenticar un usuario mediante un token
export const auth = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    // Si no se proporciona un token, devolvemos un mensaje de error con código 401 (Unauthorized)
    return res.status(401).json({ message: "Token vacío" });
  }
  try {
    // Verificamos el token de autenticación
    next();
  } catch (error) {
    // Si el token es inválido, devolvemos un mensaje de error con código 401 (Unauthorized)
    return res.status(401).json({ message: "Token no válido", error });
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    // Crear un nuevo usuario utilizando los datos del cuerpo de la solicitud
    if (req.file) {
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
      // Si no se subió un archivo, asignar un valor predeterminado para la foto de perfil
      req.body.foto_perfil = "default.jpg";
    }
    // Verificar si hay campos vacíos en la solicitud
    if (
      req.body.nombres == "" ||
      req.body.apellidos == "" ||
      req.body.correo == "" ||
      req.body.password == ""
    ) {
      // Si hay campos vacíos, devolver un error 422 (Unprocessable Entity)
      res.status(422).send({
        response: "Verifica si hay campos vacíos",
        estado: "anulado",
      });
      return;
    }
    // Encriptar la contraseña del usuario
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    // Asignar un rol predeterminado al usuario
    req.body.rol_id = 2;
    // Crear el usuario en la base de datos
    const nuevoUsuario = await Usuario.create(req.body);
    // Devolver el nuevo usuario creado con el código de estado 201 (Created)
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    // Manejar errores
    if (req.file) {
      // Borrar el archivo subido si ocurre un error
      borrarArchivo(req.file.filename, "perfil_photo");
    }
    // Devolver un mensaje de error con el código de estado 400 (Bad Request) o 500 (Internal Server Error)
    if (error.name === "SequelizeValidationError") {
      // Si es un error de validación de Sequelize
      const validationErrors = error.errors.map((error) => error.message);
      res.status(400).json({ message: validationErrors });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      // Si es un error de constraint unique de Sequelize
      res.status(400).json({
        message: ["El correo proporcionado ya existe en la base de datos"],
      });
    } else {
      // Otro tipo de error
      res.status(500).json({ message: [error.message] });
    }
  }
};
