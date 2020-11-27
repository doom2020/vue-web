import request from '../utils/request'

export function register(parmas){
    return request({
        url: '/register',
        method: 'post',
        data: {
            post_type: 'register',
            account: parmas.account,
            phone: parmas.phone,
            upwd: parmas.upwd,
            cpwd: parmas.cpwd
        },
        responseType: 'json'
    })
}

export function check_account(params){
    return request({
        url: '/register',
        method: 'post',
        data: {
            post_type: 'check_account',
            account: params.account
        },
        responseType: 'json'

    })
}

export function check_phone(params){
    return request({
        url: '/register',
        method: 'post',
        data: {
            post_type: 'check_phone',
            phone: params.phone
        },
        responseType: 'json'
    })
}