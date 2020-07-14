import React, {useCallback} from 'react';
import {FilterValuesType, TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditablesSpan';
import {IconButton, Button} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';


export type TaskType = {
	id: string
	title: string
	isDone: boolean
};
type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	filter: string
	removeTask: (taskId: string, todoListId: string) => void
	changeFilter: (value: FilterValuesType, todoListId: string) => void
	addTask: (title: string, todoListId: string) => void
	changeStatus: (id: string, isDone: boolean, todoListId: string) => void
	todoLists: Array<TodolistType>
	removeTodoList: (id: string) => void
	changeTitle: (taskId: string, title: string, todolistId: string) => void
	changeTodoListTitle: (id: string, title: string) => void
};

export const Todolist = React.memo((props: PropsType) => {
	console.log('Todolist is called')

	const onAllClickHandler = useCallback(() => {
		props.changeFilter('all', props.id);
	}, [props])


	const onActiveClickHandler = useCallback(() => {
		props.changeFilter('active', props.id);
	}, [props])


	const onCompletedClickHandler = useCallback(() => {
		props.changeFilter('completed', props.id);
	}, [props])


	const removeTodoList = useCallback(() => {
		props.removeTodoList(props.id)
	}, [props])


	const addTask = useCallback((title: string) => {
		props.addTask(title, props.id)
	}, [props])


	const onChangeTodoListTitle = useCallback((title: string) => {
		props.changeTodoListTitle(props.id, title)
	}, [props])

	let tasksForToDoList = props.tasks

	if (props.filter === 'active') {
		tasksForToDoList = props.tasks.filter(task => task.isDone === false)
	}
	if (props.filter === 'completed') {
		tasksForToDoList = props.tasks.filter(task => task.isDone === true)
	}

	return (
			<div>
				<h3>
					<EditableSpan value={props.title} onChange={onChangeTodoListTitle}/>
					<IconButton onClick={removeTodoList}>
						<Delete/>
					</IconButton>
				</h3>

				<AddItemForm addItem={addTask}/>

				<div>
					{
						tasksForToDoList.map((task) => {
							return <Task changeStatus={props.changeStatus}
													 changeTitle={props.changeTitle}
													 removeTask={props.removeTask}
													 todolistId={props.id}
													 task={task}
													 key={task.id}/>
						})
					}
				</div>
				<div>
					<Button
							variant={props.filter === 'all' ? 'outlined' : 'text'}
							onClick={onAllClickHandler}
							color={'default'}>All</Button>

					<Button
							variant={props.filter === 'active' ? 'outlined' : 'text'}
							onClick={onActiveClickHandler}
							color={'primary'}>Active</Button>

					<Button
							variant={props.filter === 'completed' ? 'outlined' : 'text'}
							onClick={onCompletedClickHandler}
							color={'secondary'}>Completed</Button>
				</div>
			</div>
	)
})

export default Todolist;