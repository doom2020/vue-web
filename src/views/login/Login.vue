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
// import { useRouter } from 'vue-router'
import { login } from '../../api/login'
import store from '../../store/index'

export default {
  name: 'Login',
  setup() {
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
          // console.log("onMounted")
          // console.log(accountInput.value)
          window.addEventListener('keydown', keyDown) // 监听键盘回车事件keyDown 移除事件监听 removeEventListener(event, function)
          window.addEventListener('keyup', keyUp) // 监听键盘回车事件keyUp
      })
      // 键盘回车事件
      function keyDown(e){
          if(e.keyCode == 13){
              console.log("keyDown")
          }
      }
      function keyUp(e){
          if(e.keyCode == 13){
              console.log("keyUp")
              store.commit('add', 2)
              store.commit('update', '1')
              console.log(store.state.count)
              console.log(store.state.name)
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
              console.log("进行ajax请求btnLgon")
              const params = { account: infoForm.account, password: infoForm.password}
              login(params).then(response => {
                  const ret = response.data.ret
                  const data = response.data.data
                  if(!ret){
                      alert("登录成功")
                      console.log(data)
                      sessionStorage.setItem('user', response.data.user)
                      console.log(sessionStorage.getItem('user'))
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
      function listenKeyupEnter(envet){
          console.log('keyup enter')
          console.log(envet)
      }
      const count = computed(() => {  // 计算属性获取vuex 数据 return
          return store.state.count
      })
      const name = computed(() => {   // 计算属性获取vuex 数据 return
          return store.state.name
      })
      return {
          showErrMsg, infoForm, invalidStyle, loginDisabled, keyDown, checkAccount, checkPassword, accountInput, btnLogin, listenKeyupEnter,
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
