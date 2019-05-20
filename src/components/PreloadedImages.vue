<template>
  <div id="preload-images">
    <img v-for="preloadedImage in preloadedImages" :key="preloadedImage" :src="loadImage(preloadedImage)" alt="Image">
  </div>
</template>

<script>
export default {
  props: {
    preloadedImages: {
      type: Array,
    },
  },
  methods: {
    loadImage(imageName) {
      return require('../assets/images/' + imageName + '.png')
    }
  }
}
</script>
