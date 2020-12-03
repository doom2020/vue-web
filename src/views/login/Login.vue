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
                <input v-model="infoForm.account" @blur="checkAccount" @keyup.enter="listenKeyupEnter" ref="accountInput" type="text" class="form-control" placeholder="请输入用户名">
                <span class="glyphicon glyphicon-user form-control-feedback" :style="invalidStyle.account"></span>
            </div>
            <div class="form-group has-success has-feedback">
                <label class="control-label" for="account">Password</label>
                <input v-model="infoForm.password" @blur="checkPassword" type="password" class="form-control" placeholder="请输入用户密码">
                <span class="glyphicon glyphicon-lock form-control-feedback" :style="invalidStyle.password"></span>
            </div>
            <div style="margin-top: 60px;">
                <button @click="btnLogin" :disabled="loginDisabled" type="button" class="btn btn-success" style="width: 400px">Login</button>
            </div>
        </form>
        <div style="margin-top: 20px;">
            <a href="/forgetPassword" style="float: left;margin-left: 30px;">忘记密码?</a>
            <a href="/register" style="float: right;margin-right: 30px;">还未注册?</a>
        </div>
        <div v-show="showErrMsg" style="text-align: center; margin-top: 80px;">
            <h3 style="color: #FF3333;">account or password is not correct</h3>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed} from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../api/login'
import store from '../../store/index'
import Cookie from 'js-cookie'

export default {
  name: 'Login',
  setup() {
      const router = useRouter()
    //   const params = {}
      // 跳转到登录页面后立刻向后端登录接口发起get请求(存在session或者cookie则直接跳转到首页,否则留在登录页面)
    //   login_get(params).then(response => {
    //       const ret = response.data.ret
    //       if(!ret){
    //           sessionStorage.setItem("user", response.data.user)
    //           router.push({
    //               path: '/',
    //             //   name: 'Home'
    //           })
    //       } else{
    //           console.log("不存在cookie")
    //           return
    //       }
    //   }).catch(error => {
    //       console.log(error)
    //   })
      // 定义普通变量使用ref,定义对象和数组使用reactive
      const showErrMsg = ref(false)
      const infoForm = reactive({
          account: '',
          password: ''
      })
      const invalidStyle = reactive({
          account: {color: '#FF3333'},
          password: {color: '#FF3333'}
      })
      const loginDisabled = ref(false)
      const accountInput = ref(null) // 创建一个dom引用,return 出去
      onMounted(() => {
          accountInput.value.focus() // accountInput.value 就是dom对象
        //   window.addEventListener('keydown', keyDown) // 监听键盘回车事件keyDown 移除事件监听 removeEventListener(event, function)
          window.addEventListener('keyup', keyUp) // 监听键盘回车事件keyUp
      })
      function keyUp(e){
          if(e.keyCode == 13){
              store.commit('add', 2)
              store.commit('update', '1')
              btnLogin()
          }
      }
      function checkAccount(){
          if(infoForm.account) {
              invalidStyle.account.color = 'green'
          } else {
              invalidStyle.account.color = '#FF3333'
          }
      }
      function checkPassword(){
          if(infoForm.password) {
              invalidStyle.password.color = 'green'
          } else {
              invalidStyle.password.color = '#FF3333'
          }
      }
      function btnLogin(){
          if(!infoForm.account || !infoForm.password){
              showErrMsg.value = true
          } else{
              const params = { account: infoForm.account, password: infoForm.password}
              login(params).then(response => {
                  const ret = response.data.ret
                  if(!ret){
                      // 这里可以使用cookie
                      sessionStorage.setItem('user', response.data.user)
                      Cookie.set("user", response.data.user)
                      console.log("登录成功")
                      router.push({
                        //   name: 'Home',  // name,path 2选1
                          path: '/'
                      })
                  } else{
                      alert("登录失败")
                      showErrMsg.value = true
                  }
              }).catch(error => {
                  console.log(error)
                  alert("后端服务器响应出错")
              })
          }
      }
      const count = computed(() => {  // 计算属性获取vuex 数据 return
          return store.state.count
      })
      const name = computed(() => {   // 计算属性获取vuex 数据 return
          return store.state.name
      })
      return {
          showErrMsg, infoForm, invalidStyle, loginDisabled, checkAccount, checkPassword, accountInput, btnLogin,
          keyUp, count, name
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
