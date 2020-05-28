import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";
import { v1 } from "uuid";
import { TaskType } from './Todolist';

export type FilterValuesType = "all" | "active" | "completed";

type todoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<todoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'completed' }
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: true },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "graphQL", isDone: false }
    ],
    [todoListId2]: [
      { id: v1(), title: "CSS2", isDone: true },
      { id: v1(), title: "JS1", isDone: true },
      { id: v1(), title: "ReactJS1", isDone: false }
    ],
  });

  function removeTask(id: string, todoListId: string) {
    let todoList = tasks[todoListId]
    tasks[todoListId] = todoList.filter(task => task.id !== id)
    setTasks({...tasks})
  };

  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false }
    let todoList = tasks[todoListId]
    tasks[todoListId] = [task, ...todoList]
    setTasks({...tasks})
  }

  function changeStatus(id: string, isDone: boolean, todoListId: string) {
    let todoList = tasks[todoListId]
    let task = todoList.find(task => task.id === id)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks});
    }
  }

  console.log(tasks)

  // let [filter, setFilter] = useState<FilterValuesType>("all");

  // let tasksForToDoList = tasks;

  // if (filter === "active") {
  //   tasksForToDoList = tasks.filter(task => task.isDone === false)
  // }
  // if (filter === "completed") {
  //   tasksForToDoList = tasks.filter(task => task.isDone === true)
  // }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let task = todoLists.find((tl) => tl.id === todoListId)
    if (task) {
      task.filter = value;
    }
    setTodoLists([...todoLists])
  }

  return (
    <div className="App">
      {todoLists.map(tl => {
        let tasksForToDoList = tasks[tl.id];

        if (tl.filter === "active") {
          tasksForToDoList = tasksForToDoList.filter(task => task.isDone === false)
        }
        if (tl.filter === "completed") {
          tasksForToDoList = tasksForToDoList.filter(task => task.isDone === true)
        }

        return (
          <Todolist
            id={tl.id}
            key={tl.id}
            title={tl.title}
            tasks={tasksForToDoList}
            removeTask={removeTask}
            filter={tl.filter}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus} />
        )
      })}
    </div>
  );
}

export default App;
