import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './App.css'
import Todolist from './Todolist'
import {AddItemForm} from './AddItemForm'

import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Container,
	Grid,
	Paper
} from '@material-ui/core'

import {Menu} from '@material-ui/icons'
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolist-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'
import {TasksStateType, TodolistType} from './App';
import {AppRootStateType} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {
	let todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
	let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
	let dispatch = useDispatch()

	function removeTask(id: string, todoListId: string) {
		const action = removeTaskAC(id, todoListId)
		dispatch(action)
	}


	function addTask(title: string, todoListId: string) {
		const action = addTaskAC(title, todoListId)
		dispatch(action)
	}

	function changeStatus(id: string, isDone: boolean, todoListId: string) {
		const action = changeTaskStatusAC(id, isDone, todoListId)
		dispatch(action)
	}

	function changeTitle(taskId: string, title: string, todolistId: string) {
		const action = changeTaskTitleAC(taskId, title, todolistId)
		dispatch(action)

	}

	function removeTodoList(todoListId: string) {
		const action = removeTodolistAC(todoListId)
		dispatch(action)
	};

	function changeTodoListTitle(id: string, title: string) {
		const action = changeTodolistTitleAC(id, title);
		dispatch(action)
	}

	function changeFilter(value: FilterValuesType, todoListId: string) {
		const action = changeTodolistFilterAC(value, todoListId)
		dispatch(action)
	}

	function addTodoList(title: string) {
		const action = addTodolistAC(title)
		dispatch(action)
	}

	return (
			<div className="App">
				{/* Header */}
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<Menu/>
						</IconButton>
						<Typography variant="h6">
							News
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
				{/* end Header */}
				<Container fixed>
					<Grid container style={{padding: '20px'}}>
						<AddItemForm addItem={addTodoList}/>
					</Grid>
					<Grid container spacing={3}>
						{todoLists.map(tl => {
							let tasksForToDoList = tasks[tl.id]

							if (tl.filter === 'active') {
								tasksForToDoList = tasksForToDoList.filter(task => task.isDone === false)
							}
							if (tl.filter === 'completed') {
								tasksForToDoList = tasksForToDoList.filter(task => task.isDone === true)
							}

							return (
									<Grid key={tl.id} item>
										<Paper style={{padding: '10px'}}>
											<Todolist
													id={tl.id}
													key={tl.id}
													title={tl.title}
													tasks={tasksForToDoList}
													removeTask={removeTask}
													filter={tl.filter}
													changeFilter={changeFilter}
													addTask={addTask}
													changeStatus={changeStatus}
													removeTodoList={removeTodoList}
													todoLists={todoLists}
													changeTitle={changeTitle}
													changeTodoListTitle={changeTodoListTitle}/>
										</Paper>
									</Grid>
							)
						})}
					</Grid>
				</Container>
			</div>
	)
}

export default AppWithRedux