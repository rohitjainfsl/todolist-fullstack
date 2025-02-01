import express from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodo,
  markTodoComplete,
} from "../controllers/todo.js";

const todoRouter = express.Router();

todoRouter.post("/add", addTodo);

todoRouter.get("/get", fetchTodo);

todoRouter.delete("/delete/:id", deleteTodo);

todoRouter.put("/edit/:id", editTodo);

todoRouter.patch("/markComplete/:id", markTodoComplete);

export default todoRouter;
