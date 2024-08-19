import Frame from '../views/Frame.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { route } from './routes.js'
import { useTabsStore } from '../stores/tabs'
import { loadMicroApp } from 'qiankun'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: Frame,
    children: [
      ...route,
      {
        path: '/:all(.*)*',
        component: () => import('../views/MicroApp.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.onError((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})

/** 全局路由前置钩子 */
router.beforeEach((to, from, next) => {
  const { name, path, fullPath } = to
  // 刷新路由
  if (path.includes('RefreshPage')) {
    next()
    return
  }
  next()
  const tabsInstance = useTabsStore()
  const { addTab, changeTab } = tabsInstance
  addTab(name, fullPath)
  changeTab(name)
})

/** 全局路由后置钩子 */
router.afterEach((to) => {
  if (to.meta.microApp) {
    requestAnimationFrame(() => {
      initMicroApp()
    })
  }
  flag === 'mounted' && unmountMicroApp()
})

/** 子应用 */
let microApp = null
let flag = null
async function initMicroApp() {
  // 重新挂载
  if (flag === 'remount') {
    microApp.update({
      remount: true
    })
    flag = 'mounted'
  }
  // 子应用初始化
  if (flag === null) {
    const entry = PRODUCTION
      ? 'https://fenggp.obs.cn-south-1.myhuaweicloud.com/micro-app/index.html'
      : '//localhost:8081'
    microApp = loadMicroApp({
      name: 'micro-app',
      entry,
      container: '#micro-one'
    })
    await microApp.mountPromise
    microApp.update({
      $rootRouter: router
    })
    flag = 'mounted'
  }
}

// 卸载子应用Vue实例
async function unmountMicroApp() {
  const tabsInstance = useTabsStore()
  const { keepAlive } = tabsInstance
  if (!keepAlive.includes('MicroApp') && microApp) {
    await microApp.update({
      unmount: true
    })
    flag = 'remount'
  }
}
export default router
