import React from 'react'
import {connect} from 'react-redux'
import {Layout, Sidebar} from 'react-admin'

import Menu from './Menu'
import AppBar from './AppBar'

const CustomSidebar = props => <Sidebar size={200} closedSize={150} {...props} />
const CustomLayout = props => <Layout appBar={AppBar} sidebar={CustomSidebar} {...props} menu={Menu} />

const theme = {
  palette: {
    secondary: {
      light: '#5f5fc4',
      main: '#283593',
      dark: '#001064',
      contrastText: '#fff',
    },
  },
}

export default connect((state) => ({theme}), {})(CustomLayout)
