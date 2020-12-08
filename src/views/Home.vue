<template>
  <div class="home">
    <div id="header">
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Brand</a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Link1</a></li>
              <li><a href="#">Link2</a></li>
              <li><a href="#">Link3</a></li>
              <li><a href="#" @click="toChat">聊天室</a></li>
            </ul>
            <form class="navbar-form navbar-left">
              <div class="form-group">
                <input ref="searchInput" type="text" class="form-control" placeholder="输入内容进行检索" style="width: 600px">
              </div>
              <button type="button" class="btn btn-default">检索</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#">{{ state.user }}</a>
              </li>
              <li><a href="#" @click="toLogout">退出登录</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div id="main">
      <div id="siderbar"></div>
      <div id="content"></div>
    </div>
    <div id="footer" style="position: fixed; bottom: 0; height: 40px; width: 100%; background-color: bisque; text-align: right; line-height: 40px">
      <span style="margin-right: 30px">Version: 1.0.1</span>
    </div>
    <div style="margin-top: 200px" v-if="state.showChatRoom">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4>HotMe Chat Room</h4>
          </div>
          <div class="modal-body">
            <textarea v-model="state.chatContent" class="form-control" rows="10"></textarea>
            <div class="form-group" style="margin-top: 10px">
              <div class="col-sm-10" style="padding-left: 0">
                <input type="text" v-model="state.inputMessage" class="form-control" placeholder="输入信息回车即可发送消息" style="float: left">
              </div>
              <button type="button" @click="sendMessage" class="btn btn-primary col-sm-2" data-dismiss="modal" style="">发送</button>
            </div>
          </div>
          <div class="modal-footer" style="margin-top: 30px">
            <button type="button" class="btn btn-warning" data-dismiss="modal">关闭{{ws}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue"
import { to_logout } from "../api/logout.js"
import { useRouter } from "vue-router"
import { to_home } from "../api/home"
import Cookie from "js-cookie"

// 首页请求(有cookie直接请求首页数据展示,否则跳转至登录页)
function toHome(router, state){
  const user = state.user
  if(!user) {
    router.push({
      path: "/login"
    })
  }
  const params = {}
  to_home(params).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log("获取首页数据异常")
    console.log(error)
  })
}

// 退出登录请求(清除cookie跳转至登录页)
function toLogout(router) {
  const params = {}
  to_logout(params).then((response) => {
    const ret = response.data.ret
    if(!ret) {
      // 退出登录后跳转到登录页面,清除cookie,sessionStorge
      sessionStorage.clear()
      Cookie.remove('user')
      router.push({
        // name: 'Login',
        path: "/login" // name 和 path 2选1
      })
    } else {
      alert("退出登录失败")
    }
  }).catch((error) => {
    alert("后端响应异常")
    console.log(error)
  })
}

// // 打开聊天室
// function toChat(state, ws) {
//   state.showChatRoom = true
// }

// // 聊天室发送消息
// function sendMessage(state, ws) {
//   if (state.inputMessage) {
//     ws.send(state.inputMessage)
//     state.inputMessage = ''
//   }
// }

// // 收到服务器消息
// function getMessage(state, ws) {
//   ws.onmessage = function (event) {
//     console.log("收到服务器的消息: ", event.data)
//     state.chatContent += event.data
//   }
// }

export default {
  name: "Home",
  setup() {
    const router = useRouter()
    // const ws = new WebSocket("ws://localhost:8000/chat")
    const state = reactive({
      user: Cookie.get('user'),
      showChatRoom: false,
      chatContent: '',
      inputMessage: ''
    })

    // 定义引用对象
    const searchInput = ref(null)
    // 生命周期函数
    onMounted(() => {
      searchInput.value.focus() // 鼠标移入事件
    })
    // 函数调用
    toHome(router, state)
    toLogout(router)
    return {
      searchInput,
      state,
      toLogout,
      toHome,
    }
  }
}
</script>
