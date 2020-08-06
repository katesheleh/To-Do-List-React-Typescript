import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: InitialStateType

beforeEach(() => {
	startState = {
		status: 'idle',
		error: 'some error'
	}
})

test('App status should be changed', () => {

	const endState = appReducer(startState, setAppStatusAC('loading'))

	expect(endState.status).toBe('loading')
})


test('Error msg should be correct', () => {

	const endState = appReducer(startState, setAppErrorAC('ERROR msg'))

	expect(endState.error).toBe('ERROR msg')
})
