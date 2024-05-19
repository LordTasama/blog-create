import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Rutas CRUD para comentarios
router.post("/", createComment);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.delete("/:id", deleteComment);

export default router;
