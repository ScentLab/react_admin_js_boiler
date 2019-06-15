import React from 'react'
import {SimpleShowLayout, TextField, Show,} from 'react-admin'

export default ({translate, ...props}) => (
	<Show {...props} title="학년 상세">
		<SimpleShowLayout>
			<TextField source="id"/>
			<TextField source="name"/>
			<TextField source="order"/>
		</SimpleShowLayout>
	</Show>
)
