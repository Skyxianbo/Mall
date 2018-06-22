import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/404', '/home'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      removeToken();
      next({ path: '/' })
    } else {
      store.dispatch('GetInfo').then(() => {
        next();
      }).catch(() => {
        store.dispatch('LogOut').then(() => {
          location.reload();
        })
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
