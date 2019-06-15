import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import get from 'lodash/get'
import classnames from 'classnames'

const styles = theme => ({
	deleteDateField: {
		display: 'block',
	},
})

Date.prototype.yyyymmdd = function() {
	let mm = this.getMonth() + 1; // getMonth() is zero-based
	let dd = this.getDate();

	return [this.getFullYear(),
		(mm>9 ? '' : '') + mm,
		(dd>9 ? '' : '') + dd
	].join('. ').concat('.');
};

class CustomDeletedDateField extends React.Component {

	render() {
		const {className, classes = {}, source, label, translate, record} = this.props

		let dateData = new Date(get(record, source) || source).yyyymmdd()

		if(dateData === null)
			dateData = "-"

		return (
			<Fragment>
				<div className={classnames('ra-field', classes.deleteDateField, className)}>
					<div className="MuiFormControl-root-229 MuiFormControl-marginNormal-230">
						<label className="MuiFormLabel-root-238 MuiInputLabel-root-233 MuiInputLabel-formControl-234 MuiInputLabel-animated-237 MuiInputLabel-shrink-236 Labeled-label-227"
						       data-shrink="true">
							<span>{translate(label)}</span>
						</label>
						<div className="Labeled-value-228">
							<span className="MuiTypography-root-89 MuiTypography-body1-98"
							      body1="body1">{dateData}</span>
						</div>
					</div>
				</div>
			</Fragment>)
	}
}

export default withStyles(styles)(CustomDeletedDateField)
