import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await axios.get("http://localhost:3000/api/todos/get");
    setTasks(result.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      const obj = {
        id: idToEdit,
        title: input,
      };
      const response = await axios.put(
        `http://localhost:3000/api/todos/edit/${idToEdit}`,
        obj
      );
      if (response.data.message === "Todo Updated") {
        fetchData();
        setIsEditing(false);
        setIdToEdit(null);
      }
    } else {
      const obj = {
        id: Date.now().toString(),
        title: input,
        completed: false,
      };
      const response = await axios.post(
        "http://localhost:3000/api/todos/add",
        obj
      );
      if (response.status === 201 && response.data.message === "Todo Saved") {
        fetchData();
      }
    }
    setInput("");
  }

  async function handleDelete(id) {
    const response = await axios.delete(
      `http://localhost:3000/api/todos/delete/${id}`
    );
    if (response.data.message === "Todo Deleted") {
      fetchData();
    }
  }

  async function handleEdit(id) {
    const task = tasks.find((task) => task.id === id);
    setInput(task.title);
    setIdToEdit(task.id);
    setIsEditing(true);
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">{isEditing ? "Edit Task" : "Add Task"}</button>
      </form>

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              {task.title}
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))
        ) : (
          <h3>No tasks</h3>
        )}
      </ul>
    </>
  );
}

export default App;
