import { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../services/todo";
import type { Todo } from "../types/todo";
import type { FormEvent } from "react";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };
    getTodos();
  }, [refresh]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    try {
      if (editMode) {
        await updateTodo(editId, message);
      } else {
        await createTodo(message);
      }
      setMessage("");
      makeRefresh();
    } catch (error) {
      console.error("Error Fail to create new todo", error);
    }
  };

  const handleModeChange = async (id: string, title: string) => {
    setEditMode(true);
    setMessage(title);
    setEditId(id);
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      makeRefresh();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.title}{" "}
            <button type="button" onClick={() => handleDeleteTodo(todo._id)}>
              ❌
            </button>
            <button
              type="button"
              onClick={() => handleModeChange(todo._id, todo.title)}
            >
              edit
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>{editMode ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default TodoList;
