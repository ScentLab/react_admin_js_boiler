import React from 'react'
import get from 'lodash/get'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Modal from '@material-ui/core/Modal'

const styles = theme => ({
  list: {
    display: 'flex',
    listStyleType: 'none',
    paddingLeft: 0
  },
  image: {
    margin: '0.5rem',
    maxHeight: '10rem',
    cursor: 'pointer'
  },
  modal: {
    position: 'absolute',
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    maxHeight: '90%',
    transform: `translate(-50%, -50%)`,
    outline: 'none'
  }
})

const sanitizeRestProps = ({
                             addLabel,
                             allowEmpty,
                             basePath,
                             cellClassName,
                             className,
                             formClassName,
                             headerClassName,
                             label,
                             linkType,
                             locale,
                             record,
                             resource,
                             sortable,
                             sortBy,
                             source,
                             textAlign,
                             translateChoice,
                             ...rest
                           }) => rest

class ImageClickField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectedSrc: null}
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)

  }

  handleClick(src) {
    this.setState({selectedSrc: src})
  }

  handleClose() {
    this.setState({selectedSrc: null});
  }

  render() {
    const {
      className,
      classes = {},
      record,
      source,
      src,
      title,
      ...rest
    } = this.props
    const sourceValue = get(record, source)
    if (!sourceValue) {
      return <div className={className} {...sanitizeRestProps(rest)} />;
    }

    const modal = (this.state.selectedSrc &&
      <Modal
        open={this.state.selectedSrc !== null}
        onClose={this.handleClose}>
        <img className={classes.modal} alt='' src={this.state.selectedSrc}/>
      </Modal>
    )

    if (Array.isArray(sourceValue)) {
      return (
        <div>
          {modal}
          <ul
            className={classnames(classes.list, className)}
            {...sanitizeRestProps(rest)}
          >
            {sourceValue.map((file, index) => {
              const titleValue = get(file, title) || title
              const srcValue = get(file, src) || title

              return (
                <li key={index}>
                  <img
                    onClick={() => this.handleClick(srcValue)}
                    alt={titleValue}
                    title={titleValue}
                    src={srcValue}
                    className={classes.image}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )
    }

    const titleValue = get(record, title) || title

    return (
      <div className={className} {...sanitizeRestProps(rest)}>
        {modal}
        <img
          onClick={() => this.handleClick(sourceValue)}
          title={titleValue}
          alt={titleValue}
          src={sourceValue}
          className={classes.image}
        />
      </div>
    )
  }
}

ImageClickField.defaultProps = {
  addLabel: true,
}

export default withStyles(styles)(ImageClickField)
