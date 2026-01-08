import type { Todo } from "../types/todo";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_MODE === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

// export const fetchTodos = async (): Promise<Todo[]> => {
//   const response = await fetch(`${API_URL}/todos`);
//   const data = await response.json();
//   return data.todos;
// };

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<{ todos: Todo[] }>(`${API_URL}/todos`);
  return data.todos;
};

// export const createTodo = async (title: string) => {
//   await fetch(`${API_URL}/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title }),
//   });
// };

export const createTodo = async (title: string) => {
  await axios.post(`${API_URL}/create`, { title });
};

// export const updateTodo = async (id: string, title: string) => {
//   await fetch(`${API_URL}/todos/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title }),
//   });
// };
export const updateTodo = async (id: string, title: string) => {
  await axios.put(`${API_URL}/todos/${id}`, { title });
};

// export const deleteTodo = async (id: string) => {
//   await fetch(`${API_URL}/todos/${id}`, {
//     method: "DELETE",
//   });
// };

export const deleteTodo = async (id: string) => {
  await axios.delete(`${API_URL}/todos/${id}`);
};
