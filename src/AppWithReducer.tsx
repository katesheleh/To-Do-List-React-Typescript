import React, {useReducer} from 'react'
import './App.css'
import Todolist from './Todolist'
import {v1} from 'uuid'
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

import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from './state/todolist-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer'

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReducer() {
	let todoListId1 = v1()
	let todoListId2 = v1()

	let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
		{id: todoListId1, title: 'What to learn', filter: 'all'},
		{id: todoListId2, title: 'What to buy', filter: 'completed'}
	])

	let [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {
		[todoListId1]: [
			{id: v1(), title: 'CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: true},
			{id: v1(), title: 'Rest API', isDone: false},
			{id: v1(), title: 'graphQL', isDone: false}
		],
		[todoListId2]: [
			{id: v1(), title: 'CSS2', isDone: true},
			{id: v1(), title: 'JS1', isDone: true},
			{id: v1(), title: 'ReactJS1', isDone: false}
		],
	})

	function removeTask(id: string, todoListId: string) {
		const action = removeTaskAC(id, todoListId)
		dispatchToTasks(action)
	}


	function addTask(title: string, todoListId: string) {
		const action = addTaskAC(title, todoListId)
		dispatchToTasks(action)
	}

	function changeStatus(id: string, isDone: boolean, todoListId: string) {
		const action = changeTaskStatusAC(id, isDone, todoListId)
		dispatchToTasks(action)
	}

	function changeTitle(taskId: string, title: string, todolistId: string) {
		const action = changeTaskTitleAC(taskId, title, todolistId)
		dispatchToTasks(action)

	}

	function removeTodoList(todoListId: string) {
		const action = removeTodolistAC(todoListId)
		dispatchToTodoLists(action)
	};

	function changeTodoListTitle(id: string, title: string) {
		const action = changeTodolistTitleAC(id, title);
		dispatchToTodoLists(action)
	}

	function changeFilter(value: FilterValuesType, todoListId: string) {
		const action = changeTodolistFilterAC(value, todoListId)
		dispatchToTodoLists(action)
	}

	function addTodoList(title: string) {
		const action = addTodolistAC(title)
		dispatchToTodoLists(action)
		dispatchToTasks(action)
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
							let tasksForToDoList = tasksObj[tl.id];

							if (tl.filter === 'active') {
								tasksForToDoList = tasksForToDoList.filter(task => task.isDone === false);
							}
							if (tl.filter === 'completed') {
								tasksForToDoList = tasksForToDoList.filter(task => task.isDone === true);
							}

							return (
									<Grid item>
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

export default AppWithReducer
