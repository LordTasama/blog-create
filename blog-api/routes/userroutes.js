import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { upload } from "../controllers/userController.js";
const router = express.Router();

// Rutas CRUD para usuarios
router.post("/", upload.single("foto_perfil"), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
