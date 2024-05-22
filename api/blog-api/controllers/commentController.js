// Importar los modelos de 'Comentario' y 'Usuario'
import { Comentario } from "../models/comment.js";

// Controlador para crear un nuevo comentario
export const createComment = async (req, res) => {
  try {
    // Crear un nuevo comentario utilizando los datos del cuerpo de la solicitud
    const fechaHoraActual = new Date();

    // Convertir la fecha y hora actual a la zona horaria de Colombia (America/Bogota)
    const opciones = { timeZone: "America/Bogota", hour12: false };
    const fechaHoraColombia = fechaHoraActual.toLocaleString("en-CA", opciones);
    req.body.fecha_publicacion = fechaHoraColombia;
    const nuevoComentario = await Comentario.create(req.body);
    // Devolver el nuevo comentario creado con el código de estado 201 (Creado)
    res.status(201).json(nuevoComentario);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Si es un error de validación de Sequelize
      const validationErrors = error.errors.map((error) => error.message);
      res.status(400).json({ message: validationErrors });
    } else {
      // Otro tipo de error
      res.status(500).json({ message: [error] });
    }
  }
};

// Controlador para obtener todos los comentarios
export const getComments = async (req, res) => {
  try {
    // Obtener todos los comentarios de la base de datos
    const comentarios = await Comentario.findAll();
    // Devolver la lista de comentarios con el código de estado 200 (OK)
    res.status(200).json(comentarios);
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};

// Controlador para obtener un comentario por su ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar un comentario por su ID en la base de datos
    const comentario = await Comentario.findByPk(id);
    // Si se encuentra el comentario, devolverlo con el código de estado 200 (OK)
    if (comentario) {
      res.status(200).json(comentario);
    } else {
      // Si no se encuentra el comentario, devolver un mensaje de comentario no encontrado con el código de estado 404 (No encontrado)
      res.status(404).json({ message: ["Comentario no encontrado"] });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};

// Controlador para eliminar un comentario por su ID
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    // Eliminar el comentario con el ID especificado
    const eliminado = await Comentario.destroy({
      where: { id },
    });
    // Si se elimina al menos un comentario, devolver un mensaje de éxito con el código de estado 200 (OK)
    if (eliminado) {
      res.status(200).json({ message: ["Comentario eliminado correctamente"] });
    } else {
      // Si no se encuentra el comentario, devolver un mensaje de comentario no encontrado con el código de estado 404 (No encontrado)
      res.status(404).json({ message: ["Comentario no encontrado"] });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};
