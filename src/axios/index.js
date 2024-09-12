import axios from "axios";
import router from '@/router'
const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 3000
})
axiosInstance.interceptors.response.use(function(response) {
  const { status } = response
  // token过期
  if (status == '1000') {
    router.push({ path: '/login' })
    return
  }
  return response
})

export {
  axiosInstance
}