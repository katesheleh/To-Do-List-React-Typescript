import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

export default {
	title: 'Task',
	component: Task,
};

const removeTask = action('Remove Task');

const changeStatus = action('Status changed inside Task');

const changeTitle = action('change Title inside Task')

export const TaskBaseExample = () => {
	return (
			<div>
				<Task
						todolistId={'todolistId1'}
						removeTask={removeTask}
						changeStatus={changeStatus}
						changeTitle={changeTitle}
						task={{id: '1', title: 'Learn ReactJS', isDone: false}}/>

				<Task
						todolistId={'todolistId2'}
						removeTask={removeTask}
						changeStatus={changeStatus}
						changeTitle={changeTitle}
						task={{id: '2', title: 'Learn JS', isDone: true}}/>
			</div>
	)
};

