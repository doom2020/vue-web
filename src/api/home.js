import request from '../utils/request'


export function to_home(params){
    console.log(params)
    return request({
        url: '/',
        method: 'get',
        params: {
        },
        withCredentials: true,
        responseType: 'json'
    })
}