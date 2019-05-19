import Vue from 'vue'
import './assets/scss/styles.scss'
import './assets/fonts/Montserrat/stylesheet.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTilt from 'vue-tilt.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueTilt)

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
}).$mount('#app')
