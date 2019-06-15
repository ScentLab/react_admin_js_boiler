import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import get from 'lodash/get'
import classnames from 'classnames'

const styles = () => ({
	deleteDateField: {
		marginTop: '16px',
		marginBottom: '8px',
		margin: 0,
		border: 0,
		padding: 0,
		display: 'inline-flex',
		position: 'relative',
		minWidth: 0,
		flexDirection: 'column',
		'& .positioner': {
			position: 'relative',
		},
		'& .labelTransform': {
			transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
			transform: 'translate(0, 1.5px) scale(0.75)',
			transformOrigin: 'top left'
		},
		'& .labelFont': {
			color: 'rgba(0, 0, 0, 0.54)',
			padding: 0,
			fontSize: '1rem',
			fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
			lineHeight: 1,
		},
		'& .labelValue': {
			margin: 0,
			padding: '8px 0 4px',
			display: 'block',
			boxSizing: 'content-box',
			background: 'none',
			verticalAlign: 'middle',
			'& > span': {
				margin: 0,
				display: 'block',
				color: 'rgba(0, 0, 0, 0.87)',
				fontSize: '0.875rem',
				fontWeight: 400,
				fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
				lineHeight: '1.46429em',
			}
		},
	},
})

const dateReform = (date) => {
	const thisMonth = date.getMonth() + 1
	const thisDay = date.getDate()
	const thisYear = date.getFullYear()

	return [thisYear, thisMonth, thisDay].join('. ').concat('.')
}

class CustomDateField extends React.Component {
	render() {
		const {className, classes = {}, source, label, translate, record} = this.props
		const rawDate = dateReform(new Date(get(record, source)))
		const dateData = rawDate.indexOf(NaN) > -1 ? '-' : rawDate
		return (
			<Fragment>
				<div className={classnames('ra-field', classes.deleteDateField, className)}>
					<label className="positioner labelFont labelTransform" data-shrink="true">
						<span>{translate(label)}</span>
					</label>
					<div className="labelValue">
						<span body1="body1">{dateData}</span>
					</div>
				</div>
			</Fragment>)
	}
}

export default withStyles(styles)(CustomDateField)
