import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: true },
    { id: 4, title: "Rest API", isDone: false },
    { id: 5, title: "graphQL", isDone: false }
  ]);

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  };

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForToDoList = tasks;

  if (filter === "active") {
    tasksForToDoList = tasks.filter(task => task.isDone === false)
  }
  if (filter === "completed") {
    tasksForToDoList = tasks.filter(task => task.isDone === true)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  return (
    <div className="App">
      <Todolist
        title="ReactJS"
        tasks={tasksForToDoList}
        removeTask={removeTask}
        changeFilter={changeFilter} />
    </div>
  );
}

export default App;
