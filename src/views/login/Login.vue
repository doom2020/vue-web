<template>
  <div class="login">
    <div style="text-align: center;margin-top: 20px">
      <img src="./../../assets/logo.png" style="width: 48px;height: 48px;">
    </div>
    <div style="text-align: center;margin-top: 5px;margin-bottom: 10px">
      <span><strong>hot me</strong></span>
    </div>
    <div style="width: 400px;height: 400px;background-color: #E8CCFF;margin: 0 auto;border-radius: 6px">
      <form style="padding-top: 15px;">
        <div class="form-group has-success has-feedback">
          <label class="control-label" for="account">Account</label>
          <input v-model="state.infoForm.account" @blur="checkAccount" @keyup.enter="listenKeyupEnter" ref="accountInput" type="text" class="form-control" placeholder="请输入用户名">
          <span class="glyphicon glyphicon-user form-control-feedback" :style="state.colorStyle.account"></span>
        </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label" for="account">Password</label>
          <input v-model="state.infoForm.password" @blur="checkPassword" type="password" class="form-control" placeholder="请输入用户密码">
          <span class="glyphicon glyphicon-lock form-control-feedback" :style="state.colorStyle.password"></span>
        </div>
        <div style="margin-top: 60px;">
          <button @click="toLogin" :disabled="state.loginDisabled" type="button" class="btn btn-success" style="width: 400px">Login</button>
        </div>
      </form>
      <div style="margin-top: 20px;">
        <a href="/forgetPassword" style="float: left;margin-left: 30px;">忘记密码?</a>
        <a href="/register" style="float: right;margin-right: 30px;">还未注册?</a>
      </div>
      <div v-show="state.showErrMsg" style="text-align: center; margin-top: 80px;">
        <h3 style="color: #FF3333;">account or password is not correct</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { to_login } from '../../api/login'
import store from '../../store/index'
import Cookie from 'js-cookie'

// 检查用户名
function checkAccount(state){
  if(state.infoForm.account) {
      state.colorStyle.account.color = 'green'
  } else {
      state.colorStyle.account.color = '#FF3333'
  }
}

// 检查密码
function checkPassword(state){
  if(state.infoForm.password) {
      state.colorStyle.password.color = 'green'
  } else {
      state.colorStyle.password.color = '#FF3333'
  }
}

// 登录
function toLogin(state, router, Cookie){
  if(!state.infoForm.account || !state.infoForm.password){
      state.showErrMsg = true
  } else {
    const params = { account: state.infoForm.account, password: state.infoForm.password}
    to_login(params).then(response => {
      const ret = response.data.ret
      if(!ret) {
        // 这里可以使用cookie
        sessionStorage.setItem('user', response.data.user)
        Cookie.set("user", response.data.user)
        router.push({
          //   name: 'Home',  // name,path 2选1
            path: '/'
        })
      } else {
        alert("登录失败")
        state.showErrMsg = true
      }
    }).catch(error => {
      console.log(error)
      alert("后端服务器响应出错")
    })
  }
}

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const state = reactive({
      showErrMsg: false,
      infoForm: { account: '', password: ''},
      colorStyle: {
        account: {color: '#FF3333'},
        password: {color: '#FF3333'}
      },
      loginDisabled: false,
    })
    const accountInput = ref(null) // 创建一个dom引用

    onMounted(() => {
      accountInput.value.focus() // accountInput.value 就是dom对象
      window.addEventListener('keyup', keyUp) // 监听键盘回车事件keyUp
    })
    function keyUp(e){
      if(e.keyCode == 13) {
          store.commit('add', 2)
          store.commit('update', '1')
          toLogin(state, router, Cookie)
      }
    }
    return {
      state, accountInput, keyUp, checkAccount, checkPassword
    }
  }
}

</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
