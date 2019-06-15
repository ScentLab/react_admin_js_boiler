import React from 'react'
import {
  SaveButton,
  Toolbar,
} from 'react-admin'

export default (({classes, ...props}) => (
  <Toolbar {...props}>
    <SaveButton
      redirect="list"
      submitOnEnter={false}
    />
  </Toolbar>
))
