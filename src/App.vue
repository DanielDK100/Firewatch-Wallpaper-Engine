<template>
  <div id="app" :style="{backgroundImage: 'url(' + loadImage(background + '.webp') + ')'}">
    <vue-particles color="#FCDEC9" :particleOpacity="0.2" :particlesNumber="40" shapeType="polygon" :particleSize="2" :lineLinked="false" :moveSpeed="1" :hoverEffect="false" :clickEffect="true" clickMode="repulse"></vue-particles>
    <preloaded-images></preloaded-images>
    <transition name="bounce">
      <div id="container" v-show="showWidgets" :class="clockWeatherPosition" v-tilt="{reverse: true}">
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
      background: '5_0',
      properties: Object,
      clockWeatherPosition: 'top-right',
      showWidgets: false
    }
  },
  components: {
    PreloadedImages,
    Clock,
    Weather
  },
  watch: {
    properties: function(newProperties) {
      if (newProperties.clockWeatherPosition) {
        this.clockWeatherPosition = newProperties.clockWeatherPosition.value
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
      this.background = background
    }
  }
}
</script>
