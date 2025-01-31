import express from "express";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodo,
} from "../controllers/todo.js";

const todoRouter = express.Router();

todoRouter.post("/add", addTodo);

todoRouter.get("/get", fetchTodo);

todoRouter.delete("/delete/:id", deleteTodo);

todoRouter.put("/edit/:id", editTodo);

export default todoRouter;
