import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {Button, Confirm} from 'react-admin'
import {translate, crudDelete} from 'ra-core'
import ActionDelete from '@material-ui/icons/Delete'
import classnames from 'classnames'

const styles = theme => ({
  deleteButton: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
})

class CustomDeleteButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isOpen: false}
  }

  handleClick = () => {
    this.setState({isOpen: true})
  }

  handleDialogClose = () => {
    this.setState({isOpen: false})
  }

  handleConfirm = () => {
    const {dispatchCrudDelete, resource, record, basePath, redirect,} = this.props
    dispatchCrudDelete(resource, record.id, record, basePath, redirect)
    this.setState({isOpen: true})
  }

  render() {
    const {label = 'ra.action.delete', classes = {}, className, translate, resource, record} = this.props
    return (
      <Fragment>
        <Button
          onClick={this.handleClick}
          label={label}
          className={classnames('ra-delete-button', classes.deleteButton, className)}
          key="button"
        >
          <ActionDelete/>
        </Button>
        <Confirm
          isOpen={this.state.isOpen}
          confirmColor="warning"
          title={translate('ra.message.delete_title',
            {name: translate(`resources.${resource}.name`), id: record.id})}
          content={translate('ra.message.delete_content',
            {name: translate(`resources.${resource}.name`), id: record.id})}
          cancel={translate('ra.action.cancel')}
          confirm={translate('ra.action.confirm')}
          onConfirm={this.handleConfirm}
          onClose={this.handleDialogClose}
        />
      </Fragment>
    )
  }
}

export default compose(
  connect(
    null,
    {dispatchCrudDelete: crudDelete}
  ),
  translate,
  withStyles(styles)
)(CustomDeleteButton);
