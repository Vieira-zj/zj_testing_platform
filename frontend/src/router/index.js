import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import console from '@/views/console'
import test from '@/views/test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    meta: {
      title: "测试平台登录",
    },
    component: login,
  },
  {
    path: '/',
    name: 'home',
    meta: {
      requireAuth: true,
    },
    component: home,
    redirect: 'console/userManagement',
    children: [
      {
        path: 'console',
        name: 'console',
        meta: {
          title: '后台管理',
        },
        component: console,
        redirect: 'console/userManagement',
        // children inherit from home and console view
        children: [
          {
            path: 'userManagement',
            meta: {
              title: '用户管理',
            },
            component: () => import('@/views/console/userManagement.vue'),
          },
        ]
      },
      {
        path: 'test',
        name: 'test',
        meta: {
          title: '组件测试',
        },
        component: test,
        redirect: 'test/testCasesTree',
        // children inherit from home and test view
        children: [
          {
            path: 'testCasesTree',
            meta: {
              title: 'TestCasesTree',
            },
            component: () => import('@/views/test/testCasesTree'),
          },
          {
            path: 'testCasesHeTree',
            meta: {
              title: 'TCsHeTree',
            },
            component: () => import('@/views/test/tcsHeTree'),
          },
          {
            path: 'testCasesDraggableTree',
            meta: {
              title: 'TCsDraggableTree',
            },
            component: () => import('@/views/test/tcsDraggableTree'),
          },
        ],
      },
    ]
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(auth => auth.meta.requireAuth)) {
    let token = localStorage.getItem('token')
    if (!token) {
      next({
        path: '/login'
      })
    }
  }
  next()
})

export default router
