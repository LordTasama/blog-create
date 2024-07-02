import express from "express";
import {
  createPublication,
  getPublications,
  getPublicationById,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";
import { upload } from "../controllers/userController.js";
import { auth } from "../controllers/loginController.js";
const router = express.Router();

// Rutas CRUD para publicaciones
router.post("/", auth, upload.single("imagen"), createPublication);
router.get("/", auth, getPublications);
router.get("/:id", auth, getPublicationById);
router.put("/:id", auth, upload.single("imagen"), updatePublication);
router.delete("/:id", auth, deletePublication);

export default router;
