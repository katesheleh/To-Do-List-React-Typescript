import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";


type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}

const Todolist = (props: PropsType) => {

  let [title, setTitle] = useState("");

  const addTask = () => {
    props.addTask(title)
    setTitle("");
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask()
    }
  }

  const onAllClickHandler = () => { props.changeFilter("all") }
  const onActiveClickHandler = () => { props.changeFilter("active") }
  const onCompletedClickHandler = () => { props.changeFilter("completed") }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {
          props.tasks.map((task) => {
            const onClickTandler = () => props.removeTask(task.id)
            return <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onClickTandler}>Delete Task</button>
            </li>
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler} >All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;