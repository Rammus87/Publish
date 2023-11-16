import axios from "axios";
import { getToken } from "./token";

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout:10000
})

request.interceptors.request.use((config)=> {
  const token = getToken()
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
    return config
  }, (error)=> {
    console.log('執行前就錯誤')
    return Promise.reject(error)
})


request.interceptors.response.use((response)=>{
 
    return response.data
  }, (error)=> {
    console.log('返回後就錯誤')
    return Promise.reject(error)
})

export { request } 