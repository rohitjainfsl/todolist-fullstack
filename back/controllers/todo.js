import { Todo } from "../models/todoModel.js";
import mongoose from "mongoose";

export async function addTodo(req, res) {
  const { id, title, completed } = req.body;
  const newTodo = new Todo({
    id,
    title,
    completed,
  });
  await newTodo.save();
  res.status(201).send({ message: "Todo Saved" });
}

export async function fetchTodo(req, res) {
  const todos = await Todo.find();
  res.send(todos);
}

export async function deleteTodo(req, res) {
  const id = req.params.id;
  await Todo.findOneAndDelete({ id });
  res.send({ message: "Todo Deleted" });
}

export async function editTodo(req, res) {
  const id = req.params.id;
  const { title } = req.body;
  await Todo.findOneAndUpdate({ id }, { title });
  res.send({ message: "Todo Updated" });
}
