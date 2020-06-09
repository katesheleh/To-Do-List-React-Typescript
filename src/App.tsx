import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";
import { v1 } from "uuid";
import { TaskType } from './Todolist';
import { AddItemForm } from "./AddItemForm";
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from "@material-ui/core";
import { Menu } from '@material-ui/icons';

export type FilterValuesType = "all" | "active" | "completed";

export type todoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [ key: string ]: Array<TaskType>;
};

function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [ todoLists, setTodoLists ] = useState<Array<todoListType>>( [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'completed' }
  ] );

  let [ tasksObj, setTasks ] = useState<TasksStateType>( {
    [ todoListId1 ]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: true },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "graphQL", isDone: false }
    ],
    [ todoListId2 ]: [
      { id: v1(), title: "CSS2", isDone: true },
      { id: v1(), title: "JS1", isDone: true },
      { id: v1(), title: "ReactJS1", isDone: false }
    ],
  } );

  function removeTask( id: string, todoListId: string ) {
    let todoList = tasksObj[ todoListId ];
    tasksObj[ todoListId ] = todoList.filter( task => task.id !== id );
    setTasks( { ...tasksObj } );
  };

  function removeTodoList( todoListId: string ) {
    let filteredTodoList = todoLists;
    filteredTodoList = todoLists.filter( todoList => todoList.id !== todoListId );
    setTodoLists( filteredTodoList );
    delete tasksObj[ todoListId ];
    setTasks( { ...tasksObj } );
  };

  function changeTodoListTitle( id: string, title: string ) {
    const todoList = todoLists.find( tl => tl.id === id );
    if ( todoList ) {
      todoList.title = title;
      setTodoLists( [ ...todoLists ] );
    }
  }

  function addTask( title: string, todoListId: string ) {
    let task = { id: v1(), title: title, isDone: false };
    let todoList = tasksObj[ todoListId ];
    tasksObj[ todoListId ] = [ task, ...todoList ];
    setTasks( { ...tasksObj } );
  }

  function changeStatus( id: string, isDone: boolean, todoListId: string ) {
    let todoTasks = tasksObj[ todoListId ];
    let task = todoTasks.find( task => task.id === id );
    if ( task ) {
      task.isDone = isDone;
      setTasks( { ...tasksObj } );
    }
  }

  function changeTitle( taskId: string, title: string, todolistId: string ) {
    let task = tasksObj[ todolistId ].find( t => t.id === taskId );
    if ( task ) {
      task.title = title;
      setTasks( { ...tasksObj } );
    }

  }

  console.log( tasksObj );

  function changeFilter( value: FilterValuesType, todoListId: string ) {
    let task = todoLists.find( ( tl ) => tl.id === todoListId );
    if ( task ) {
      task.filter = value;
    }
    setTodoLists( [ ...todoLists ] );
  }

  function addTodoList( title: string ) {
    let newTodoList: todoListType = { id: v1(), title: title, filter: 'all' };
    setTodoLists( [ newTodoList, ...todoLists ] );
    setTasks( {
      ...tasksObj,
      [ newTodoList.id ]: []
    } );
  }

  return (
    <div className="App">
      {/* Header */ }
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {/* end Header */ }
      <Container fixed>
        <Grid container style={ { padding: '20px' } }>
          <AddItemForm addItem={ addTodoList } />
        </Grid>
        <Grid container spacing={ 3 }>
          { todoLists.map( tl => {
            let tasksForToDoList = tasksObj[ tl.id ];

            if ( tl.filter === "active" ) {
              tasksForToDoList = tasksForToDoList.filter( task => task.isDone === false );
            }
            if ( tl.filter === "completed" ) {
              tasksForToDoList = tasksForToDoList.filter( task => task.isDone === true );
            }

            return (
              <Grid item>
                <Paper style={ { padding: '10px' } }>
                  <Todolist
                    id={ tl.id }
                    key={ tl.id }
                    title={ tl.title }
                    tasks={ tasksForToDoList }
                    removeTask={ removeTask }
                    filter={ tl.filter }
                    changeFilter={ changeFilter }
                    addTask={ addTask }
                    changeStatus={ changeStatus }
                    removeTodoList={ removeTodoList }
                    todoLists={ todoLists }
                    changeTitle={ changeTitle }
                    changeTodoListTitle={ changeTodoListTitle } />
                </Paper>
              </Grid>
            );
          } ) }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
