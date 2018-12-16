import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Home from '@/components/home/Home'
import Create from '@/components/create/Create'
import Personal from '@/components/personal/Personal'
import FindAll from '@/components/find/FindAll'
import Check from '@/components/find/Check'
import History from '@/components/find/History'
import ViewAll from '@/components/find/ViewAll'
import CreateUser from '@/components/manage/CreateUser'
import ManageUser from '@/components/manage/ManageUser'
import NewIndex from '@/components/Newindex'
import AssistIndex from '@/components/AssistIndex'
import AssistHome from '@/components/assisthome/Home'
import AssistCreate from '@/components/assistcreate/Create'
import AssistFindAll from '@/components/assistfind/FindAll'
import AssistCheck from '@/components/assistfind/Check'
import AssistHistory from '@/components/assistfind/History'
import AssistViewAll from '@/components/assistfind/ViewAll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: 'ERS-登录'
      },
      component: Login
    },
    {
      path: '/newindex',
      name: 'NewIndex',
      component: NewIndex
    },
    {
      path: '/assistindex',
      name: 'AssistIndex',
      component: AssistIndex,
      redirect: '/assistindex/home',
      children: [{
        path: '/assistindex/home',
        name: 'AssistHome',
        component: AssistHome
      },
      // {
      //   path: '/assistindex/personal',
      //   name: 'Personal',
      //   component: Personal
      // },
       {
        path: '/assistindex/create',
        name: 'AssistCreate',
        component: AssistCreate
      }, {
        path: '/assistindex/findall',
        name: 'AssistFindAll',
        component: AssistFindAll
      }, {
        path: '/assistindex/check',
        name: 'AssistCheck',
        component: AssistCheck
      }, {
        path: '/assistindex/history',
        name: 'AssistHistory',
        component: AssistHistory
      }, {
        path: '/assistindex/viewall',
        name: 'AssistViewAll',
        component: AssistViewAll
      }, {
        path: '/assistindex/createuser',
        name: 'AssistCreateUser',
        component: CreateUser
      }, {
        path: '/assistindex/manageuser',
        name: 'AssistManageUser',
        component: ManageUser
      }]
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/index/home',
      children: [{
        path: '/index/home',
        name: 'Home',
        component: Home
      },
      //  {
      //   path: '/index/personal',
      //   name: 'Personal',
      //   component: Personal
      // },
      {
        path: '/index/create',
        name: 'Create',
        component: Create
      }, {
        path: '/index/findall',
        name: 'FindAll',
        component: FindAll
      }, {
        path: '/index/check',
        name: 'Check',
        component: Check
      }, {
        path: '/index/history',
        name: 'History',
        component: History
      }, {
        path: '/index/viewall',
        name: 'ViewAll',
        component: ViewAll
      }, {
        path: '/index/createuser',
        name: 'CreateUser',
        component: CreateUser
      }, {
        path: '/index/manageuser',
        name: 'ManageUser',
        component: ManageUser
      }]
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
})
