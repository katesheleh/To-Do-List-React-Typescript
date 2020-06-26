import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {RemoveTodolistActionType} from './todolist-reducer';

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	taskId: string
	todolistId: string
}

export type AddTaskActionType = {
	type: 'ADD-TASK'
	title: string
	todolistId: string
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	isDone: boolean
	todolistId: string
	taskId: string
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	todolistId: string
	taskId: string
	title: string
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}


export type ActionType = RemoveTaskActionType
		| AddTaskActionType | ChangeTaskStatusActionType
		| ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
	let copyState
	switch (action.type) {
		case 'REMOVE-TASK':
			copyState = {...state}
			copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.taskId)
			return copyState

		case 'ADD-TASK':
			copyState = {...state}
			let newTask = {id: v1(), title: action.title, isDone: false}
			copyState[action.todolistId] = [newTask, ...copyState[action.todolistId]]
			return copyState

		case 'CHANGE-TASK-STATUS': {
			// copyState[action.todolistId] = copyState[action.todolistId].map(t => {
			// 	if(t.id !== action.taskId) {	return t 	} else {	return {...t, isDone: action.isDone}	}
			// })
			copyState = {...state}
			let tasks = state[ action.todolistId ];
			let task = tasks.find( task => task.id === action.taskId );
			if ( task ) {
				task.isDone = action.isDone;
			}
			return copyState;
		}

		case 'CHANGE-TASK-TITLE': {
			// copyState[action.todolistId] = copyState[action.todolistId].map(t => {
			// 	if(t.id !== action.taskId) {return t	} else {	return {...t, title: action.title}	}
			// })
			copyState = {...state}
			let tasks = state[ action.todolistId ];
			let task = tasks.find( task => task.id === action.taskId );
			if ( task ) {
				task.title = action.title;
			}
			return copyState;
		}

		case 'ADD-TODOLIST':
				copyState = {...state}
				copyState[action.todolistId] = []
				return copyState

		case 'REMOVE-TODOLIST':
			copyState = {...state}
			delete copyState[action.id]
			return copyState

		default:
			throw new Error('I don\'t uwnderstand this type')
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId};
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return {type: 'ADD-TASK', title: title, todolistId: todolistId};
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}



