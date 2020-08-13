import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {authAPI} from '../../api/todolists-api';

const initialState: InitialStateType = {
	isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return {...state, isLoggedIn: action.value}
		default:
			return state
	}
}

// actions

export const setIsLoggedInAC = (value: boolean) =>
		({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks LoginParamsType
export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.logout()
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setIsLoggedInAC(false))
					dispatch(setAppStatusAC('succeeded'))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
}


export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.login(data)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setIsLoggedInAC(true))
					dispatch(setAppStatusAC('succeeded'))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
}



// types

type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
	isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>


