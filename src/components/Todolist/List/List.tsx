import React from 'react';
import styles from './style.module.css';
import Task from './Task/Task';
import { TaskType } from '../../../App';

type PropsType = {
  tasks: Array<TaskType>
}

export function List(props: PropsType) {

  let singleTask = props.tasks.map(task => <Task key={task.id} title={task.title} isDone={task.isDone} />)

  return <div className={styles.list}>
    {singleTask}
  </div>
}
