import Vue from 'vue'
import './assets/scss/reset.scss'
import './assets/fonts/Montserrat/stylesheet.scss'
import './assets/scss/styles.scss'
import store from './store/store.js'
import VueTilt from 'vue-tilt.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle, faCloud, faBolt, faCloudRain, faSnowflake, faSmog, faWind, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueTilt)

library.add(faExclamationTriangle)
library.add(faCloud)
library.add(faBolt)
library.add(faCloudRain)
library.add(faSnowflake)
library.add(faSmog)
library.add(faWind)
library.add(faSun)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
