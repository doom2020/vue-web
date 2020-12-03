import request from '../utils/request'


export function logout(params){
    console.log(params)
    return request({
        url: '/',
        method: 'post',
        data: {
            post_type: 'logout'
        },
        withCredentials: true,
        responseType: 'json'
    })
}