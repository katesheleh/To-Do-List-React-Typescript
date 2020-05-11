import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: true },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "graphQL", isDone: false }
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  };

  function addTask(title: string) {
    let task = {id: v1(), title: title, isDone: false}
    let newTasks = [task, ...tasks]
    setTasks(newTasks)
  }

  console.log(tasks)

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
        changeFilter={changeFilter}
        addTask={addTask} />
    </div>
  );
}

export default App;
