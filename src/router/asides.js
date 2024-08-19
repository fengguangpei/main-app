export const asides = [
  {
    text: '组织',
    icon: 'icon-zuzhiqunzu',
    name: 'Organization'
  },
  {
    text: '员工',
    name: 'Employee',
    icon: 'icon-yuangong1'
  },
  {
    text: '用车',
    name: 'Card',
    icon: 'icon-qiche'
  }
]
export const menus = {
  Organization: [
    {
      text: '通讯录',
      name: 'AddressBook',
      path: '/AddressBook',
      group: '组织架构',
      keepAlive: 'AddressBook'
    },
    {
      text: '组织管理',
      name: 'OrganizeManage',
      path: '/OrganizeManage',
      group: '组织架构',
      keepAlive: 'OrganizeManage'
    }
  ],
  Employee: [
    {
      text: '花名册',
      name: 'Roster',
      path: '/Roster',
      group: '员工管理',
      keepAlive: 'Roster'
    },
    {
      text: '合同管理',
      name: 'ContractManage',
      path: '/ContractManage',
      group: '员工关系',
      keepAlive: 'ContractManage'
    }
  ],
  Card: [
    {
      text: '用车管理',
      name: 'CarManage',
      path: '/CarManage',
      group: '用车',
      keepAlive: 'MicroApp'
    },
    {
      text: '用车记录',
      name: 'CarLog',
      path: '/CarLog',
      group: '用车',
      keepAlive: 'MicroApp'
    },
    {
      text: '请求评论',
      name: 'RequestReview',
      path: '/RequestReview',
      group: '用车',
      keepAlive: 'MicroApp'
    }
  ]
}
export const description = {
  asides: '一级菜单',
  menus: '二级菜单'
}
