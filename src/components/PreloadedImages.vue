<template>
  <div id="preload-images">
    <img v-for="preloadedImage in preloadedImages" :key="preloadedImage.source" :src="loadImage(preloadedImage.source)" :alt="preloadedImage.alt">
  </div>
</template>

<script>
import mixin from '../mixins/mixins.js'
import moment from 'moment'

export default {
  mixins: [mixin],
  data() {
    return {
      preloadedImages: []
    }
  },
  created() {
    this.preloadImages(96, this.convertToSeconds(3))
  },
  methods: {
    preloadImages: function(numberOfImages, seconds) {
      const fromNight = moment('1_0', 'k_m')
      setTimeout(() => {
        for (let i = 1; i <= numberOfImages; i++) {
          this.preloadedImages.push({source: fromNight.format('k_m'), alt: fromNight.format('k:m')})
          fromNight.add(15, 'minutes')
        }
      }, seconds)
    }
  }
}
</script>
