import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './EditablesSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './Todolist';

type TaskPropsType = {
	removeTask: (taskId: string, todoListId: string) => void
	changeStatus: (id: string, isDone: boolean, todoListId: string) => void
	changeTitle: (taskId: string, title: string, todolistId: string) => void
	task: TaskType
	todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
	const onClickTandler = () => props.removeTask(props.task.id, props.todolistId)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
	const onChangeTaskTitle = (title: string) => props.changeTitle(props.task.id, title, props.todolistId)


	return <div
			className={props.task.isDone === true ? 'is-done' : ''}
			key={props.task.id}>

		<Checkbox
				onChange={onChangeHandler}
				color={'primary'}
				checked={props.task.isDone}/>

		<EditableSpan value={props.task.title} onChange={onChangeTaskTitle}/>

		{/* Remove task */}
		<IconButton onClick={onClickTandler}>
			<Delete/>
		</IconButton>
	</div>
})


