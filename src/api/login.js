import request from '../utils/request'


export function login(params){
    console.log('2222222222')
    console.log(params)
    return request({
        url: '/login',
        method: 'post',
        data: {
            account: params.account,
            password: params.password
        },
        responseType: 'json'
    })
}