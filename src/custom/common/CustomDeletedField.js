import React, {Fragment} from 'react'
import {TextField, DateField} from 'react-admin'
import {translate} from 'ra-core'

class CustomDeletedField extends React.Component {
  render() {
    const {record} = this.props
    const deletedAt = record.deletedAt === null ? '-' : record.deletedAt
    return (
      <Fragment>
        {record.deletedAt !== null ? (<DateField source="deletedAt" locales="ko"/>) :
          (<TextField source={deletedAt}/>)}
      </Fragment>
    )
  }
}

export default translate(CustomDeletedField)
