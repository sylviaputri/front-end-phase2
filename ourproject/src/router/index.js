import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import AdminAllModules from '@/pages/AdminAllModules'
import TraineeDashboard from '@/pages/TraineeDashboard'
import TraineeTrainerAllModules from '@/pages/TraineeTrainerAllModules'
import TraineeTrainerDetailModule from '@/pages/TraineeTrainerDetailModule.vue'
import TraineeTrainerModuleRatingReview from '@/pages/TraineeTrainerModuleRatingReview.vue'
import TraineeRequestModule from '@/pages/TraineeRequestModule.vue'

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
      path: '/admin/all-modules',
      name: 'AdminAllModules',
      component: AdminAllModules
    },
    {
      path: '/trainee/home',
      name: 'TraineeDashboard',
      component: TraineeDashboard
    },
    {
      path: '/trainee/all-module',
      alias: '/trainer/all-module',
      name: 'TraineeTrainerAllModules',
      component: TraineeTrainerAllModules
    },
    {
      path: '/trainee/detail-module',
      alias: '/trainer/detail-module',
      name: 'TraineeTrainerDetailModule',
      component: TraineeTrainerDetailModule
    },
    {
      path: '/trainee/request-module',
      name: 'TraineeRequestModule',
      component: TraineeRequestModule
    },
    {
      path: '/trainee/detail-module/rating-review-module',
      alias: '/trainer/detail-module/rating-review-module',
      name: 'TraineeTrainerModuleRatingReview',
      component: TraineeTrainerModuleRatingReview
    }
  ]
})
