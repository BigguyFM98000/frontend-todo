import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/api/todos', { text })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));

    setText('');
  };

  const updateTodo = (id, updatedText, completed) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { text: updatedText, completed })
      .then(response => {
        const updatedTodos = todos.map(todo => (todo._id === id ? response.data : todo));
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1>MERN Todo App</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => updateTodo(todo._id, prompt('Update todo', todo.text), todo.completed)}>
              Update
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
