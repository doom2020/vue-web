<template>
  <div class="register">
    <div style="text-align: center;margin-top: 20px">
        <img src="./../../assets/logo.png" style="width: 48px;height: 48px;">
    </div>
    <div style="text-align: center;margin-top: 5px;margin-bottom: 10px">
        <span><strong>hot me</strong></span>
    </div>
    <div style="width: 600px;height: 400px;background-color: #E6E6FA;margin: 0 auto;border-radius: 6px">
        <form style="padding-top: 15px;" class="form-horizontal">
            <div class="form-group has-success has-feedback">
                <label class="control-label col-sm-2" for="account">用户账号</label>
                <div class="col-sm-8">
                    <input type="text" @:blur="checkAccount" v-model='infoForm.account' ref="accountInput" class="form-control" placeholder="输入昵称">
                    <span :class="classInfo.account" class="form-control-feedback" :style="styleInfo.account"></span>
                </div>
                <div class="col-sm-2" style="height: 34px;line-height: 35px;">
                    <span :style="styleInfo.account" v-cloak>{{ errorMsg.account }}</span>
                </div>
            </div>
            <div class="form-group has-success has-feedback">
                <label class="control-label col-sm-2" for="phone">用户手机</label>
                <div class="col-sm-8">
                    <input type="text" @:blur="checkPhone" v-model="phone" class="form-control" placeholder="输入手机号">
                    <span :class="classInfo.phone" class="form-control-feedback" :style="styleInfo.phone"></span>
                </div>
                <div class="col-sm-2" style="height: 34px;line-height: 35px;">
                    <span :style="styleInfo.phone" v-cloak>{{ errorMsg.phone }}</span>
                </div>
            </div>
            <div class="form-group has-success has-feedback">
                <label class="control-label col-sm-2" for="upwd">用户密码</label>
                <div class="col-sm-8">
                    <input type="password" @blur="checkUpwd" v-model="upwd" class="form-control" placeholder="输人密码">
                    <span :class="classInfo.upwd" class="form-control-feedback" :style="styleInfo.upwd"></span>
                </div>
                <div class="col-sm-2" style="height: 34px;line-height: 35px;">
                    <span :style="styleInfo.upwd" v-cloak>{{ errorMsg.upwd }}</span>
                </div>
            </div>
            <div class="form-group has-success has-feedback">
                <label class="control-label col-sm-2" for="cpwd">确认密码</label>
                <div class="col-sm-8">
                    <input type="password" @blur="checkCpwd" v-model="cpwd" class="form-control" placeholder="确认密码">
                    <span :class="classInfo.cpwd" class="form-control-feedback" :style="styleInfo.cpwd"></span>
                </div>
                <div class="col-sm-2" style="height: 34px;line-height: 35px;">
                    <span :style="styleInfo.upwd" v-cloak>{{ errorMsg.cpwd }}</span>
                </div>
            </div>
            <div style="margin-top: 60px;text-align: center">
                <button @click="btnRegister" type="button" class="btn btn-success" style="width: 400px">Register</button>
            </div>
        </form>
        <div style="margin-top: 20px;text-align: right;">
            <a href="/login" style="padding-right: 100px">已有账号?</a>
        </div>
        <div style="text-align: center;margin-top: 30px;" v-show="showErrMsg">
            <h3 style="color: #FF3333;">注册失败</h3>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: 'Register',
  setup() {
    // 定义变量
    let infoForm = reactive({
      account: '',
      phone: '',
      upwd: '',
      cpwd: ''
    })
    let styleInfo = reactive({
      account: {},
      phone: {},
      upwd: {},
      cpwd: {}
    })
    let classInfo = reactive({
      account: 'glyphicon glyphicon glyphicon-user',
      phone: 'glyphicon glyphicon-earphone',
      upwd: 'glyphicon glyphicon-lock',
      cpwd: 'glyphicon glyphicon-lock'
    })
    let errorMsg = reactive({
      account: '',
      phone: '',
      upwd: '',
      cpwd: ''
    })
    let showErrMsg = ref(false)
    let flag = reactive({
      account: false,
      phone: false,
      upwd: false,
      cpwd: false
    })
    const accountInput = ref(null) // 定义dom引用
    // 生命周期函数
    onMounted(() => {
      accountInput.value.focus() // .value获取dom节点
      window.addEventListener('keydown', keyDown) // 监听键盘回车事件
    })
    // 定义方法
    function keyDown(e){
      if(e.keyCode === 13){
        btnRegister()
      }
    }
    function checkAccount(){
      if (!infoForm.account){
        classInfo.account = 'glyphicon glyphicon-remove'
        styleInfo.account = {color: '#FF3333'}
        errorMsg.account = '账号不能空'
        flag.account = false
      } else {
        console.log("进行ajax请求checkAccount")
      }
    }
    function checkPhone(){
      if (!infoForm.phone){
        classInfo.phone = 'glyphicon glyphicon-remove'
        styleInfo.phone = {color: '#FF3333'}
        errorMsg.phone = '号码不能空'
        flag.phone = false
      } else if (infoForm.phone.length != 11){
        classInfo.phone = 'glyphicon glyphicon-remove'
        styleInfo.phone = {color: '#FF3333'}
        errorMsg.phone = '号码不合法'
        flag.phone = false
      } else {
        console.log("进行ajax请求checkPhone")
      }
    }
    function checkUpwd(){
      if (!infoForm.upwd){
        classInfo.upwd = 'glyphicon glyphicon-remove'
        styleInfo.upwd = {color: '#FF3333'};
        errorMsg.upwd = '密码不能空'
        flag.upwd = false
      } else if(infoForm.upwd.length < 8 || infoForm.upwd.length > 16){
        classInfo.upwd = 'glyphicon glyphicon-remove'
        styleInfo.upwd = {color: '#FF3333'};
        errorMsg.upwd = '密码不合法'
        flag.upwd = false
      } else {
        classInfo.upwd = 'glyphicon glyphicon-ok'
        styleInfo.upwd = {};
        errorMsg.upwd = '验证ok'
        flag.upwd = true
      }
    }
    function checkCpwd(){
      if (!infoForm.cpwd){
        classInfo.cpwd = 'glyphicon glyphicon-remove'
        styleInfo.cpwd = {color: '#FF3333'}
        errorMsg.cpwd = '密码不能空'
        flag.cpwd = false
      } else if(infoForm.cpwd != infoForm.upwd){
        classInfo.cpwd = 'glyphicon glyphicon-remove'
        styleInfo.cpwd = {color: '#FF3333'}
        errorMsg.cpwd = '输入不一致'
        flag.cpwd = false
      } else{
        classInfo.cpwd = 'glyphicon glyphicon-ok'
        styleInfo.cpwd = {}
        errorMsg.cpwd = '验证ok'
        flag.cpwd = true
      }
    }
    function btnRegister(){
      if(flag.account && flag.phone && flag.upwd && flag.cpwd){
        console.log("进行ajax请求btnRegister")
      } else{
        showErrMsg.value = true
      }
    }

    return {
        infoForm, styleInfo, classInfo, errorMsg, flag, accountInput, keyDown, showErrMsg,
        checkAccount, checkPhone, checkUpwd, checkCpwd, btnRegister
    }
  }
}
</script>
