import { Request, Response } from "express";
import { Todo } from "../model/todo";

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTodo = await Todo.create({
      title,
    });
    res.status(200).json({ message: "new Todo added", todos: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getAllTodo = async (req: Request, res: Response) => {
  const todos = await Todo.find();
  try {
    res.status(200).json({ message: "All Todos", todos: todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findById(todoId);
    res.status(200).json({ message: "Requested Todo", todos: todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title });
    res.status(200).json({ message: "Todo has been updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting todo" });
  }
};
