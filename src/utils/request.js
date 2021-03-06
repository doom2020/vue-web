import axios from 'axios'

// 创建axios实例
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
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
    console.log(response)
}, function(error){
    // 对响应错误做点什么
    return Promise.reject(error)
})

// 实例请求拦截器
instance.interceptors.request.use(function(config){
    // 添加cookie
    console.log("请求信息: ", config)
    // console.log(config) // config 包含请求的各种参数,可在此次对请求做一些处理
    return config
}, function(error){
    return Promise.reject(error)
})

// 实例响应拦截器
instance.interceptors.response.use(function(response){
    console.log("响应信息: ", response)
    return response  // 响应信息都在response里面,处理后必须返回
}, function(error){
    return Promise.reject(error)
})

export default instance