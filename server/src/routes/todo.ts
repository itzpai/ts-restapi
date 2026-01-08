import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
  updateTodo,
} from "../controllers/todo";

const router = Router();

router.post("/create", createTodo);
router.get("/todos", getAllTodo);
router.get("/todos/:todoId", getTodo);
router.put("/todos/:todoId", updateTodo);
router.delete("/todos/:todoId", deleteTodo);

export default router;
