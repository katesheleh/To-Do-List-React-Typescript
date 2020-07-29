import React, {useEffect, useState} from 'react'
import {todoApi} from './api/todolists-api';

export default {
	title: 'API'
}


export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todoApi.getTodolists()
				.then((res) => {
					setState(res.data);
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const newTitle = 'new Title'
		todoApi.createTodo(newTitle)
				.then((res) => {
					setState(res.data)
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistid = 'd32fac16-3ffd-4363-bf7f-01fd5bf6c922'
		todoApi.deleteTodo(todolistid)
				.then((res) => {
					setState(res.data)
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const newTitle = 'PUT test'
		const todolistid = '302ae786-8a02-4f22-8d87-ed1d0a6ca62b'
		todoApi.updateTodo(todolistid, newTitle)
				.then((res) => {
					setState(res.data)
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todolistId = '7871409e-405d-4a80-bb2b-6cadd404b49a'
		todoApi.getTasks(todolistId)
				.then((res) => {
					setState(res.data)
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '7871409e-405d-4a80-bb2b-6cadd404b49a'
		const newTitle = 'What to dooooooo?'
		todoApi.createTask(todolistId, newTitle)
				.then((res) => {
					setState(res.data)
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistid = '7871409e-405d-4a80-bb2b-6cadd404b49a'
		const taskId = 'ee94637c-68e8-4b9b-93bc-409587fc3b05'
		todoApi.deleteTask(todolistid, taskId)
				.then((res) => {
					setState(res.data)
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}


export const UpdateTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const newTitle = 'NEW TASK TITLEEEEEEEEEEEEEEEE'
		const taskId = 'd22f5602-6fce-4a17-8d44-233ea4754087'
		const todolistid = '7871409e-405d-4a80-bb2b-6cadd404b49a'
		todoApi.updateTask(todolistid, taskId, newTitle)
				.then((res) => {
					setState(res.data)
				})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}
