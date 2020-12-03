import request from '../utils/request'


export function login(params){
    return request({
        url: '/login',
        method: 'post',
        data: {
            post_type: 'login', // 后端需要的请求类型参数'post_type'
            account: params.account,
            password: params.password
        },
        withCredentials: true,
        responseType: 'json'
    })
}

export function login_get(params){
    console.log(params)
    return request({
        url: '/login',
        method: 'get',
        params: {
        },
        withCredentials: true,
        responseType: 'json'
    })
}