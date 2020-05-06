import Header from './Header/Header';
import { List } from './List/List';
import { Footer } from './Footer/Footer';
import React from 'react';
import styles from './style.module.css';
import { TaskType } from '../../App';

type PropsType = {
  tasks: Array<TaskType>
}

export const Todolist = (props: PropsType) => {
  return <div className={styles.todolist}>
    <Header />
    <List tasks={props.tasks} />
    <Footer />
  </div>
}
