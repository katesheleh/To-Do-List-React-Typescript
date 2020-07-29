import axios from 'axios'


const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': '37106453-1aca-4e6f-89bb-a08749b89b18'
	}
})


type TodoType = {
	id: string
	addedDate: string
	order: number
	title: string
}


type ResponseType<T = {}> = {
	resultCode: number
	messages: Array<string>,
	data: T
}


export type TaskType = {
	description: string
	title: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

export type UpdateTaskType = {
	title: string
	description: string
	status: number
	priority: number
	startDate: string
	deadline: string
}

export const todoApi = {
	getTodolists() {
		return instance.get<Array<TodoType>>('todo-lists')
	},
	createTodo(title: string) {
		return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title})
	},
	deleteTodo(todolistid: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistid}`)
	},
	updateTodo(todolistid: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistid}`, {title})
	},
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
	},
	createTask(todolistId: string, title: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
	},
	deleteTask(todolistid: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistid}/tasks/${taskId}`)
	},
	updateTask(todolistid: string, taskId: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistid}/tasks/${taskId}`, {title})
	},
}