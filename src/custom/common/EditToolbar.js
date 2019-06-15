import {withStyles} from '@material-ui/core'
import CustomDeleteButton from './CustomDeleteButton'
import React from 'react'
import {
  SaveButton,
  Toolbar,
} from 'react-admin'

const styles = {
  defaultToolbar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default withStyles(styles)(({classes, redirect, ...props}) => {
  return (
  <Toolbar {...props} className={classes.defaultToolbar}>
    <SaveButton
      submitOnEnter={false}
    />
    <CustomDeleteButton {...props}
                        submitOnEnter={false}
                        variant="dense"/>
  </Toolbar>
)})
