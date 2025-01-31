import mongoose from "mongoose";

//SCHEMA
const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

//MODEL
export const Todo = mongoose.model("Todo", todoSchema);
