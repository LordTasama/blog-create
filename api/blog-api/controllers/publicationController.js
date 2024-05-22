import { TIME } from "sequelize";
// Importar el modelo de 'Publicacion' y 'Usuario'
import { Publicacion } from "../models/publication.js";

// Controlador para crear una nueva publicación
export const createPublication = async (req, res) => {
  try {
    // Crear una nueva publicación utilizando los datos del cuerpo de la solicitud
    const fechaHoraActual = new Date();

    // Convertir la fecha y hora actual a la zona horaria de Colombia (America/Bogota)
    const opciones = { timeZone: "America/Bogota", hour12: false };
    const fechaHoraColombia = fechaHoraActual.toLocaleString("en-CA", opciones);
    req.body.fecha_creacion = fechaHoraColombia;
    const nuevaPublicacion = await Publicacion.create(req.body);
    // Devolver la nueva publicación creada con el código de estado 201 (Creado)
    res.status(201).json(nuevaPublicacion);
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

// Controlador para obtener todas las publicaciones
export const getPublications = async (req, res) => {
  try {
    // Obtener todas las publicaciones de la base de datos
    const publicaciones = await Publicacion.findAll();
    // Devolver la lista de publicaciones con el código de estado 200 (OK)
    res.status(200).json(publicaciones);
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};

// Controlador para obtener una publicación por su ID
export const getPublicationById = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar una publicación por su ID en la base de datos
    const publicacion = await Publicacion.findByPk(id);
    // Si se encuentra la publicación, devolverla con el código de estado 200 (OK)
    if (publicacion) {
      res.status(200).json(publicacion);
    } else {
      // Si no se encuentra la publicación, devolver un mensaje de publicación no encontrada con el código de estado 404 (No encontrado)
      res.status(404).json({ message: ["Publicación no encontrada"] });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};

// Controlador para actualizar una publicación por su ID
export const updatePublication = async (req, res) => {
  const { id } = req.params;
  try {
    // Actualizar la publicación con los datos proporcionados en el cuerpo de la solicitud
    const publicacion = await Publicacion.findByPk(id);
    if (publicacion) {
      await Publicacion.update(req.body, {
        where: { id: id },
      });
      // Si se actualiza al menos una publicación, devolver un mensaje de éxito con el código de estado 200 (OK)

      res
        .status(200)
        .json({ message: ["Publicación actualizada correctamente"] });
    } else {
      // Si no se encuentra la publicación, devolver un mensaje de publicación no encontrada con el código de estado 404 (No encontrado)
      res.status(404).json({ message: ["Publicación no encontrada"] });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};

// Controlador para eliminar una publicación por su ID
export const deletePublication = async (req, res) => {
  const { id } = req.params;
  try {
    // Eliminar la publicación con el ID especificado
    const eliminado = await Publicacion.destroy({
      where: { id },
    });
    // Si se elimina al menos una publicación, devolver un mensaje de éxito con el código de estado 200 (OK)
    if (eliminado) {
      res
        .status(200)
        .json({ message: ["Publicación eliminada correctamente"] });
    } else {
      // Si no se encuentra la publicación, devolver un mensaje de publicación no encontrada con el código de estado 404 (No encontrado)
      res.status(404).json({ message: ["Publicación no encontrada"] });
    }
  } catch (error) {
    // Si ocurre un error, devolver un mensaje de error con el código de estado 500 (Error interno del servidor)
    res.status(500).json({ message: [error.message] });
  }
};
