// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFullPage from 'vue-fullpage.js'
import BootstrapVue from 'bootstrap-vue'
import 'fullpage.js/vendors/scrolloverflow'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import LightTimeline from 'vue-light-timeline'
import StarRating from 'vue-star-rating'
import { store } from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDoubleRight, faFileSignature, faHourglassHalf, faThumbsUp, faSearch, faShapes, faSortAlphaDown, faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueFullPage)
Vue.use(BootstrapVue)
Vue.use(LightTimeline)
Vue.use(VueAxios, axios)

Vue.prototype.$axios = axios

require('./assets/styles/general.css')

library.add(faAngleDoubleRight, faFileSignature, faHourglassHalf, faThumbsUp, faSearch, faShapes, faSortAlphaDown, faPlus, faTrash, faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('star-rating', StarRating)

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
