import {withStyles} from '@material-ui/core/styles'
import React from 'react'
import {List, Datagrid, TextField, DateField, CardActions, CreateButton} from 'react-admin'

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

const Actions = ({basePath}) => (
  <CardActions>
    <CreateButton basePath={basePath}/>
  </CardActions>
)

export default withStyles(styles)(({classes, ...props}) => {
  return (
    <List {...props}
          exporter={false}
          actions={<Actions/>}
          bulkActionButtons={false}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="auth" />
        <DateField source="createdAt" locales='ko'/>
        <DateField source="updatedAt" locales='ko'/>
      </Datagrid>
    </List>
  )
})
