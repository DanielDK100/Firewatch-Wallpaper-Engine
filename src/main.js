import Vue from 'vue'
import './assets/scss/reset.scss'
import './assets/fonts/Montserrat/stylesheet.scss'
import './assets/scss/styles.scss'
import store from './store/store.js'
import VueParticles from 'vue-particles'
import VueTilt from 'vue-tilt.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle, faCloud, faBolt, faCloudRain, faSnowflake, faSmog, faWind, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.use(VueTilt)

library.add(faExclamationTriangle, faCloud, faBolt, faCloudRain, faSnowflake, faSmog, faWind, faSun, faMoon)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
