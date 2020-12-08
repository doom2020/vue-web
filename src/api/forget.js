import request from '../utils.request'


export function resetPassword(params) {
    console.log(params)
    return request({
        url: '/forget',
        method: 'get',
        params: '',
        withCredentials: true,
        responseType: 'json'
    })
}


