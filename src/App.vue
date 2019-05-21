<template>
  <div id="app" :style="{backgroundImage: 'url(' + loadImage(background) + ')'}">
    <preloaded-images :preloadedImages="preloadedImages"></preloaded-images>
    <transition name="slide-right">
      <div id="container" v-show="showWidgets" v-tilt="{reverse: true, scale: 1.1}">
        <clock :showClock="showClock" :clock="clock"></clock>
        <weather :showWeather="showWeather" :temperature="temperature" :fontAwesome="fontAwesome"></weather>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import PreloadedImages from './components/PreloadedImages.vue'
import Clock from './components/Clock.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  data() {
    return {
      preloadedImages: [],
      now: null,
      roundedTime: null,
      background: '5_0',
      locale: 'da',
      timeFormat: 'LTS',
      showWidgets: false,
      showClock: true,
      clock: null,
      showWeather: true,
      temperature: 0,
      fontAwesome: {
        icon: 'exclamation-triangle'
      },
      weatherUnit: 'metric',
      city: 'Europe'
    }
  },
  components: {
    PreloadedImages,
    Clock,
    Weather,
  },
  computed: {
    ...mapState(['weather']),
    round: function() {
      return function (date, duration, method) {
        return moment(Math[method]((+date) / (-duration)) * (-duration)).locale(this.locale)
      }
    },
    convertToSeconds: function() {
      return function (seconds) {
        return seconds * 1000
      }
    },
    generateRandomNumber: function() {
      return function (minSeconds, maxSeconds) {
        return Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds)
      }
    }
  },
  created() {
    this.now = moment().locale(this.locale)
    this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil')

    this.preloadImages(96, this.convertToSeconds(3))
    this.wallpaperPropertyListener()
    this.startClockInterval(this.roundedTime, this.now, this.convertToSeconds(1))
    this.startWeatherInterval(this.city, this.weatherUnit, (this.convertToSeconds(10800) + this.generateRandomNumber(-500, 601)))
  },
  mounted() {
    this.showWidgets = true
  },
  methods: {
    loadImage(imageName) {
      return require('./assets/images/' + imageName + '.png')
    },
    preloadImages: function(numberOfImages, seconds) {
      const fromNight = moment('1_0', 'k_m').locale(this.locale)
      setTimeout(() => {
        for (let i = 1; i <= numberOfImages; i++) {
          this.preloadedImages.push(fromNight.format('k_m'))
          fromNight.add(15, 'minutes')
        }
      }, seconds)
    },
    wallpaperPropertyListener: function() {
      const self = this
      window.wallpaperPropertyListener = {
        applyUserProperties: function(properties) {
          if (properties.isClockEnabled) {
            if (properties.isClockEnabled.value) {
              self.showClock = true
            }
            else {
              self.showClock = false
            }
          }
          if (properties.isTwentyFourHour) {
            if (properties.isTwentyFourHour.value) {
              self.locale = 'da'
            } else {
              self.locale = 'en-us'
            }
          }
          if (properties.timeFormat) {
            self.timeFormat = properties.timeFormat.value
          }
          if (properties.isWeatherEnabled) {
            if (properties.isWeatherEnabled.value) {
              self.showWeather = true
            }
            else {
              self.showWeather = false
            }
          }
          if (properties.weatherUnit) {
            self.weatherUnit = properties.weatherUnit.value
            self.loadWeather(self.city, self.weatherUnit)
          }
          if (properties.weatherCity) {
            self.city = properties.weatherCity.value
            self.loadWeather(self.city, self.weatherUnit)
          }
        }
      }
    },
    startClockInterval: function(roundedTime, now, seconds) {
      this.setBackground(roundedTime)
      this.setClock(now)
      setInterval(() => {
        this.now = moment().locale(this.locale)
        this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil')

        this.setBackground(this.roundedTime)
        this.setClock(this.now)
      }, seconds)
    },
    setBackground: function(roundedTime) {
      this.background = roundedTime.format('k_m')
    },
    setClock: function(now) {
      this.clock = now.format(this.timeFormat)
    },
    loadWeather: function(city, unit) {
      this.$store.dispatch('loadWeather', {city: city, unit: unit}).then(() => {
        this.temperature = ~~this.weather.main.temp
        const weatherIcon = {icon: null}
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
      this.loadWeather(city, unit)
      setInterval(() => {
        this.loadWeather(city, unit)
      }, seconds)
    }
  }
}
</script>
