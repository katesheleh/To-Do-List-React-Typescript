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


type ResponseType<T> = {
	resultCode: number
	messages: Array<string>,
	data: T
}

export const todoApi = {
	getTodolists() {
		return instance.get<Array<TodoType>>('todo-lists')
	},
	createTodo(title: string) {
		return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title})
	},
	deleteTodo(todolistid: string) {
		return instance.delete<ResponseType<{}>>(`todo-lists/${todolistid}`)
	},
	updateTodo(todolistid: string, title: string) {
		return instance.put<ResponseType<{}>>(`todo-lists/${todolistid}`, {title})
	}
}