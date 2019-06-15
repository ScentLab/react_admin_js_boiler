import axios from 'axios'

const models = {
  auth: require('./auth'),
  administrators: require('./administrators'),
}

async function refreshToken(apiUrl) {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (accessToken && refreshToken) {
      const options = models.auth.request(apiUrl, 'REFRESH', {data: {accessToken, refreshToken}})
      const {data} = await axios(options)
      return data.accessToken
    }
  }
  catch (e) {
    throw e
  }
}

export default (apiUrl) => {
  const httpClient = (options = {}) => {
    if (!options.headers) options.headers = {}
    if (localStorage.getItem('accessToken')) options.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return axios(options)
  }

  return async (type, resource, params) => {
    const resourceModel = models[resource]
    const options = await resourceModel.request(apiUrl, type, params)
    try {
      const response = await httpClient(options)
      return resourceModel.response(response, type, params)
    }
    catch (e) {
      if (e && e.response && e.response.status === 401) {
        try {
          const accessToken = await refreshToken(apiUrl, e)
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
            const response = await httpClient(options)

            return resourceModel.response(response, type, params)
          }
        }
        catch (e) {
          throw e.response
        }
      }
      throw e.response
    }
  }
}
