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

export default {
  name: 'Home',
  setup() {
    const searchInput = ref(null)
    onMounted(() => {
      searchInput.value.focus()   // 鼠标移入事件
    })
    const params = {}
    function logoutCurrent(){
      logout(params).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
    return {
      searchInput, logoutCurrent
    }
  }
}
</script>
