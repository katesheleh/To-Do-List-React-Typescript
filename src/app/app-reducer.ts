export type InitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status: 'idle' | 'loading' | 'succeeded' | 'failed',
	// если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
	error: string | null
}

const initialState: InitialStateType = {
	status: 'idle',
	error: 'some error'
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		case 'APP/SET-ERROR':
			return {...state, error: action.error}
		default:
			return {...state}
	}
}


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)


export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>


type ActionsType = setAppErrorACType | setAppStatusACType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'