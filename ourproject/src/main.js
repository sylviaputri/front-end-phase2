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
import { store } from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDoubleRight, faFileSignature, faHourglassHalf, faThumbsUp, faSearch, faShapes, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueFullPage)
Vue.use(BootstrapVue)

require('./assets/styles/general.css')

library.add(faAngleDoubleRight, faFileSignature, faHourglassHalf, faThumbsUp, faSearch, faShapes, faSortAlphaDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})