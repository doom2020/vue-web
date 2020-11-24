import request from '../utils/request'

export function register(){
    return request({
        url: '/register',
        method: 'post',
        data: '',
        responseType: 'json'
    })
}