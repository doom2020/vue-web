<template>
  <div class="register">
    <div style="text-align: center; margin-top: 20px">
      <img src="./../../assets/logo.png" style="width: 48px; height: 48px">
    </div>
    <div style="text-align: center; margin-top: 5px; margin-bottom: 10px">
      <span><strong>hot me</strong></span>
    </div>
    <div style="width: 600px;height: 400px;background-color: #e6e6fa;margin: 0 auto;border-radius: 6px;">
      <form style="padding-top: 15px" class="form-horizontal">
        <div class="form-group has-success has-feedback">
          <label class="control-label col-sm-2" for="account">用户账号</label>
          <div class="col-sm-8">
            <input type="text" @blur="checkAccount" v-model="state.infoForm.account" ref="accountInput" class="form-control" placeholder="输入昵称">
            <span :class="state.classInfo.account" class="form-control-feedback" :style="state.styleInfo.account"></span>
          </div>
          <div class="col-sm-2" style="height: 34px; line-height: 35px">
            <span :style="state.styleInfo.account">{{ state.errorMsg.account }}</span>
          </div>
        </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label col-sm-2" for="phone">用户手机</label>
          <div class="col-sm-8">
            <input type="text" @blur="checkPhone" v-model="state.infoForm.phone" class="form-control" placeholder="输入手机号">
            <span :class="state.classInfo.phone" class="form-control-feedback" :style="state.styleInfo.phone"></span>
          </div>
          <div class="col-sm-2" style="height: 34px; line-height: 35px">
            <span :style="state.styleInfo.phone">{{ state.errorMsg.phone }}</span>
          </div>
        </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label col-sm-2" for="upwd">用户密码</label>
          <div class="col-sm-8">
            <input type="password" @blur="checkUpwd" v-model="state.infoForm.upwd" class="form-control" placeholder="输人密码">
            <span :class="state.classInfo.upwd" class="form-control-feedback" :style="state.styleInfo.upwd"></span>
          </div>
          <div class="col-sm-2" style="height: 34px; line-height: 35px">
            <span :style="state.styleInfo.upwd">{{ state.errorMsg.upwd }}</span>
          </div>
        </div>
        <div class="form-group has-success has-feedback">
          <label class="control-label col-sm-2" for="cpwd">确认密码</label>
          <div class="col-sm-8">
            <input type="password" @blur="checkCpwd" v-model="state.infoForm.cpwd" class="form-control" placeholder="确认密码">
            <span :class="state.classInfo.cpwd" class="form-control-feedback" :style="state.styleInfo.cpwd"></span>
          </div>
          <div class="col-sm-2" style="height: 34px; line-height: 35px">
            <span :style="state.styleInfo.upwd">{{ state.errorMsg.cpwd }}</span>
          </div>
        </div>
        <div style="margin-top: 60px; text-align: center">
          <button @click="toRegister" type="button" class="btn btn-success" style="width: 400px">Register</button>
        </div>
      </form>
      <div style="margin-top: 20px; text-align: right">
        <a href="/login" style="padding-right: 100px">已有账号?</a>
      </div>
      <div style="text-align: center; margin-top: 30px" v-show="state.showErrMsg">
        <h3 style="color: #ff3333">注册失败</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue"
import { to_register, check_account, check_phone } from "../../api/register"
import { useRouter } from "vue-router"

// 用户名检查
function checkAccount(state) {
  if (!state.infoForm.account) {
    state.classInfo.account = "glyphicon glyphicon-remove"
    state.styleInfo.account = { color: "#FF3333" }
    state.errorMsg.account = "账号不能空"
    state.flag.account = false
  } else {
    console.log("进行ajax请求checkAccount")
    const params = { account: state.infoForm.account }
    check_account(params).then((response) => {
      const ret = response.data.ret
      if (!ret) {
        state.classInfo.account = "glyphicon glyphicon-ok"
        state.styleInfo.account = "green"
        state.errorMsg.account = ""
        state.flag.account = true
      } else {
        state.classInfo.account = "glyphicon glyphicon-remove"
        state.styleInfo.account = { color: "#FF3333" }
        state.errorMsg.account = "用户名无效"
        state.flag.account = false
      }
    }).cacth((error) => {
      console.log(error)
      alert("服务器响应异常")
    })
  }
}

