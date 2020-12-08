<template>
  <div class="home">
    <div id="header">
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Brand</a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Link1</a></li>
              <li><a href="#">Link2</a></li>
              <li><a href="#">Link3</a></li>
              <li><a href="#" @click="openChat">聊天室</a></li>
            </ul>
            <form class="navbar-form navbar-left">
              <div class="form-group">
                <input ref="searchInput" type="text" class="form-control" placeholder="输入内容进行检索" style="width: 600px" />
              </div>
              <button type="submit" class="btn btn-default">检索</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#">{{ user }}</a>
              </li>
              <li><a href="#" @click="logoutCurrent">退出登录</a></li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </div>
    <div id="main">
      <div id="siderbar"></div>
      <div id="content"></div>
    </div>
    <div id="footer" style="position: fixed; bottom: 0; height: 40px; width: 100%; background-color: bisque; text-align: right; line-height: 40px">
      <span style="margin-right: 30px">Version: 1.0.1</span>
    </div>
    <div style="margin-top: 200px" v-if="showChatRoom">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4>HotMe Chat Room</h4>
          </div>
          <div class="modal-body">
            <textarea v-model="chatContent" class="form-control" rows="10"></textarea>
            <div class="form-group" style="margin-top: 10px">
              <div class="col-sm-10" style="padding-left: 0">
                <input type="text" v-model="inputMessage" class="form-control" placeholder="输入信息回车即可发送消息" style="float: left" />
              </div>
              <button type="button" @click="btnSendMessage" class="btn btn-primary col-sm-2" data-dismiss="modal" style="">发送</button>
            </div>
          </div>
          <div class="modal-footer" style="margin-top: 30px">
            <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from "vue";
import { logout } from "../api/logout.js";
import { useRouter } from "vue-router";
import { home } from "../api/home";
import Cookie from "js-cookie";

export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const user = ref("未登录");
    // 跳转到首页后立刻向后端首页接口发起get请求(存在登录信息请求首页数据展示,否则重定向到登录页面)
    const params = {};
    home(params)
      .then((response) => {
        const ret = response.data.ret;
        if (!ret) {
          user.value = Cookie.get("user");
          return;
        } else {
          router.push({
            path: "/login",
            // name: 'Login'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const searchInput = ref(null);
    onMounted(() => {
      searchInput.value.focus(); // 鼠标移入事件
    });
    function logoutCurrent() {
      const params = {};
      logout(params)
        .then((response) => {
          const ret = response.data.ret;
          if (!ret) {
            // 退出登录后跳转到登录页面,清除cookie,sessionStorge
            sessionStorage.clear();
            Cookie.remove(user);
            router.push({
              // name: 'Login',
              path: "/login", // name 和 path 2选1
            });
          } else {
            alert("退出登录失败");
          }
        })
        .catch((error) => {
          alert("后端响应异常");
          console.log(error);
        });
    }
    const showChatRoom = ref(false);
    const chatInfo = reactive({
      chatContent: "",
      inputMessage: "",
    });
    function openChat() {
      showChatRoom.value = true;
      console.log(1111111111111);
      const ws = new WebSocket("ws://localhost:8000/chat");
      console.log(ws);
      console.log(user.value);
      setTimeout(() => {
        ws.send(user.value);
      }, 1000);
      // ws.send(user.value);

      // ws.onmessage = function (event) {
      //   console.log("收到服务器的消息: ", event.data);
      //   chatInfo.chatContent = event.data;
      // };
    }
    // function btnSendMessage() {
    //   if (chatInfo.inputMessage) {
    //     ws.send(chatInfo.inputMessage);
    //     chatInfo.inputMessage = "";
    //   }
    // }
    return {
      searchInput,
      logoutCurrent,
      user,
      showChatRoom,
      openChat,
      // btnSendMessage,
      ...toRefs(chatInfo),
    };
  },
};
</script>
