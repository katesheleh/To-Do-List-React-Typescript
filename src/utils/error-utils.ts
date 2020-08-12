import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {

	if(data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]))
	} else {
		dispatch(setAppErrorAC('some error'))
	}
	dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetAppErrorACType | SetAppStatusACType>) => {
	dispatch(setAppErrorAC(error.message ? error.message : 'Some Error occurred'))
	dispatch(setAppStatusAC('failed'))
}