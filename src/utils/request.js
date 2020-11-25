import axios from 'axios'

// 创建axios实例
const instance = axios.create({
    baseURL: '127.0.0.1:8000',
    timeout: 1000
})

// 请求拦截器
axios.interceptors.request.use(function(config){
    // 在发送请求之前做些事情
    return config
}, function(error){
    // 对请求错误做些事情
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function(response){
    // 对响应数据做点什么
}, function(error){
    // 对响应错误做点什么
    return Promise.reject(error)
})

// 实例请求响应拦截器
instance.interceptors.request.use(function(config){
    return config
}, function(error){
    return Promise.reject(error)
})

instance.interceptors.response.use(function(response){

}, function(error){
    return Promise.reject(error)
})

export default instance