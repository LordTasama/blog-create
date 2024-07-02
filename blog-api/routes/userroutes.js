import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  userId,
} from "../controllers/userController.js";
import { login, auth, createUser } from "../controllers/loginController.js";
import { upload } from "../controllers/userController.js";
const router = express.Router();

// Rutas CRUD para usuarios
router.post("/", upload.single("foto_perfil"), createUser);
router.get("/", auth, getUsers);
router.get("/search/:id", auth, getUserById);
router.put("/update/:id", auth, upload.single("foto_perfil"), updateUser);
router.delete("/delete/:id", auth, deleteUser);
router.post("/login", login);
router.get("/userId", userId);

export default router;
