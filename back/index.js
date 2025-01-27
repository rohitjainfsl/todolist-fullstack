import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DATABASE
await mongoose.connect("mongodb://localhost:27017/todolistfullstack");

//SCHEMA
const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

//MODEL
const Todo = mongoose.model("Todo", todoSchema);

//API
app.post("/api/todos/add", async (req, res) => {
  const { id, title, completed } = req.body;
  const newTodo = new Todo({
    id,
    title,
    completed,
  });
  await newTodo.save();
  res.status(201).send({ message: "Todo Saved" });
});

app.get("/api/todos/get", async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

app.delete("/api/todos/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findOneAndDelete({ id });
  res.send({ message: "Todo Deleted" });
});

app.put("/api/todos/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  await Todo.findOneAndUpdate({ id }, { title });
  res.send({ message: "Todo Updated" });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
