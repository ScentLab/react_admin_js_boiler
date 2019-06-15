import React from 'react'
import {
  SimpleShowLayout,
  TextField,
  Show,
  translate,
  DateField,
  CardActions,
} from 'react-admin'
import CustomDeleteButton from '../../custom/common/CustomDeleteButton'


const ShowActions = (props) => {
  const {data = {}} = props
  return (
    <CardActions>
      {data.id && <CustomDeleteButton {...props}
                                      record={data}
                                      submitOnEnter={false}
                                      variant="dense"
      />}
    </CardActions>
  )
}

class AdministratorsShow extends React.Component {
  render() {
    const {...props} = this.props
    return (
      <Show actions={<ShowActions />} {...props} title="관리자 상세">
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="auth" />
            <DateField source="createdAt" locales='ko'/>
            <DateField source="updatedAt" locales='ko'/>
        </SimpleShowLayout>
      </Show>
    )
  }
}

export default translate(AdministratorsShow)
