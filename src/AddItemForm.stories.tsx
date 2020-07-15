import React from 'react';
import { action } from '@storybook/addon-actions';
import {AddItemForm} from './AddItemForm';

export default {
	title: 'AddItemForm',
	component: AddItemForm,
};

export const AddItemFormBaseExample = () => <AddItemForm addItem={action('AddItemForm clicked')}/>;

