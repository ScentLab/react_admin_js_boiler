import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { translate, MenuItemLink, getResources } from 'react-admin'

import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

const styles = theme => ({
  root: {
    width: '100%',
    margin: 0
  },
  heading: {
    margin: 0,
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

const menus = [
  {
    title: '시스템 관리',
    items: ['administrators'],
    name: ['관리자 설정']
  },
]

const Menu = withStyles(styles)(({resources, classes, onMenuClick, logout, translate, location}) => {
  return menus.map((menu, index) => {
    const items = menu.items.map((item, index) => {
      const resource = resources.find(resource => resource.name === item)
      if (resource) {
        return <MenuItemLink
          key={index}
          to={`/${resource.name}`}
          primaryText={menu.name[index]}
          onClick={onMenuClick}
        />
      }
      return <MenuItemLink
        disabled
        key={index}
        to={`/`}
        primaryText={item + ' (개발)'}
        onClick={onMenuClick}
      />
    })
    return (
      <ExpansionPanel key={index} defaultExpanded={menu.items.find(item => location.pathname.indexOf(item) > 0)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography className={classes.heading}>{menu.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display: 'block'}}>{items}</ExpansionPanelDetails>
      </ExpansionPanel>
    )
  })
})

export default withRouter(connect((state) => ({
  resources: getResources(state),
})
)(translate(Menu)))
