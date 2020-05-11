import React from 'react';
import './App.css';
import Todolist from './Todolist';

const task1 = [
  { id: 1, title: 'CSS', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'ReactJS', isDone: true },
  { id: 4, title: 'Test', isDone: false }
]

const task2 = [
  { id: 1, title: 'Typescript', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'ReactJS', isDone: true }
]

function App() {
  return (
    <div className="App">
      <Todolist title='ReactJS' tasks={task1} />
      <Todolist title='JavaScript' tasks={task2} />
    </div>
  );
}

export default App;
