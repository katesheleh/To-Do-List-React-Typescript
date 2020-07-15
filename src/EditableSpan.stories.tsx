import React from 'react';
import {action} from '@storybook/addon-actions';
import EditableSpan from './EditablesSpan';


export default {
	title: 'EditableSpan',
	component: EditableSpan,
};

export const EditableSpanBaseExample = () => <EditableSpan value={'span value'} onChange={action('new value')}/>