<template>
  <div id="app" :style="{ backgroundImage: 'url(' + loadImage(background) + ')' }">
    <div id="preload-images">
      <img v-for="preloadedImage in preloadedImages" :src="loadImage(preloadedImage)">
    </div>
    <div id="container" v-tilt="{reverse: true, scale: 1.1}">
      <div id="clock" v-show="showClock" v-text="clock"></div>
      <div id="weather-container">
        <div id="weather"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
      clock: null,
      showClock: true,
    }
  },
  components: {
  },
  mounted() {
    this.now = moment().locale(this.locale)
    this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil')

    this.preloadImages(96, this.convertToSeconds(1))
    this.wallpaperPropertyListener()
    this.startInterval(this.roundedTime, this.now, this.convertToSeconds(1))
  },
  methods: {
    loadImage(imagePath) {
      return require('./assets/images/' + imagePath + '.png')
    },
    preloadImages: function(numberOfImages, seconds) {
      const fromNight = moment('1_0', 'k_m').locale(this.locale);
      for (let i = 1; i <= numberOfImages; i++) {
        this.preloadedImages.push(fromNight.format('k_m'))
        fromNight.add(15, 'minutes');
      }
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
      const self = this
      this.setBackground(roundedTime)
      this.setClock(now)
      setInterval(function() {
        self.now = moment().locale(self.locale)
        self.roundedTime = self.round(self.now, moment.duration(15, 'minutes'), 'ceil')

        self.setBackground(self.roundedTime)
        self.setClock(self.now)
      }, seconds)
    },
    setBackground: function(roundedTime) {
      this.background = roundedTime.format('k_m')
    },
    setClock: function(now) {
      this.clock = now.format(this.timeFormat)
    },
    round: function(date, duration, method) {
      return moment(Math[method]((+date) / (-duration)) * (-duration)).locale(this.locale)
    },
    convertToSeconds: function(seconds) {
      return seconds * 1000
    }
  }
}
</script>
