export default {
  menuList: [{
    title: '主页',
    children: [{
      title: 'case主页',
      icon: 'home',
      href: '/index/home'
    }]
  }, {
    title: '新建',
    children: [{
      title: '新建CASE',
      icon: 'plus-round',
      href: '/index/create'
    }]
  }, {
    title: '查看',
    children: [{
      title: '当前CASE',
      icon: 'ios-list',
      href: '/index/findall'
    }, {
      title: '待审核CASE',
      icon: 'edit',
      href: '/index/check'
    }, {
      title: '查看历史记录',
      icon: 'ios-folder',
      href: '/index/history'
    }, {
      title: '查看所有CASE',
      icon: 'ios-list',
      href: '/index/viewall'
    }]
  }, {
    title: '系统',
    children: [{
      title: '新建用户',
      icon: 'settings',
      href: '/index/createuser'
    }, {
      title: '用户管理',
      icon: 'settings',
      href: '/index/manageuser'
    }]
  }],
  breadcrumbList: [{
    title: '主页',
    href: '/index/home'
  }],
  assistmenuList: [{
    title: '主页',
    children: [{
      title: '协查请求主页',
      icon: 'home',
      href: '/assistindex/home'
    }]
  }, {
    title: '新建',
    children: [{
      title: '新建协查请求',
      icon: 'plus-round',
      href: '/assistindex/create'
    }]
  }, {
    title: '查看',
    children: [{
      title: '当前协查',
      icon: 'ios-list',
      href: '/assistindex/findall'
    }, {
      title: '待审核协查',
      icon: 'edit',
      href: '/assistindex/check'
    }, {
      title: '查看协查历史记录',
      icon: 'ios-folder',
      href: '/assistindex/history'
    },{
      title: '查看所有协查请求',
      icon: 'ios-list',
      href: '/assistindex/viewall'
    }
    ]
  }, {
    title: '系统',
    children: [{
      title: '新建用户',
      icon: 'settings',
      href: '/assistindex/createuser'
    }, {
      title: '用户管理',
      icon: 'settings',
      href: '/assistindex/manageuser'
    }]
  }]
}
