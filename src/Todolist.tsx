import React, { ChangeEvent } from "react";
import { FilterValuesType, todoListType } from './App';
import { AddItemForm } from "./AddItemForm";


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: string;
  removeTask: ( taskId: string, todoListId: string ) => void;
  changeFilter: ( value: FilterValuesType, todoListId: string ) => void;
  addTask: ( title: string, todoListId: string ) => void;
  changeStatus: ( id: string, isDone: boolean, todoListId: string ) => void;
  todoLists: Array<todoListType>;
  removeTodoList: ( id: string ) => void;
};

const Todolist = ( props: PropsType ) => {

  const onAllClickHandler = () => { props.changeFilter( "all", props.id ); };
  const onActiveClickHandler = () => { props.changeFilter( "active", props.id ); };
  const onCompletedClickHandler = () => { props.changeFilter( "completed", props.id ); };

  function removeTodoList() {
    props.removeTodoList( props.id );
  }

  const addTask = ( title: string ) => {
    props.addTask( title, props.id );
  };

  return (
    <div>

      <h3>{ props.title }
        <button onClick={ removeTodoList }> X </button>
      </h3>

      <AddItemForm addItem={ addTask } />

      <ul>
        {
          props.tasks.map( ( task ) => {

            const onClickTandler = () => props.removeTask( task.id, props.id );
            const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
              props.changeStatus( task.id, e.currentTarget.checked, props.id );
            };

            return <li
              className={ task.isDone === true ? 'is-done' : '' }
              key={ task.id }>

              <input
                onChange={ onChangeHandler }
                type="checkbox"
                checked={ task.isDone } />

              <span>{ task.title }</span>
              <button onClick={ onClickTandler }>Delete Task</button>
            </li>;
          } )
        }
      </ul>
      <div>
        <button
          className={ props.filter === 'all' ? 'active-filter' : '' }
          onClick={ onAllClickHandler } >All</button>

        <button
          className={ props.filter === 'active' ? 'active-filter' : '' }
          onClick={ onActiveClickHandler }>Active</button>

        <button
          className={ props.filter === 'completed' ? 'active-filter' : '' }
          onClick={ onCompletedClickHandler }>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;