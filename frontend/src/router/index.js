import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import console from '@/views/console'
import teprunner from '@/views/teprunner'
import test from '@/views/test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    meta: {
      title: '测试平台登录',
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
    redirect: 'teprunner/grammar',
    children: [
      {
        path: 'teprunner',
        name: 'teprunner',
        meta: {
          title: '接口自动化',
        },
        component: teprunner,
        redirect: 'teprunner/grammar',
        children: [
          {
            path: 'grammar',
            meta: {
              title: '语法说明',
            },
            component: () => import('@/views/teprunner/Grammar.vue'),
          },
          {
            path: 'envVar',
            meta: {
              title: '环境变量',
            },
            component: () => import('@/views/teprunner/EnvVar.vue'),
          },
          {
            path: 'fixture',
            name: 'fixture',
            meta: {
              title: 'fixtures',
            },
            component: () => import('@/views/teprunner/Fixture.vue'),
            children: [
              {
                path: 'add',
                name: 'addFixture',
                meta: {
                  title: '新增 fixture',
                },
                component: () => import('@/views/teprunner/FixtureEditor'),
              },
              {
                path: 'edit',
                name: 'editFixture',
                meta: {
                  title: '编辑 fixture',
                },
                component: () => import('@/views/teprunner/FixtureEditor'),
              },
            ],
          },
        ]
      },
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
            component: () => import('@/views/console/UserManagement.vue'),
          },
          {
            path: 'projectManagement',
            meta: {
              title: '项目管理',
            },
            component: () => import('@/views/console/ProjectManagement.vue'),
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
