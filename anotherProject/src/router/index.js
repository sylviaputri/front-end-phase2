import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import AdminAllModules from '@/pages/AdminAllModules'
import AdminAllClasses from '@/pages/AdminAllClasses'
import AdminRequestModules from '@/pages/AdminRequestModule'
import AdminRequestClass from '@/pages/AdminRequestClass'
import AdminAllTrainersTrainees from '@/pages/AdminAllTrainersTrainees'
import AdminModuleCategories from '@/pages/AdminModuleCategories'
import AdminHistoryAllClasses from '@/pages/AdminHistoryAllClasses'
import AdminDetailModule from '@/pages/AdminDetailModule'
import AdminDetailClass from '@/pages/AdminDetailClass'
import AdminClassList from '@/pages/AdminClassList'
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
import TrainerClassGradeList from '@/pages/TrainerClassGradeList'
import Profile from '@/components/Profile'
import TraineeFollowedClass from '@/components/TraineeFollowedClass'
import MyRequestClass from '@/components/MyRequestClass'
import MyRequestModule from '@/components/MyRequestModule'
import TraineeHistory from '@/components/TraineeHistory'
import TrainerMyRatingReview from '@/components/TrainerMyRatingReview'
import TrainerHistory from '@/components/TrainerHistory'

Vue.use(Router)

function logout (next) {
  localStorage.removeItem('roleSwitch')
  localStorage.removeItem('role')
  next('/')
}

function guard (to, from, next) {
  switch (to.meta.permission) {
    case 'ADMIN':
      if (localStorage.role === 'ADMIN') {
        next()
      } else {
        logout(next)
      }
      break
    case 'TRAINER':
      if (localStorage.role === 'TRAINER' && localStorage.roleSwitch === 'TRAINER') {
        next()
      } else {
        logout(next)
      }
      break
    case 'TRAINEE':
      if (localStorage.role === 'TRAINEE' || localStorage.roleSwitch === 'TRAINEE') {
        next()
      } else {
        logout(next)
      }
      break
    default:
      logout(next)
      break
  }
}

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
      component: AdminAllModules,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/all-classes',
      name: 'AdminAllClasses',
      component: AdminAllClasses,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/request-module',
      name: 'AdminRequestModules',
      component: AdminRequestModules,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/request-class',
      name: 'AdminRequestClass',
      component: AdminRequestClass,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/all-trainers-and-trainees',
      name: 'AdminAllTrainersTrainees',
      component: AdminAllTrainersTrainees,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/module-categories',
      name: 'AdminModuleCategories',
      component: AdminModuleCategories,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/history-all-classes',
      name: 'AdminHistoryAllClasses',
      component: AdminHistoryAllClasses,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/all-modules/detail-module/:moduleId',
      name: 'AdminDetailModule',
      component: AdminDetailModule,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/all-classes/detail-class/:classId',
      name: 'AdminDetailClass',
      component: AdminDetailClass,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/all-modules/detail-module/:moduleId/class-list',
      name: 'AdminClassList',
      component: AdminClassList,
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/admin/history-all-classes/:classId/grade-list',
      component: TrainerClassGradeList,
      name: 'AdminClassGradeList',
      beforeEnter: guard,
      meta: {
        permission: 'ADMIN'
      }
    },
    {
      path: '/trainee/home',
      name: 'TraineeDashboard',
      component: TraineeDashboard,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINEE'
      }
    },
    {
      path: '/trainee/all-module',
      name: 'TraineeAllModules',
      component: TraineeTrainerAllModules,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINEE'
      }
    },
    {
      path: '/trainer/all-module',
      name: 'TrainerAllModules',
      component: TraineeTrainerAllModules,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      }
    },
    {
      path: '/trainee/detail-module/:moduleId',
      name: 'TraineeDetailModule',
      component: TraineeTrainerDetailModule,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINEE'
      }
    },
    {
      path: '/trainer/detail-module/:moduleId',
      name: 'TrainerDetailModule',
      component: TraineeTrainerDetailModule,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      }
    },
    {
      path: '/trainee/request-module',
      name: 'TraineeRequestModule',
      component: TraineeRequestModule,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINEE'
      }
    },
    {
      path: '/trainee/request-class',
      name: 'TraineeRequestClass',
      component: TraineeRequestClass,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINEE'
      }
    },
    {
      path: '/trainee/detail-module/:moduleId/rating-review-module',
      name: 'TraineeModuleRatingReview',
      component: TraineeTrainerModuleRatingReview,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINEE'
      }
    },
    {
      path: '/trainer/detail-module/:moduleId/rating-review-module',
      name: 'TrainerModuleRatingReview',
      component: TraineeTrainerModuleRatingReview,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      }
    },
    {
      path: '/trainee/my-account',
      name: 'TraineeMyAccount',
      component: TraineeTrainerMyAccount,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINEE'
      },
      children: [
        {
          path: 'profile',
          component: Profile,
          name: 'TraineeProfile',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINEE'
          }
        },
        {
          path: 'my-class',
          component: TraineeFollowedClass,
          name: 'TraineeFollowedClass',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINEE'
          }
        },
        {
          path: 'request-module',
          component: MyRequestModule,
          name: 'MyRequestModule',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINEE'
          }
        },
        {
          path: 'request-class',
          component: MyRequestClass,
          name: 'MyRequestClass',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINEE'
          }
        },
        {
          path: 'my-history',
          component: TraineeHistory,
          name: 'TraineeHistory',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINEE'
          }
        }
      ]
    },
    {
      path: '/trainer/my-account',
      name: 'TrainerMyAccount',
      component: TraineeTrainerMyAccount,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      },
      children: [
        {
          path: 'profile',
          component: Profile,
          name: 'TrainerProfile',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINER'
          }
        },
        {
          path: 'my-rating-review',
          component: TrainerMyRatingReview,
          name: 'TrainerMyRatingReview',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINER'
          }
        },
        {
          path: 'my-train-history',
          component: TrainerHistory,
          name: 'TrainerHistory',
          beforeEnter: guard,
          meta: {
            permission: 'TRAINER'
          }
        }
      ]
    },
    {
      path: '/trainer/opened-class',
      name: 'TrainerOpenedClass',
      component: TrainerOpenedClass,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      }
    },
    {
      path: '/trainer/closed-class',
      name: 'TrainerClosedClass',
      component: TrainerClosedClass,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      }
    },
    {
      path: '/trainer/request-class',
      name: 'TrainerRequestClass',
      component: TrainerRequestClass,
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      }
    },
    {
      path: '/trainer/my-account/my-train-history/:classId/grade-list',
      component: TrainerClassGradeList,
      name: 'TrainerClassGradeList',
      beforeEnter: guard,
      meta: {
        permission: 'TRAINER'
      }
    }
  ]
})
