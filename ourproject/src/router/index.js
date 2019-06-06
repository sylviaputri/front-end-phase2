import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import TraineeDashboard from '@/components/TraineeDashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/trainee/home',
      name: 'TraineeDashboard',
      component: TraineeDashboard
    }
  ]
})