// 用户手机检查
function checkPhone(state) {
  if (!state.infoForm.phone) {
    state.classInfo.phone = "glyphicon glyphicon-remove"
    state.styleInfo.phone = { color: "#FF3333" }
    state.errorMsg.phone = "号码不能空"
    state.flag.phone = false
  } else if (state.infoForm.phone.length != 11) {
    state.classInfo.phone = "glyphicon glyphicon-remove"
    state.styleInfo.phone = { color: "#FF3333" }
    state.errorMsg.phone = "号码不合法"
    state.flag.phone = false
  } else {
    console.log("进行ajax请求checkPhone")
    const params = { phone: state.infoForm.phone }
    check_phone(params).then((response) => {
      const ret = response.data.ret
      if (!ret) {
        state.classInfo.phone = "glyphicon glyphicon-ok"
        state.styleInfo.phone = { color: "green" }
        state.errorMsg.phone = ""
        state.flag.phone = true
      } else {
        state.classInfo.phone = "glyphicon glyphicon-remove"
        state.styleInfo.phone = { color: "#FF3333" }
        state.errorMsg.phone = "手机号无效"
        state.flag.phone = false
      }
    }).catch((error) => {
      console.log(error)
      alert("服务器异常")
    })
  }
}

// 密码检查
function checkUpwd(state) {
  if (!state.infoForm.upwd) {
    state.classInfo.upwd = "glyphicon glyphicon-remove"
    state.styleInfo.upwd = { color: "#FF3333" }
    state.errorMsg.upwd = "密码不能空"
    state.flag.upwd = false
  } else if (state.infoForm.upwd.length < 8 || state.infoForm.upwd.length > 16) {
    state.classInfo.upwd = "glyphicon glyphicon-remove"
    state.styleInfo.upwd = { color: "#FF3333" }
    state.errorMsg.upwd = "密码不合法"
    state.flag.upwd = false
  } else {
    state.classInfo.upwd = "glyphicon glyphicon-ok"
    state.styleInfo.upwd = {}
    state.errorMsg.upwd = "验证ok"
    state.flag.upwd = true
  }
}

// 密码确认
function checkCpwd(state) {
  if (!state.infoForm.cpwd) {
    state.classInfo.cpwd = "glyphicon glyphicon-remove"
    state.styleInfo.cpwd = { color: "#FF3333" }
    state.errorMsg.cpwd = "密码不能空"
    state.flag.cpwd = false
  } else if (state.infoForm.cpwd != state.infoForm.upwd) {
    state.classInfo.cpwd = "glyphicon glyphicon-remove"
    state.styleInfo.cpwd = { color: "#FF3333" }
    state.errorMsg.cpwd = "输入不一致"
    state.flag.cpwd = false
  } else {
    state.classInfo.cpwd = "glyphicon glyphicon-ok"
    state.styleInfo.cpwd = {}
    state.errorMsg.cpwd = "验证ok"
    state.flag.cpwd = true
  }
}

// 注册
function toRegister(state, router) {
  if (state.flag.account && state.flag.phone && state.flag.upwd && state.flag.cpwd) {
    const params = {
      account: state.infoForm.account,
      phone: state.infoForm.phone,
      upwd: state.infoForm.upwd,
      cpwd: state.infoForm.cpwd
    }
    to_register(params).then((response) => {
      const ret = response.data.ret
      if (!ret) {
        sessionStorage.setItem("user", response.data.user)
        router.push({
          path: "/login"
          // name: 'Home'
        })
      } else {
        alert("注册失败");
        state.showErrMsg = true
      }
    }).catch((error) => {
      console.log(error)
      alert("服务器异常")
    })
  } else {
    state.showErrMsg = true
  }
}

export default {
  name: "Register",
  setup() {
    // router对象
    const router = useRouter()
    // 定义变量
    const state = reactive({
      infoForm: {account: "", phone: "", upwd: "", cpwd: ""},
      styleInfo: {account: {}, phone: {}, upwd: {}, cpwd: {}},
      classInfo: {
        account: "glyphicon glyphicon glyphicon-user",
        phone: "glyphicon glyphicon-earphone",
        upwd: "glyphicon glyphicon-lock",
        cpwd: "glyphicon glyphicon-lock"
      },
      errorMsg: {account: "", phone: "", upwd: "", cpwd: ""},
      showErrMsg: false,
      flag: {account: false, phone: false, upwd: false, cpwd: false},

    })
    const accountInput = ref(null) // 定义dom引用
    // 生命周期函数
    onMounted(() => {
      accountInput.value.focus() // .value获取dom节点
      window.addEventListener("keyup", keyUp) // 监听键盘回车事件
    })
    // 定义方法
    function keyUp(e) {
      if (e.keyCode === 13) {
        toRegister(state, router)
      }
    }
    // checkAccount(state)
    // check_phone(state)
    // checkUpwd(state)
    // checkCpwd(state)
    // toRegister(state, router)
    return { state, accountInput, keyUp, checkAccount, checkPhone, checkUpwd, checkCpwd, toRegister }
  }
}
</script>
