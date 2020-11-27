import request from '../utils/request'


export function home(params){
    console.log(params)
    return request({
        url: '/',
        method: 'get',
        params: {
        },
        responseType: 'json'
    })
}