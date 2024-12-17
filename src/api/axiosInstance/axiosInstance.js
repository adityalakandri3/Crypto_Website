import axios from 'axios'
import { baseURL } from '../endPoints/endPoints'
export const axiosInstance = axios.create({
  baseURL,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
