const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;


// Load API key if exists in environment variables
console.log('Loaded API_KEY from secret:', API_KEY);


app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: 'Sample Todo', completed: false }
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = todos.find(t => t.id == id);
  if (todo) {
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id != id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Todo backend running on port ${PORT}`);
});

// Get Secret API Key
app.get('/api/secret', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});