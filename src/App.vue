<template>
  <div
    id="app"
    :style="{backgroundImage: 'url(' + require('./assets/images/' + backgroundType + '/' + background + '.webp') + ')'}"
  >
    <preloaded-images></preloaded-images>
    <audio-player :properties="properties" @properties="setProperties"></audio-player>
    <vue-particles
      v-show="showParticles"
      color="#FCDEC9"
      :particleOpacity="0.2"
      :particlesNumber="40"
      shapeType="polygon"
      :particleSize="2"
      :lineLinked="false"
      :moveSpeed="1"
      :hoverEffect="false"
      :clickEffect="true"
      clickMode="repulse"
    ></vue-particles>
    <transition name="bounce">
      <div
        id="container"
        ref="container"
        v-show="showWidgets"
        :style="{right: clockWeatherPositionX  + 'vw', top: clockWeatherPositionY + 'vw', color: clockWeatherColor}"
        :class="clockWeatherTextAlignment"
        v-tilt="{reverse: true}"
      >
        <clock @background="setBackground" :properties="properties" @properties="setProperties"></clock>
        <weather :properties="properties" @properties="setProperties"></weather>
      </div>
    </transition>
  </div>
</template>

<script>
import mixins from "./mixins/mixins.js";
import PreloadedImages from "./components/PreloadedImages.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import Clock from "./components/Clock.vue";
import Weather from "./components/Weather.vue";

export default {
  name: "app",
  mixins: [mixins],
  data() {
    return {
      backgroundType: "watchtower",
      background: "5_0",
      properties: Object,
      showParticles: true,
      showWidgets: false,
      clockWeatherPositionX: 2,
      clockWeatherPositionY: 2,
      clockWeatherTextAlignment: "right",
      clockWeatherColor:
        "0.9882352941176471 0.8705882352941177 0.788235294117647"
    };
  },
  components: {
    PreloadedImages,
    AudioPlayer,
    Clock,
    Weather
  },
  watch: {
    properties: function(newProperties) {
      newProperties.backgroundType
        ? (this.backgroundType = newProperties.backgroundType.value)
        : null;
      newProperties.isParticleEnabled
        ? (this.showParticles = newProperties.isParticleEnabled.value)
        : null;
      if (newProperties.isTiltEnabled) {
        const tiltElement = this.$refs.container;
        newProperties.isTiltEnabled.value
          ? (tiltElement.vanillaTilt.settings.max = 10)
          : (tiltElement.vanillaTilt.settings.max = 0);
      }
      newProperties.clockWeatherPositionX
        ? (this.clockWeatherPositionX =
            newProperties.clockWeatherPositionX.value)
        : null;
      newProperties.clockWeatherPositionY
        ? (this.clockWeatherPositionY =
            newProperties.clockWeatherPositionY.value)
        : null;
      newProperties.clockWeatherTextAlignment
        ? (this.clockWeatherTextAlignment =
            newProperties.clockWeatherTextAlignment.value)
        : null;
      if (newProperties.clockWeatherColor) {
        let clockWeatherColor = newProperties.clockWeatherColor.value.split(
          " "
        );
        clockWeatherColor = clockWeatherColor.map(function(color) {
          return Math.ceil(color * 255);
        });
        this.clockWeatherColor = "rgb(" + clockWeatherColor + ")";
      }
    }
  },
  created() {
    this.initializeWallpaperPropertyListener();
  },
  mounted() {
    this.showWidgets = true;
  },
  methods: {
    initializeWallpaperPropertyListener() {
      window.wallpaperPropertyListener = {
        applyUserProperties: properties => {
          this.properties = properties;
        }
      };
    },
    setProperties(properties) {
      this.properties = properties;
    },
    setBackground(background) {
      this.background = background;
    }
  }
};
</script>
