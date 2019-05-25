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
      unit: 'metric',
      city: 'Copenhagen, DK'
    }
  },
  computed: {
    ...mapState(['weather'])
  },
  watch: {
    properties: function(newProperties) {
      if (newProperties.isWeatherEnabled) {
        this.showWeather = newProperties.isWeatherEnabled.value
      }
      if (newProperties.weatherUnit) {
        this.unit = newProperties.weatherUnit.value
        this.fetchWeather(this.city, this.unit, newProperties)
      }
      if (newProperties.weatherCity) {
        this.city = newProperties.weatherCity.value
        this.fetchWeather(this.city, this.unit, newProperties)
      }
    }
  },
  created() {
    this.startWeatherInterval(this.city, this.unit, moment.duration(4, 'hours').asMilliseconds() + this.generateRandomNumber(-5, 11))
  },
  methods: {
    fetchWeather: function(city, unit, newProperties = null) {
      if (this.showWeather) {
        if (newProperties) {
          if (newProperties.weatherUnit) {
            unit = newProperties.weatherUnit.value
            this.unit = newProperties.weatherUnit.value
          }
          if (newProperties.weatherCity) {
            city = newProperties.weatherCity.value
            this.city = newProperties.weatherCity.value
          }
        }
        const weatherIcon = {icon: 'exclamation-triangle'}
        this.$store.dispatch('fetchWeather', {city: this.city, unit: this.unit}).then(() => {
          this.showWeather = true
          this.temperature = ~~this.weather.main.temp
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
            if (currentHour >= 21 || currentHour <= 5) {
              weatherIcon.icon = 'moon'
            }
            break
            case 'Clouds':
            weatherIcon.icon = 'cloud'
            break
          }
          this.fontAwesome = weatherIcon
        })
        .catch(error => {
          this.fontAwesome = weatherIcon
          this.temperature = 0
          // eslint-disable-next-line
          console.log(error)
        })
      }
    },
    startWeatherInterval: function(city, unit, duration) {
      this.fetchWeather(city, unit)
      setInterval(() => {
        this.fetchWeather(city, unit)
      }, duration)
    }
  }
}
</script>
