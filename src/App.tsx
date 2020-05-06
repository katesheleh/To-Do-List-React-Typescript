import styles from './App.module.css';
import { Todolist } from './components/Todolist/Todolist';
import React from 'react';
import { v1 } from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {
  const tasks: Array<TaskType> = [
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: true },
    { id: v1(), title: 'Test', isDone: false }
  ]
  return (
    <div className={styles.App}>
      <Todolist tasks={tasks} />
      <Todolist tasks={tasks} />
      <Todolist tasks={tasks} />
    </div>
  );
}

export default App;
