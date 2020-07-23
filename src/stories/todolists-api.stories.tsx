import React, {useEffect, useState} from 'react'
import {todoApi} from '../api/todolist-api';


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
