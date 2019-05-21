import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    weather: []
  },
  actions: {
    loadWeather({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_WEATHER_BASE_URL + '?q=' + data.city + '&units=' + data.unit + '&appid=' + process.env.VUE_APP_WEATHER_API_KEY)
        .then(r => r.data)
        .then(weather => {
          commit('SET_WEATHER', weather)
          resolve()
        })
        
        .catch(error => {
          reject(new Error(error))
        })
      })
    }
  },
  mutations: {
    SET_WEATHER (state, weather) {
      state.weather = weather
    }
  }
})
