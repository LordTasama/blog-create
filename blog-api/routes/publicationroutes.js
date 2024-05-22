import express from "express";
import {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";

const router = express.Router();

// Rutas CRUD para publicaciones
router.post("/", createPublication);
router.get("/", getPublications);
router.get("/:id", getPublicationById);
router.put("/:id", updatePublication);
router.delete("/:id", deletePublication);

export default router;
