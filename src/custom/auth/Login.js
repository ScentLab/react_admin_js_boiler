import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import compose from 'recompose/compose'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock'
import {translate, userLogin} from 'react-admin'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import {Field, propTypes, reduxForm} from 'redux-form'
import CircularProgress from '@material-ui/core/CircularProgress'

import * as validators from '../../validators'

const styles = theme => ({
  main: {},
  card: {
    width: 320,
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
})

const renderInput = ({
                       meta: {touched, error} = {},
                       input: {...inputProps},
                       ...props
                     }) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
)

const Login = ({userLogin, classes, handleSubmit, isLoading, translate}) => {
  login = auth => userLogin(auth, '/')
  return (
    <div>
      <div className={classes.avatar}>
        <Avatar className={classes.icon}>
          <LockIcon/>
        </Avatar>
      </div>
      <form onSubmit={handleSubmit(this.login)}>
        <div className={classes.form}>
          <div className={classes.input}>
            <Field
              name='userName'
              component={renderInput}
              validate={[validators.required, validators.userName]}
              label={translate('auth.userName')}
              disabled={isLoading}
            />
          </div>
          <div className={classes.input}>
            <Field
              name='password'
              component={renderInput}
              validate={[validators.required, validators.password]}
              label={translate('auth.password')}
              type='password'
              disabled={isLoading}
            />
          </div>
        </div>
        <CardActions className={classes.actions}>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            disabled={isLoading}
            className={classes.button}
            fullWidth>
            {isLoading && (
              <CircularProgress size={25} thickness={2}/>
            )}
            {translate('auth.signIn')}
          </Button>
        </CardActions>
      </form>
    </div>
  )
}

Login.propTypes = {
  ...propTypes,
  authProvider: PropTypes.func,
  classes: PropTypes.object,
  previousRoute: PropTypes.string,
  translate: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({isLoading: state.administrators.loading > 0})

const enhance = compose(
  translate,
  reduxForm({
    form: 'signIn'
  }),
  connect(
    mapStateToProps,
    {userLogin}
  ),
  withStyles(styles)
)

export default enhance(Login)
