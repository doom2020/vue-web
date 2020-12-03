import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue')
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: () => import('../views/forget/Forget.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局导航设置(可以配置跳转权限验证)
/*
beforeEach(to, from, next) 跳转前
afterEach(to, from) 跳转后
 */
router.beforeEach((to, from, next) => {
  if (to.name === 'Login'){
    // console.log("to login page")
    // next({ name: 'Login' })
  // } else {
  //   next()
  }
  if (to.name === 'Register'){
    // next({ name: 'Register' })
    // console.log("to register page")
  // } else {
  //   next()
  }
  if (to.name === 'Home'){
    // next({ name: 'Home' })
    // console.log("to home page")
  // } else {
  //   next()
  }
  if (to.name === 'Forget'){
    // next({ name: 'Forget' })
    // console.log("to forget password page")
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (to.name === 'Home'){
    // console.log("gone home page")
  }
  if (from.name === 'Home'){
    // console.log("form this come here")
  }
})

export default router
