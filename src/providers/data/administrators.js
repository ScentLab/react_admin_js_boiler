import {
  CREATE,
  GET_ONE,
  GET_LIST,
  DELETE
} from 'react-admin'

export function request(apiUrl, type, params) {
  let url = apiUrl + '/admins'
  let options = {}
  switch (type) {
    case CREATE:
      options.method = 'POST'
      options.data = params.data
      break
    case GET_ONE:
      url += `/${params.id}`
      break
    case GET_LIST:
      const {page, perPage} = params.pagination
      options.params = {
        ...params.filter,
        start: (page - 1) * perPage,
        perPage: perPage,
      }
      break
    case DELETE:
      url += `/${params.id}`
      options.method = 'DELETE'
      break
    default:
      break
  }
  return {url, ...options}
}

export function response(res, type, params) {
  let ret = {}
  const {data, status} = res
  switch (type) {
    case GET_LIST:
      if (data) ret = {data, total: data.length}
      break
    case GET_ONE:
      ret = {data}
      break
    case DELETE:
      if(status === 204) ret = {data: {id: 0}}
      break
    default:
      if (data) ret = {data}
      break
  }
  return ret
}
