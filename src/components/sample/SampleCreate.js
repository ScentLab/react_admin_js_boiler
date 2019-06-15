import React from 'react'
import {Create, SimpleForm, TextInput, NumberInput} from 'react-admin'
import {required} from '../../validators'
import CreateActions from '../../custom/common/CreateActions'
import CreateToolbar from '../../custom/common/CreateToolbar'

export default (props) => (
	<Create {...props} actions={<CreateActions/>}>
		<SimpleForm toolbar={<CreateToolbar/>}>
			<TextInput source="name" validate={required}/>
			<NumberInput source="order" validate={required}/>
		</SimpleForm>
	</Create>
)
