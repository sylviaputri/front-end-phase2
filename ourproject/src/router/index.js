import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import AdminAllModules from '@/pages/AdminAllModules'
import AdminAllClasses from '@/pages/AdminAllClasses'
import AdminRequestModules from '@/pages/AdminRequestModule.vue'
import AdminRequestClass from '@/pages/AdminRequestClass.vue'
import AdminAllTrainersTrainees from '@/pages/AdminAllTrainersTrainees.vue'
import AdminModuleCategories from '@/pages/AdminModuleCategories.vue'
import AdminAddModule from '@/pages/AdminAddModule'
import AdminDetailModule from '@/pages/AdminDetailModule'
import AdminDetailClass from '@/pages/AdminDetailClass'
import TraineeDashboard from '@/pages/TraineeDashboard'
import TraineeTrainerAllModules from '@/pages/TraineeTrainerAllModules'
import TraineeTrainerDetailModule from '@/pages/TraineeTrainerDetailModule'
import TraineeTrainerModuleRatingReview from '@/pages/TraineeTrainerModuleRatingReview'
import TraineeRequestModule from '@/pages/TraineeRequestModule'
import TraineeRequestClass from '@/pages/TraineeRequestClass'
import TraineeTrainerMyAccount from '@/pages/TraineeTrainerMyAccount'
import TrainerOpenedClass from '@/pages/TrainerOpenedClass'
import TrainerClosedClass from '@/pages/TrainerClosedClass'
import TrainerRequestClass from '@/pages/TrainerRequestClass'
import Profile from '@/components/Profile'
import TraineeFollowedClass from '@/components/TraineeFollowedClass'
import MyRequestClass from '@/components/MyRequestClass'
import MyRequestModule from '@/components/MyRequestModule'
import TraineeHistory from '@/components/TraineeHistory'
import TrainerMyRatingReview from '@/components/TrainerMyRatingReview'
import TrainerHistory from '@/components/TrainerHistory'

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
      path: '/admin/all-classes',
      name: 'AdminAllClasses',
      component: AdminAllClasses
    },
    {
      path: '/admin/request-module',
      name: 'AdminRequestModules',
      component: AdminRequestModules
    },
    {
      path: '/admin/request-class',
      name: 'AdminRequestClass',
      component: AdminRequestClass
    },
    {
      path: '/admin/all-trainers-and-trainees',
      name: 'AdminAllTrainersTrainees',
      component: AdminAllTrainersTrainees
    },
    {
      path: '/admin/module-categories',
      name: 'AdminModuleCategories',
      component: AdminModuleCategories
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
      path: '/admin/detail-class',
      name: 'AdminDetailClass',
      component: AdminDetailClass
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
      component: TraineeTrainerMyAccount,
      children: [
        {
          path: '',
          component: Profile,
          name: 'Profile'
        },
        {
          path: 'my-class',
          component: TraineeFollowedClass,
          name: 'TraineeFollowedClass'
        },
        {
          path: 'request-module',
          component: MyRequestModule,
          name: 'MyRequestModule'
        },
        {
          path: 'request-class',
          component: MyRequestClass,
          name: 'MyRequestClass'
        },
        {
          path: 'my-history',
          component: TraineeHistory,
          name: 'TraineeHistory'
        },
        {
          path: 'my-rating-review',
          component: TrainerMyRatingReview,
          name: 'TrainerMyRatingReview'
        },
        {
          path: 'my-train-history',
          component: TrainerHistory,
          name: 'TrainerHistory'
        }
      ]
    },
    {
      path: '/trainer/opened-class',
      name: 'TrainerOpenedClass',
      component: TrainerOpenedClass
    },
    {
      path: '/trainer/closed-class',
      name: 'TrainerClosedClass',
      component: TrainerClosedClass
    },
    {
      path: '/trainer/request-class',
      name: 'TrainerRequestClass',
      component: TrainerRequestClass
    }
  ]
})
