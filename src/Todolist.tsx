import React, { ChangeEvent } from "react";
import { FilterValuesType, TodolistType } from './App';
import { AddItemForm } from "./AddItemForm";
import EditableSpan from "./EditablesSpan";
import { IconButton, Button, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';


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
  todoLists: Array<TodolistType>;
  removeTodoList: ( id: string ) => void;
  changeTitle: ( taskId: string, title: string, todolistId: string ) => void;
  changeTodoListTitle: ( id: string, title: string ) => void;
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

  const onChangeTodoListTitle = ( title: string ) => {
    props.changeTodoListTitle( props.id, title );
  };

  return (
    <div>

      <h3>
        <EditableSpan value={ props.title } onChange={ onChangeTodoListTitle } />
        <IconButton onClick={ removeTodoList }>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={ addTask } />

      <div>
        {
          props.tasks.map( ( task ) => {

            const onClickTandler = () => props.removeTask( task.id, props.id );
            const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
              props.changeStatus( task.id, e.currentTarget.checked, props.id );
            };
            const onChangeTaskTitle = ( title: string ) => {
              props.changeTitle( task.id, title, props.id );
            };

            return <div
              className={ task.isDone === true ? 'is-done' : '' }
              key={ task.id }>

              <Checkbox
                onChange={ onChangeHandler }
                color={ 'primary' }
                checked={ task.isDone } />

              <EditableSpan value={ task.title } onChange={ onChangeTaskTitle } />

              {/* Remove task */ }
              <IconButton onClick={ onClickTandler }>
                <Delete />
              </IconButton>
            </div>;
          } )
        }
      </div>
      <div>
        <Button
          variant={ props.filter === 'all' ? 'outlined' : 'text' }
          onClick={ onAllClickHandler }
          color={ 'default' }>All</Button>

        <Button
          variant={ props.filter === 'active' ? 'outlined' : 'text' }
          onClick={ onActiveClickHandler }
          color={ 'primary' }>Active</Button>

        <Button
          variant={ props.filter === 'completed' ? 'outlined' : 'text' }
          onClick={ onCompletedClickHandler }
          color={ 'secondary' }>Completed</Button>
      </div>
    </div>
  );
};

export default Todolist;