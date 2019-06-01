<template>
  <div v-show="showPreloadedImages">
    <img v-for="preloadedImage in preloadedImages" :key="preloadedImage.src" :src="loadImage(preloadedImage.src)" :alt="preloadedImage.alt">
  </div>
</template>

<script>
import mixin from '../mixins/mixins.js'
import moment from 'moment'

export default {
  mixins: [mixin],
  data() {
    return {
      showPreloadedImages: false,
      preloadedImages: []
    }
  },
  created() {
    this.preloadImages(96, moment.duration(4, 'seconds').asMilliseconds())
  },
  methods: {
    preloadImages: function(numberOfImages, duration) {
      const fromNight = moment('1_0', 'k_m').locale('en-gb')
      setTimeout(() => {
        for (let i = 1; i <= numberOfImages; i++) {
          this.preloadedImages.push({src: fromNight.format('k_m') + '.webp', alt: fromNight.format('k:m')})
          fromNight.add(15, 'minutes')
        }
      }, duration)
    }
  }
}
</script>
