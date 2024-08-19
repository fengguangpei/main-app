import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { menus } from '../router/asides'
const menuItems = Object.values(menus).flat()
const asides = new Map()
Object.entries(menus).forEach((item) => {
  const [key, arr] = item
  arr.forEach((item) => {
    asides.set(item.name, key)
  })
})
export const useTabsStore = defineStore('tabs', () => {
  // 当前激活Tab
  const activeName = ref('HomePage')
  // 删除缓存Tab
  const excludeTab = ref('')
  // Tabs
  const tabs = reactive([
    {
      name: 'HomePage',
      text: '首页',
      path: '/',
      keepAlive: 'HomePage'
    }
  ])
  // 激活aside
  const activeAside = computed(() => {
    const name = activeName.value
    return asides.get(name) || 'HomePage'
  })
  // 携带状态的Tab
  const statusTabs = computed(() => {
    const current = tabs.findIndex((item) => item.name === activeName.value)
    return tabs.map((item, index) => {
      return {
        ...item,
        class: {
          activedItem: index === current,
          activedRight: index === current + 1,
          activedLeft: index === current - 1
        },
        line: index !== current && index !== current - 1
      }
    })
  })
  // 缓存Tab
  const keepAlive = computed(() => {
    return tabs.map((item) => item.keepAlive).filter((item) => item !== excludeTab.value)
  })
  // 切换
  const changeTab = (name) => {
    const item = tabs.find((item) => item.name === name)
    if (item) {
      activeName.value = item.name
    }
  }
  // 关闭
  const closeTab = (name, router) => {
    let index = tabs.findIndex((item) => item.name === name)
    const current = tabs.findIndex((item) => item.name === activeName.value)
    let tmp = index === tabs.length - 1 ? index - 1 : index
    tabs.splice(index, 1)
    if (current === index) {
      const item = tabs[tmp]
      activeName.value = item.name
      router.replace({
        path: item.path
      })
    }
  }
  // 新增
  const addTab = (name, fullPath) => {
    const menuItem = menuItems.find((item) => item.name === name)
    const index = tabs.findIndex((item) => item.name === name)
    index === -1 && tabs.push({ ...menuItem, path: fullPath })
  }
  // 修改excludeTab
  const changeExcludeTab = (keepAlive) => {
    excludeTab.value = keepAlive
  }
  return {
    tabs,
    activeName,
    activeAside,
    statusTabs,
    keepAlive,
    addTab,
    changeTab,
    closeTab,
    changeExcludeTab
  }
})
