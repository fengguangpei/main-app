const dateShortcuts = {
  today: {
    text: '今天',
    value: () => {
      const end = new Date()
      const start = new Date()
      return [start, end]
    }
  },
  yesterday: {
    text: '昨天',
    value: () => {
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      return [start, start]
    }
  },
  thisMonth: {
    text: '本月',
    value: () => {
      const now = new Date()
      const month = now.getMonth()
      const year = now.getFullYear()
      const first = new Date(`${year}-${month + 1}-1`)
      return [first, now]
    }
  },
  lastMonth: {
    text: '上个月',
    value: () => {
      const now = new Date()
      const month = now.getMonth()
      const year = now.getFullYear()
      const first = new Date(`${year}-${month}-1`)
      const last = new Date(`${year}-${month + 1}-1`)
      last.setTime(last.getTime() - 3600 * 1000 * 24)
      return [first, last]
    }
  },
  lastSevenDays: {
    text: '最近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  lastThirtyDays: {
    text: '最近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  }
}
export default {
  ...dateShortcuts,
  dateShortcuts: Object.values(dateShortcuts)
}
