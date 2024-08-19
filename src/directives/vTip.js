const overflow = function (target, height) {
  const text = document.querySelector('#v-text')
  text.innerText = target.innerText
  const style = window.getComputedStyle(target)
  let res = ''
  for (let i = 0; i < style.length; i++) {
    const key = style[i]
    res += `${key}: ${style.getPropertyValue(key)};`
  }
  text.setAttribute('style', res)
  text.style.position = 'fixed'
  text.style.overflow = 'auto'
  return text.scrollHeight > height + 2
}
const mouseEnter = function (event) {
  const target = event.target
  const childCount = target.childElementCount
  // 判断是否只包含文本
  if (childCount) {
    target.removeEventListener('mouseenter', handle)
    return
  }
  // 判断是否溢出
  if (overflow(target, target.clientHeight) === false) {
    return
  }
  const container = document.querySelector('#v-tip')
  const care = container.querySelector('i')
  container.innerText = target.textContent
  container.appendChild(care)
  const rect1 = target.getBoundingClientRect()
  const rect2 = container.getBoundingClientRect()
  let top = 0
  if (window.innerHeight - rect1.bottom < rect2.height) {
    top = rect1.top - rect2.height - 10
    care.style.top = ''
    care.style.bottom = '-13px'
    care.style.left = ''
    care.style.transform = 'rotate(180deg)'
  } else {
    top = rect1.top + rect1.height + 10
    care.style.transform = ''
    care.style.bottom = ''
    care.style.top = '-13px'
  }
  let left = rect1.left + parseInt(rect1.width / 2) - parseInt(rect2.width / 2)
  if (left + rect2.width > window.innerWidth) {
    left = window.innerWidth - rect2.width - 10
  } else {
    left = Math.max(left, 60)
  }
  care.style.left = rect1.left - left + parseInt(rect1.width / 2) + 'px'
  container.style.top = top + 'px'
  container.style.left = left + 'px'
}
const mouseLeave = function (event) {
  const container = document.querySelector('#v-tip')
  container.style.top = '-1000px'
  container.style.left = '-1000px'
}
let timeout = null
const vTip = {
  mounted(el, bind, vnode, preVnode) {
    el.addEventListener('mouseenter', function (event) {
      timeout = setTimeout(() => mouseEnter(event), 500)
    })
    el.addEventListener('mouseleave', function (event) {
      timeout && clearTimeout(timeout)
      timeout = null
      mouseLeave(event)
    })
  },
  beforeMount(el, bind, vnode, preVnode) {
    el.removeEventListener('mouseenter', mouseEnter)
    el.removeEventListener('mouseeleave', mouseLeave)
  }
}
export default vTip
