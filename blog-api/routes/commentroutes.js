import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
} from "../controllers/commentController.js";
import { auth } from "../controllers/loginController.js";
const router = express.Router();

// Rutas CRUD para comentarios
router.post("/", auth, createComment);
router.get("/", auth, getComments);
router.get("/:id", auth, getCommentById);
router.delete("/:id", auth, deleteComment);

export default router;
