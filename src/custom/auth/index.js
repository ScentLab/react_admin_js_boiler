import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card/Card'
import Login from './Login'
import {Notification} from 'react-admin'

const TabContainer = ({children, dir}) => (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
  )

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    width: 320,
    marginTop: '6em',
  }
})

const FullWidthTabs = ({classes}) => (
  <div className={classes.main}>
    <Card className={classes.card}>
      <Login {...this.props}/>
    </Card>
    <Notification/>
  </div>
)

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
}

export default withStyles(styles, {withTheme: true})(FullWidthTabs)
