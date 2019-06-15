import React from 'react'
import {CardActions} from 'ra-ui-materialui'
import {
	CreateButton,
} from 'react-admin'
import CustomImportButton from "./CustomImportButton"

export default (({basePath}) => {
	return (
		<CardActions>
			<CustomImportButton basePath={basePath} />
			<CreateButton basePath={basePath}/>
		</CardActions>
	)
})
