import React from 'react'
import {AppBar, UserMenu, translate} from 'react-admin'

const CustomUserMenu = translate(({translate, ...props}) => (
  <UserMenu {...props}/>
))

const CustomAppBar = props => (
  <AppBar {...props} userMenu={<CustomUserMenu/>}/>
)

export default CustomAppBar
