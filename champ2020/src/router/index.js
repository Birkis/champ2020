import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/ViewProfile'
import CreateSession from '@/components/CreateSession'
import SessionList from '@/components/SessionList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },{
      path:'/viewProfile/',
      name:'ViewProfile',
      component: ViewProfile
    },
    {
      path: '/CreateSession/',
      name:'CreateSession',
      component: CreateSession
    },
    {
      path: '/SessionList/',
      name: 'SessionList',
      component: SessionList
    }

  ]
})
