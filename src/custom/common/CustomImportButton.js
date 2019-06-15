import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {translate,} from 'ra-core'
import PostIcon from '@material-ui/icons/Book'
import classnames from 'classnames'
import {dataProvider} from '../../App'

const styles = theme => ({
	importButton: {
		padding: '0.2rem 1rem',
		'&:hover': {
			borderRadius: '3px',
			backgroundColor: fade(theme.palette.primary.main, 0.08),
			'@media (hover: none)': {
				backgroundColor: 'transparent',
			},
		},
	},
})

class CustomImportButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			files: []
		}
	}

	handleFileChange = async (e) => {
		e.preventDefault()
		const files = e.target.files
		await this.setState({files})
		try {
			await this.uploadFile()
		} catch (e) {
			console.log(e)
		}

	}

	uploadFile = async () => {
		try {
			const {files} = this.state
			const {basePath} = this.props

			if (files.length === 0) {
				return alert('업로드 할 파일이 없습니다.')
			}
			let formData = new FormData()
			formData.append('file', files[0])

			switch (basePath) {
				case '/campuses':
					await dataProvider('UPLOAD_Campus', 'import', formData)
					break
				case '/classes':
					await dataProvider('UPLOAD_Class', 'import', formData)
					break
				case '/faculties':
					await dataProvider('UPLOAD_Faculty', 'import', formData)
					break
				default:
					alert('정확한 요청인지 확인하십시오.')
					break
			}
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		const {classes = {},} = this.props
		return (
			<Fragment>
				<label htmlFor={'excel'}
				       className={classnames('ra-import-button', classes.importButton)}>
					<PostIcon color={'primary'} />
					<input type={'file'} id={'excel'} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					       style={{display: "none"}} onChange={this.handleFileChange}/>
				</label>
			</Fragment>
		)
	}
}

export default compose(
	connect(
		null,
	),
	translate,
	withStyles(styles)
)(CustomImportButton)
