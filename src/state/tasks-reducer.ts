import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK',
	todolistId: string
	taskId: string
}

export type AddTaskActionType = {
	type: 'ADD-TASK',
	task: TaskType
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS',
	todolistId: string
	taskId: string
	status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE',
	todolistId: string
	taskId: string
	title: string
}

export type SetTasksActionType = {
	type: 'SET-TASKS'
	tasks: Array<TaskType>
	todoListId: string
}

enum ResultCodeStatus {
	'success' = 0,
	'error' = 1
}

type ActionsType = RemoveTaskActionType
		| AddTaskActionType
		| ChangeTaskStatusActionType
		| ChangeTaskTitleActionType
		| AddTodolistActionType
		| RemoveTodolistActionType
		| SetTodolistActionType
		| SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = {...state}
			const tasks = stateCopy[action.todolistId];
			const newTasks = tasks.filter(t => t.id != action.taskId);
			stateCopy[action.todolistId] = newTasks;
			return stateCopy;
		}
		case 'ADD-TASK': {
			debugger
			const stateCopy = {...state}
			const newTask = action.task

			const tasks = stateCopy[newTask.todoListId];
			const newTasks = [newTask, ...tasks];
			stateCopy[newTask.todoListId] = newTasks;
			return stateCopy;
		}
		case 'CHANGE-TASK-STATUS': {
			let todolistTasks = state[action.todolistId];
			let newTasksArray = todolistTasks
					.map(t => t.id === action.taskId ? {...t, status: action.status} : t);

			state[action.todolistId] = newTasksArray;
			return ({...state});
		}
		case 'CHANGE-TASK-TITLE': {
			let todolistTasks = state[action.todolistId];
			// найдём нужную таску:
			let newTasksArray = todolistTasks
					.map(t => t.id === action.taskId ? {...t, title: action.title} : t);

			state[action.todolistId] = newTasksArray;
			return ({...state});
		}
		case 'ADD-TODOLIST': {
			return {
				...state,
				[action.todolist.id]: []
			}
		}
		case 'REMOVE-TODOLIST': {
			const copyState = {...state};
			delete copyState[action.id];
			return copyState;
		}
		case 'SET-TODOLISTS': {
			const copyState = {...state}
			action.todolists.forEach((tl) => {
				copyState[tl.id] = []
			})
			return copyState
		}
		case 'SET-TASKS': {
			const copyState = {...state}
			copyState[action.todoListId] = action.tasks
			return copyState
		}
		default:
			return state;
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
	return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
	return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTasksActionType => {
	return {type: 'SET-TASKS', tasks, todoListId}
}

// thunk
export const fetchTasksTC = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.getTasks(todolistId).then((res) => {
			let tasks = res.data.items
			dispatch(setTasksAC(tasks, todolistId))
		})
	}
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) =>
		(dispatch: Dispatch, getState: () => AppRootStateType) => {

			let tasks = getState().tasks

			let task = tasks[todolistId].find((t) => {
				return t.id === taskId
			})

			if (task) {
				let updatedTask = {...task, status: status}
				todolistsAPI.updateTask(todolistId, taskId, updatedTask)
						.then((res) => {
							if (res.data.resultCode === ResultCodeStatus.success) {
								dispatch(changeTaskStatusAC(taskId, status, todolistId))
							}
						})
				dispatch(changeTaskStatusAC(taskId, status, todolistId));
			}
		}


export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	todolistsAPI.deleteTask(todolistId, id)
			.then(res => {
				dispatch(removeTaskAC(id, todolistId))
			})
}

export const addTaskTC = (todolistId: string, taskTitile: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	todolistsAPI.createTask(todolistId, taskTitile)
			.then((res) => {
				dispatch(addTaskAC(res.data.data.item))
			}).catch(error => {
		console.log(error.response)
	})
}


export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) =>
		(dispatch: Dispatch, getState: () => AppRootStateType) => {

			let tasks = getState().tasks

			let task = tasks[todolistId].find((t) => {
				return t.id === taskId
			})

			if (task) {
				let updatedTask = {...task, title: title}
				todolistsAPI.updateTask(todolistId, taskId, updatedTask)
						.then((res) => {
							if (res.data.resultCode === ResultCodeStatus.success) {
								dispatch(changeTaskTitleAC(taskId, title, todolistId))
							}
						})
				dispatch(changeTaskTitleAC(taskId, title, todolistId));
			}
		}

