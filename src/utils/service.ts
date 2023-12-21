import axios from 'axios';
import { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router';

const baseURL = import.meta.env.VITE_BASE_URL;//请求头

message.config({
  maxCount: 1,
})

const service = axios.create({
  timeout: 120000,  //请求过期时间
  baseURL
})

service.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token');
  config.headers['satoken'] = token?token:window.localStorage.getItem('token'); //config里就是可以统一配置request请求的参数，headers就可以在这设置
  config.headers['Content-type'] = 'application/json; charset=utf-8';
  config.headers.Accept = "application/json";
  return config
},
  error => Promise.reject(error)
)

service.interceptors.response.use((res: AxiosResponse) => {  //如果要根据请求返回的结果进行一些操作就在response中设置
  if (res.status === 200) {
    return res.data;
  }else {
    return res.data;
  }

}, error => {
  if (error.response.status === 403) {  //token过期了直接就清空本地缓存，跳转到登陆页
    message.warning(error.response.data.msg)
    sessionStorage.clear()
    router.replace({path:`/login`})
  }else {
    return error.response;
  }
})

export default service;
