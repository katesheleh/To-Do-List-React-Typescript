import {v1} from 'uuid';
import {TaskType, todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST',
	id: string
}
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	id: string
	title: string
}
export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	id: string
	filter: FilterValuesType
}

export type SetTodolistActionType = {
	type: 'SET-TODOLISTS'
	todolists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType
		| AddTodolistActionType
		| ChangeTodolistTitleActionType
		| ChangeTodolistFilterActionType
		| SetTodolistActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id != action.id)
		}
		case 'ADD-TODOLIST': {
			let newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
			return [newTodolist, ...state]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const todolist = state.find(tl => tl.id === action.id);
			if (todolist) {
				// если нашёлся - изменим ему заголовок
				todolist.title = action.title;
			}
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const todolist = state.find(tl => tl.id === action.id);
			if (todolist) {
				// если нашёлся - изменим ему заголовок
				todolist.filter = action.filter;
			}
			return [...state]
		}
		case 'SET-TODOLISTS': {
			return action.todolists.map((tl) => {
				return {...tl, filter: 'all'}
			})
		}

		default:
			return state;
	}
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
	return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
	return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
	return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
	return {type: 'SET-TODOLISTS', todolists}
}



// thunk
export const fetchTodolistsThunk = (dispatch: Dispatch, getState: () => AppRootStateType) => {
	todolistsAPI.getTodolists()
			.then((res) => {
				dispatch(setTodolistsAC(res.data))
			})
}

export const RemoveTodolistTC = (id: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	todolistsAPI.deleteTodolist(id)
			.then(res => {
				dispatch(removeTodolistAC(id))
				console.log(res)
			})
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	todolistsAPI.createTodolist(title)
			.then(res => {
				dispatch(addTodolistAC(res.data.data.item))
				console.log(res)
			})
}


export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	todolistsAPI.updateTodolist(id, title)
			.then(res => {
				dispatch(changeTodolistTitleAC(id, title))
			})
}

