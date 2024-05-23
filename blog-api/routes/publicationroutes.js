import express from "express";
import {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";
import { upload } from "../controllers/userController.js";
const router = express.Router();

// Rutas CRUD para publicaciones
router.post("/", upload.single("imagen"), createPublication);
router.get("/", getPublications);
router.get("/:id", getPublicationById);
router.put("/:id", upload.single("imagen"), updatePublication);
router.delete("/:id", deletePublication);

export default router;
