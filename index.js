const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage
let todos = [];

// GET /todos: Retrieve all to-do items
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos: Add a new to-do item
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id: Update a to-do item
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const todo = todos.find((t) => t.id === parseInt(id));
  if (todo) {
    todo.task = task;
    res.json(todo);
  } else {
    res.status(404).send('To-Do item not found');
  }
});

// DELETE /todos/:id: Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
