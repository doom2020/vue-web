import request from '../utils.request'


export function resetPassword(params) {
    return request({
        url: '/forget',
        method: 'post',
        data: '',
        withCredentials: true,
        responseType: 'json'
    })
}


