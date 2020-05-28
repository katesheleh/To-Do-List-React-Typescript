import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: string
  removeTask: (taskId: string, todoListId: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void
}

const Todolist = (props: PropsType) => {

  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    let preparedTitle = title.trim();

    if (preparedTitle) {
      props.addTask(preparedTitle, props.id)
    } else {
      setError('Ttitle is required!');
    }
    setTitle("");
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask()
    }
  }

  const onAllClickHandler = () => { props.changeFilter("all", props.id) }
  const onActiveClickHandler = () => { props.changeFilter("active", props.id) }
  const onCompletedClickHandler = () => { props.changeFilter("completed", props.id) }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''} />

        <button onClick={addTask}>Add Task</button>

        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map((task) => {

            const onClickTandler = () => props.removeTask(task.id, props.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(task.id, e.currentTarget.checked, props.id)
            }

            return <li
              className={task.isDone === true ? 'is-done' : ''}
              key={task.id}>

              <input
                onChange={onChangeHandler}
                type="checkbox"
                checked={task.isDone} />

              <span>{task.title}</span>
              <button onClick={onClickTandler}>Delete Task</button>
            </li>
          })
        }
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler} >All</button>

        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>Active</button>

        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;