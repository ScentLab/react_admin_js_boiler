import {CardActions, ListButton, ShowButton} from 'ra-ui-materialui'
import React from 'react'

export default ({basePath, data}) => (
  <CardActions>
    <ListButton basePath={basePath}/>
    <ShowButton basePath={basePath} record={data}/>
  </CardActions>
)
