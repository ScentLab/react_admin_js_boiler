import React from 'react'
import {Create, SimpleForm, TextInput, SelectInput,} from 'react-admin'
import {required} from '../../validators'
import CreateActions from '../../custom/common/CreateActions'
import CreateToolbar from '../../custom/common/CreateToolbar'

export default (props) => (
  <Create {...props} actions={<CreateActions/>}>
    <SimpleForm
      toolbar={<CreateToolbar/>}>
      <TextInput source="name" validate={required}/>
      <SelectInput source="auth" choices={[
        {id: 'master', name: 'master'},
        {id: 'admin', name: 'admin'}
      ]} validate={required}/>
      <TextInput source="password" type='password' validate={required}/>
    </SimpleForm>
  </Create>
)
