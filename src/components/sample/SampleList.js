import {withStyles} from '@material-ui/core/styles'
import React from 'react'
import {List, Datagrid, TextField} from 'react-admin'

const styles = theme => ({
	title: {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	},
	hiddenOnSmallScreens: {
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	}
})

export default withStyles(styles)(({classes, ...props}) => {
	return (
		<List {...props}
		      exporter={false}
		      bulkActionButtons={false}>
			<Datagrid rowClick="show">
				<TextField source='id'/>
				<TextField source="name"/>
			</Datagrid>
		</List>
	)
})
