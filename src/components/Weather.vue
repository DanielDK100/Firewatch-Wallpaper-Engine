<template>
  <div id="weather-container" v-show="showWeather">
    <font-awesome-icon id="weather-icon" :icon="fontAwesome.icon"></font-awesome-icon>
    <div id="weather" v-text="temperature + ' °'"></div>
  </div>
</template>

<script>
import mixins from '../mixins/mixins.js'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  mixins: [mixins],
  props: ['properties'],
  data() {
    return {
      showWeather: true,
      temperature: 0,
      fontAwesome: {
        icon: 'exclamation-triangle'
      },
      weatherUnit: 'metric',
      city: 'Europe'
    }
  },
  computed: {
    ...mapState(['weather'])
  },
  watch: {
    properties: function(newProperties) {
      if (newProperties.isWeatherEnabled) {
        if (newProperties.isWeatherEnabled.value) {
          this.showWeather = true
        }
        else {
          this.showWeather = false
        }
      }
      if (newProperties.weatherUnit) {
        this.weatherUnit = newProperties.weatherUnit.value
        this.fetchWeather(this.city, this.weatherUnit, newProperties)
      }
      if (newProperties.weatherCity) {
        this.city = newProperties.weatherCity.value
        this.fetchWeather(this.city, this.weatherUnit, newProperties)
      }
    }
  },
  created() {
    this.startWeatherInterval(this.city, this.weatherUnit, (this.convertToSeconds(10800) + this.generateRandomNumber(-500, 601)))
  },
  methods: {
    fetchWeather: function(city, unit, newProperties = null) {
      if (newProperties) {
        if (newProperties.weatherUnit) {
          unit = newProperties.weatherUnit.value
          this.weatherUnit = unit
        }
        if (newProperties.weatherCity) {
          city = newProperties.weatherCity.value
          this.city = city
        }
      }
      this.$store.dispatch('fetchWeather', {city: city, unit: unit}).then(() => {
        this.temperature = ~~this.weather.main.temp
        const weatherIcon = {icon: null}
        const currentHour = moment().format('k')
        switch (this.weather.weather[0].main) {
          case 'Thunderstorm':
          weatherIcon.icon = 'bolt'
          break
          case 'Drizzle':
          weatherIcon.icon = 'cloud-rain'
          break
          case 'Rain':
          weatherIcon.icon = 'cloud-rain'
          break
          case 'Snow':
          weatherIcon.icon = 'snowflake'
          break
          case 'Mist':
          weatherIcon.icon = 'smog'
          break
          case 'Smoke':
          weatherIcon.icon = 'smog'
          break
          case 'Haze':
          weatherIcon.icon = 'smog'
          break
          case 'Dust':
          weatherIcon.icon = 'smog'
          break
          case 'Fog':
          weatherIcon.icon = 'smog'
          break
          case 'Sand':
          weatherIcon.icon = 'smog'
          break
          case 'Ash':
          weatherIcon.icon = 'smog'
          break
          case 'Squall':
          weatherIcon.icon = 'wind'
          break
          case 'Tornado':
          weatherIcon.icon = 'wind'
          break
          case 'Clear':
          weatherIcon.icon = 'sun'
          if (currentHour >= 22 || currentHour <= 5) {
            weatherIcon.icon = 'moon'
          }
          break
          case 'Clouds':
          weatherIcon.icon = 'cloud'
          break
        }
        this.fontAwesome = weatherIcon
      })
      .catch()
    },
    startWeatherInterval: function(city, unit, seconds) {
      this.fetchWeather(city, unit)
      setInterval(() => {
        this.fetchWeather(city, unit)
      }, seconds)
    }
  }
}
</script>
