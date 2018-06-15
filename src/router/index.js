import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), name: 'login', hidden: true, meta: { noCache: true } },
  { path: '/404', component: _import('404'), name: 'error', hidden: true },
  // { path: '/test', component: _import('admanage/components/AdLocation'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'login',
    // name: 'login',
    hidden: true,
    children: [{
      path: 'login',
      redirect: 'login/index',
      component: _import('login/index')
    }]
  },
  //今日报价
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/index',
    name: 'goods',
    meta: { title: '今日报价', icon: 'example', noCache: false, new: true },
    children: [{
      path: 'index',
      name: 'Goods',
      hidden: false,
      component: _import('goods/index'),
      meta: { title: '今日报价', icon: 'example', noCache: false, new: true }
    }]
  },
  //订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    meta: { title: '订单管理', icon: 'example', noCache: false, new: true },
    children: [{
      path: 'index',
      name: 'Order',
      hidden: false,
      component: _import('order/index'),
      meta: { title: '订单管理', icon: 'example', noCache: false, new: true }
    }, {
      path: 'preOrder/id/:id',
      name: 'OrderPreOrder',
      hidden: true,
      component: _import('order/preOrder'),
      meta: { title: '预下单页', icon: 'example', noCache: false, new: true }
    }]
  },
  //修改密码
  {
    path: '/changePassword',
    component: Layout,
    redirect: '/changePassword/index',
    name: 'changePassword',
    meta: { title: '修改密码', icon: 'example', noCache: false, new: true },
    children: [{
      path: 'index',
      name: 'ChangePassword',
      hidden: false,
      component: _import('changePassword/index'),
      meta: { title: '修改密码', icon: 'example', noCache: false, new: true }
    }]
  },
  //通知公告
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/index',
    name: 'notice',
    meta: { title: '通知公告', icon: 'example', noCache: false, new: true },
    children: [{
      path: 'index',
      name: 'Notice',
      hidden: false,
      component: _import('notice/index'),
      meta: { title: '通知公告', icon: 'example', noCache: false, new: true }
    }]
  },
  //合作须知
  {
    path: '/cooperation',
    component: Layout,
    redirect: '/cooperation/index',
    name: 'cooperation',
    meta: { title: '合作须知', icon: 'example', noCache: false, new: true },
    children: [{
      path: 'index',
      name: 'Cooperation',
      hidden: false,
      component: _import('cooperation/index'),
      meta: { title: '合作须知', icon: 'example', noCache: false, new: true }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
