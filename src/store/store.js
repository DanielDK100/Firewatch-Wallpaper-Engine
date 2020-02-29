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
    fetchWeatherByName({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_WEATHER_BASE_URL + '?q=' + data.name + '&units=' + data.unit + '&appid=' + data.apiKey)
          .then(r => r.data)
          .then(weather => {
            commit('SET_WEATHER', weather)
            resolve()
          })
          .catch(error => {
            reject(new Error(error))
          })
      })
    },
    fetchWeatherByCoordinates({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_WEATHER_BASE_URL + '?lat=' + data.latitude + '&lon=' + data.longitude + '&units=' + data.unit + '&appid=' + data.apiKey)
          .then(r => r.data)
          .then(weather => {
            commit('SET_WEATHER', weather)
            resolve()
          })
          .catch(error => {
            reject(new Error(error))
          })
      })
    },
    fetchWeatherById({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.VUE_APP_WEATHER_BASE_URL + '?id=' + data.id + '&units=' + data.unit + '&appid=' + data.apiKey)
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
    SET_WEATHER(state, weather) {
      state.weather = weather
    }
  }
})
