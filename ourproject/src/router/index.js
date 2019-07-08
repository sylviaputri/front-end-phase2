import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import AdminAllModules from '@/pages/AdminAllModules'
import AdminAddModule from '@/pages/AdminAddModule'
import AdminDetailModule from '@/pages/AdminDetailModule'
import TraineeDashboard from '@/pages/TraineeDashboard'
import TraineeTrainerAllModules from '@/pages/TraineeTrainerAllModules'
import TraineeTrainerDetailModule from '@/pages/TraineeTrainerDetailModule.vue'
import TraineeTrainerModuleRatingReview from '@/pages/TraineeTrainerModuleRatingReview.vue'
import TraineeRequestModule from '@/pages/TraineeRequestModule.vue'
import TraineeRequestClass from '@/pages/TraineeRequestClass.vue'
import TraineeTrainerMyAccount from '@/pages/TraineeTrainerMyAccount.vue'

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
      path: '/admin/add-module',
      name: 'AdminAddModule',
      component: AdminAddModule
    },
    {
      path: '/admin/detail-module',
      name: 'AdminDetailModule',
      component: AdminDetailModule
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
      path: '/trainee/request-class',
      name: 'TraineeRequestClass',
      component: TraineeRequestClass
    },
    {
      path: '/trainee/detail-module/rating-review-module',
      alias: '/trainer/detail-module/rating-review-module',
      name: 'TraineeTrainerModuleRatingReview',
      component: TraineeTrainerModuleRatingReview
    },
    {
      path: '/trainee/my-account',
      alias: '/trainer/my-account',
      name: 'TraineeTrainerMyAccount',
      component: TraineeTrainerMyAccount
    }
  ]
})
