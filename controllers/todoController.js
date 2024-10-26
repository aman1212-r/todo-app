const todoModel = require('../models/todoModel');

async function getTodos(req, res) {
  const todos = await todoModel.getTodos(req.user.userId);
  res.json(todos);
}

async function createTodo (req, res) {
  const { title, description } = req.body;
  const todo = await todoModel.createTodo(
    req.user.userId,
    title,
    description
  );
  res.status(201).json(todo);
}

async function updateTodo (req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = await todoModel.updateTodo(
    id,
    title,
    description
  );
  res.json(todo);
}

async function deleteTodo (req, res) {
  const { id } = req.params;
  await todoModel.deleteTodo(id);
  res.status(204).end();
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
