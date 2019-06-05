<template>
  <div id="app" :style="{backgroundImage: 'url(' + loadImage(background + '.webp') + ')'}">
    <preloaded-images></preloaded-images>
    <vue-particles color="#FCDEC9" :particleOpacity="0.2" :particlesNumber="40" shapeType="polygon" :particleSize="2" :lineLinked="false" :moveSpeed="1" :hoverEffect="false" :clickEffect="true" clickMode="repulse"></vue-particles>
    <transition name="bounce">
      <div id="container" v-show="showWidgets" :style="{right: clockWeatherPositionX  + 'vw', top: clockWeatherPositionY + 'vw'}" :class="clockWeatherTextAlignment" v-tilt="{reverse: true}">
        <clock @background="setBackground" :properties="properties" @properties="setProperties"></clock>
        <weather :properties="properties" @properties="setProperties"></weather>
      </div>
    </transition>
  </div>
</template>

<script>
import mixins from './mixins/mixins.js'
import PreloadedImages from './components/PreloadedImages.vue'
import Clock from './components/Clock.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  mixins: [mixins],
  data() {
    return {
      showWidgets: false,
      background: '5_0',
      properties: Object,
      clockWeatherPositionX: 2,
      clockWeatherPositionY: 2,
      clockWeatherTextAlignment: 'right'
    }
  },
  components: {
    PreloadedImages,
    Clock,
    Weather
  },
  watch: {
    properties: function(newProperties) {
      if (newProperties.clockWeatherPositionX) {
        this.clockWeatherPositionX = newProperties.clockWeatherPositionX.value
      }
      if (newProperties.clockWeatherPositionY) {
        this.clockWeatherPositionY = newProperties.clockWeatherPositionY.value
      }
      if (newProperties.clockWeatherTextAlignment) {
        this.clockWeatherTextAlignment = newProperties.clockWeatherTextAlignment.value
      }
    }
  },
  created() {
    this.initializeWallpaperPropertyListener()
  },
  mounted() {
    this.showWidgets = true
  },
  methods: {
    initializeWallpaperPropertyListener() {
      const self = this
      window.wallpaperPropertyListener = {
        applyUserProperties: function(properties) {
          self.properties = properties
        }
      }
    },
    setProperties(properties) {
      this.properties = properties
    },
    setBackground(background) {
      this.background = '16_15'
    }
  }
}
</script>
