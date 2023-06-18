import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (response.headers['content-type'] === 'application/octet-stream') {
      return res
    } else {
      // if the custom code is not 20000, it is judged as an error.
      if (res.code !== '0') {
        return Promise.reject('error')
      } else {
        return res
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default  service
