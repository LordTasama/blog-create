// Importar los modelos de 'Comentario' y 'Usuario'
import { Comentario } from "../models/comment.js";

// Controlador para crear un nuevo comentario
export const createComment = async (req, res) => {
  try {
    // Crear un nuevo comentario utilizando los datos del cuerpo de la solicitud
    const nuevoComentario = await Comentario.create(req.body);
    // Devolver el nuevo comentario creado con el código de estado 201 (Creado)
    res.status(201).json(nuevoComentario);
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 400 (Solicitud incorrecta)
    res.status(400).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
      res.status(404).json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: error.message });
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
      res.status(200).json({ message: "Comentario eliminado correctamente" });
    } else {
      // Si no se encuentra el comentario, devolver un mensaje de comentario no encontrado con el código de estado 404 (No encontrado)
      res.status(404).json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: error.message });
  }
};
