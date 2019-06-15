import React from 'react'
import {DisabledInput, Edit, SimpleForm, TextInput, NumberInput,} from 'react-admin'
import {required} from '../../validators'
import EditActions from '../../custom/common/EditActions'
import EditToolbar from '../../custom/common/EditToolbar'

export default (props) => (
	<Edit {...props} actions={<EditActions/>}>
		<SimpleForm toolbar={<EditToolbar/>}>
			<DisabledInput source='id'/>
			<TextInput source="name" validate={required}/>
			<NumberInput source="order" validate={required}/>
		</SimpleForm>
	</Edit>
)
