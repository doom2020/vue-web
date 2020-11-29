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

// export function chatRoom(params){
//     console.log(params)
//     const ws = new WebSocket('ws://127.0.0.1:8000/chat')
//       ws.onopen = function(event){
//         console.log(event)
//         ws.send("hello")
//       }
//       ws.onmessage = function(event){
//         console.log("1111111111111")
//         // console.log(chatContent.value)
//         console.log(event)
//       }
// }