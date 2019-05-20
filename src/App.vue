<template>
  <div id="app" :style="{backgroundImage: 'url(' + loadImage(background) + ')'}">
    <preloaded-images :preloadedImages="preloadedImages"></preloaded-images>
    <transition name="slide-right">
      <div id="container" v-show="showWidgets" v-tilt="{reverse: true, scale: 1.1}">
        <clock :showClock="showClock" :clock="clock"></clock>
        <weather :showWeather="showClock" :weather="weather"></weather>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'
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
      showClock: true,
      clock: null,
      showWeather: true,
      weather: null,
      showWidgets: false,
    }
  },
  components: {
    PreloadedImages,
    Clock,
    Weather,
  },
  computed: {
    round: function() {
      return function (date, duration, method) {
        return moment(Math[method]((+date) / (-duration)) * (-duration)).locale(this.locale)
      }
    },
    convertToSeconds: function() {
      return function (seconds) {
        return seconds * 1000
      }
    }
  },
  created() {
    this.now = moment().locale(this.locale)
    this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil')

    this.preloadImages(96, this.convertToSeconds(3))
    //this.wallpaperPropertyListener() NOT WORKING
    this.startInterval(this.roundedTime, this.now, this.convertToSeconds(1))
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
      window.wallpaperPropertyListener = {
        applyUserProperties: function(properties) {
          if (properties.isClockEnabled) {
            if (properties.isClockEnabled.value) {
              this.showClock = true
            }
            else {
              this.showClock = false
            }
          }
          if (properties.isTwentyFourHour) {
            if (properties.isTwentyFourHour.value) {
              this.locale = 'da'
            } else {
              this.locale = 'en-us'
            }
          }
          if (properties.timeFormat) {
            this.timeFormat = properties.timeFormat.value
          }
        }
      }
    },
    startInterval: function(roundedTime, now, seconds) {
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
    }
  }
}
</script>
