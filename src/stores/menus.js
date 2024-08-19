import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { asides, menus } from '../router/asides'
export const useMenusStore = defineStore('menus', () => {
  // 激活一级菜单
  const focusTab = ref('Organization')
  // 一级菜单
  const aside = reactive(asides)
  // 激活二级菜单
  const showMenu = ref(false)
  // 二级菜单
  const menu = computed(() => {
    const validate = Reflect.has(menus, focusTab.value)
    const menu = validate ? Reflect.get(menus, focusTab.value) : []
    const map = new Map()
    menu.forEach((item) => {
      if (map.has(item.group)) {
        map.get(item.group).children.push(item)
      } else {
        map.set(item.group, {
          text: item.group,
          children: [item]
        })
      }
    })
    return [...map.values()]
  })
  // 打开/关闭二级菜单
  const changeMenu = (status) => {
    showMenu.value = status
  }
  // 修改一级激活菜单
  const changeFocusTab = (tabName) => {
    focusTab.value = tabName
  }
  return {
    focusTab,
    menu,
    aside,
    showMenu,
    changeMenu,
    changeFocusTab
  }
})
