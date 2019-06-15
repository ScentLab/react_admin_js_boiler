import {
  DELETE,
} from 'react-admin'

export function request(apiUrl, type, params) {
  let url = apiUrl + '/admin/auth'
  let options = {}

  switch (type) {
    case 'LOGIN':
      url += ''
      options.method = 'POST'
      options.data = {name: params.data.username, password: params.data.password}
      break
    case 'REFRESH':
      url += '/refresh'
      options.method = 'POST'
      options.data = params.data
      break
    case DELETE:
      options.method = 'DELETE'
      break
    default:
      break
  }
  return {url, ...options}
}

export function response(res, type, params) {
  let ret = {}
  const {data} = res

  switch (type) {
    default:
      if (data) ret = {data}
      break
  }
  return ret
}
