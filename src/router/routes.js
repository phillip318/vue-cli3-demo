export default [
  {
    path: '/',
    component: () => import('@/views/TabBar'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home'),
        meta: {
          title: '主页'
        }
      },
      {
        path: '/mall',
        component: () => import('@/views/Mall'),
        meta: {
          title: '商城'
        }
      },
      {
        path: '/my',
        component: () => import('@/views/My'),
        meta: {
          title: '我的'
        }
      }
    ]
  }
]