import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_GET_PERMISSIONS
} from 'react-admin'
import {dataProvider} from '../App'

export default async (type, params) => {
  switch(type) {
    case AUTH_LOGIN:
      const {data: {accessToken, refreshToken}} = await dataProvider('LOGIN', 'auth', {data: params})
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      return Promise.resolve()
    case AUTH_LOGOUT:
      localStorage.removeItem('accessToken')
      return Promise.resolve()
    case AUTH_ERROR:
      const {status} = params
      return status === 401 || status === 403 ? Promise.reject() : Promise.resolve()
    case AUTH_CHECK:
      return Promise.resolve()
    case AUTH_GET_PERMISSIONS:
      return localStorage.getItem('accessToken')
        ? Promise.resolve()
        : Promise.reject()
    default:
      return Promise.reject('Unknown method')
  }
}
