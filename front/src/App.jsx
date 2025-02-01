import { useEffect, useState } from "react";
import instance from "./axiosConfig";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      fetchData();
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  async function fetchData() {
    const result = await instance.get("/get");
    setTasks(result.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      const obj = {
        id: idToEdit,
        title: input,
      };
      const response = await instance.put(`/edit/${idToEdit}`, obj);
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
      const response = await instance.post("/add", obj);
      if (response.status === 201 && response.data.message === "Todo Saved") {
        fetchData();
      }
    }
    setInput("");
  }

  async function handleDelete(id) {
    const response = await instance.delete(`/delete/${id}`);
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

  async function handleComplete(id) {
    const response = await instance.patch(`/markComplete/${id}`);
    if (response.data.message === "Todo Marked") {
      fetchData();
    }
  }

  return (
    <div
      id="todolist"
      className="mx-auto my-10 w-1/2 bg-rose-300 rounded-md p-4"
    >
      <form className="my-2 flex gap-2" action="" onSubmit={handleSubmit}>
        <input
          className="w-3/4 px-2 py-3 bg-white rounded-md"
          type="text"
          placeholder="Enter your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-1/4 px-2 py-3 bg-[#3b5998] border-2 border-[#3b5998] text-white text-lg rounded-md cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#3b5998]"
          type="submit"
        >
          {isEditing ? "Edit Task" : "Add Task"}
        </button>
      </form>

      <ul className="my-4">
        {loading ? (
          <h3>Loading Saved Tasks...</h3>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              className={`py-2 px-4 mb-2 bg-rose-400 rounded-md flex justify-between ${
                task.completed === true ? `line-through opacity-50` : ``
              }`}
              key={task.id}
            >
              {task.title}
              <p className="flex">
                {!task.completed && (
                  <MdEdit
                    className="transition-all duration-300 hover:scale-[1.25] cursor-pointer"
                    onClick={() => handleEdit(task.id)}
                  />
                )}

                <MdDelete
                  className="transition-all duration-300 hover:scale-[1.25] cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                />

                {!task.completed && (
                  <FaCheck
                    className="transition-all duration-300 hover:scale-[1.25] cursor-pointer"
                    onClick={() => handleComplete(task.id)}
                  />
                )}
              </p>
            </li>
          ))
        ) : (
          <h3>No tasks</h3>
        )}
      </ul>
    </div>
  );
}

export default App;
