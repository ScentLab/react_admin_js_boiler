import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {Button, Confirm} from 'react-admin'
import {translate, crudUpdate, crudGetOne} from 'ra-core'
import classnames from 'classnames'

const styles = theme => ({
	secessionButton: {
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

class CustomSecessionButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {newData: {deletedAt: new Date()}, isOpen: false, isAlive: true}
	}

	componentDidMount() {
		if(this.props.record.deletedAt !== null)
			this.setState({isAlive: false})
	}

	handleConfirm = () => {
		const {dispatchCrudUpdate, dispatchCrudGetOne, resource, record, basePath, redirect} = this.props
		dispatchCrudUpdate(resource, record.id, this.state.newData, record, basePath, redirect)
		dispatchCrudGetOne(resource, record.id, record, basePath, redirect)
		this.setState({isOpen: false, isAlive: false})
	}

	render() {
		const {label = 'ra.action.secession', classes = {}, className, translate, resource, record} = this.props
		return (
			<Fragment>
				{this.state.isAlive &&
				< Button
					onClick={() => this.setState({isOpen: true})}
					label={label}
					className={classnames('ra-delete-button', classes.secessionButton, className)}
					key="button">
				</Button>
				}
				<Confirm
					isOpen={this.state.isOpen}
					confirmColor="warning"
					title={translate('ra.message.secession_title',
						{name: translate(`resources.${resource}.name`), nickname: record.nickname})}
					content={translate('ra.message.secession_content',
						{name: translate(`resources.${resource}.name`), nickname: record.nickname})}
					cancel={translate('ra.action.cancel')}
					confirm={translate('ra.action.confirm')}
					onConfirm={this.handleConfirm}
					onClose={() => this.setState({isOpen: false})}/>
			</Fragment>
		)
	}
}

export default compose(
	connect(
		null,
		{dispatchCrudUpdate: crudUpdate, dispatchCrudGetOne: crudGetOne},
	),
	translate,
	withStyles(styles)
)(CustomSecessionButton)
