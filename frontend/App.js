import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = async (id, completed) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    setTodos(todos.map(t => t.id === id ? { ...t, completed } : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Todo App</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Add todo..." />
      <button onClick={addTodo} disabled={!text}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ margin: '1rem 0' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id, !todo.completed)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginLeft: 8 }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
