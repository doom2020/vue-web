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
              <li><a href="#">Link4</a></li>
              </ul>
              <form class="navbar-form navbar-left">
              <div class="form-group">
                  <input ref="searchInput" type="text" class="form-control" placeholder="输入内容进行检索" style="width: 600px;">
              </div>
              <button type="submit" class="btn btn-default">检索</button>
              </form>
              <ul class="nav navbar-nav navbar-right">
              <li><a href="#">{{ user }}</a></li>
              <li><a href="#" @click="logoutCurrent">退出登录</a></li>
              </ul>
          </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
      </nav>
    </div>
    <div id="main">
        <div id="siderbar">

        </div>
        <div id="content">

        </div>
    </div>
    <div id="footer" style="position: fixed;bottom: 0; height: 40px;width: 100%;background-color: bisque;text-align: right;line-height: 40px;">
        <span style="margin-right: 30px;">Version: 1.0.1</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { logout } from '../api/logout.js'
import { useRouter } from 'vue-router'
import { home } from '../api/home'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    // 跳转到首页后调用请求后端首页需要的数据
    const params = {}
    home(params).then(response => {
      console.log(response)
      const ret = response.data.ret
      if(!ret){
        console.log("存在cookie")
        sessionStorage.setItem("user", response.data.user)
      } else{
        router.push({
          path: '/login',
          // name: 'Login'
        })
      }
    }).catch(error => {
      console.log(error)
    })
    const searchInput = ref(null)
    onMounted(() => {
      searchInput.value.focus()   // 鼠标移入事件
    })
    function logoutCurrent(){
      const params = {}
      logout(params).then(response => {
        const ret = response.data.ret
        const data = response.data.data
        console.log(data)
        if(!ret){
          // 退出登录后跳转到登录页面,清除cookie,sessionStorge
          sessionStorage.clear()
          router.push({
            // name: 'Login',
            path: '/login' // name 和 path 2选1
          })
        } else {
          alert("退出登录失败")
        }
      }).catch(error => {
        alert("后端响应异常")
        console.log(error)
      })
    }
    const user = ref(sessionStorage.getItem("user"))
    return {
      searchInput, logoutCurrent, user
    }
  }
}
</script>
