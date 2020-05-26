<template>
  <div v-show="showPreloadedImages">
    <img
      v-for="preloadedImage in preloadedImages"
      :key="preloadedImage.alt + '_' + preloadedImage.backgroundType"
      :src="require('../assets/images/' + preloadedImage.backgroundType + '/' + preloadedImage.src + '.webp')"
      :alt="preloadedImage.alt + '_' + preloadedImage.backgroundType"
    />
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["backgroundType"],
  data() {
    return {
      showPreloadedImages: false,
      preloadedImages: []
    };
  },
  watch: {
    backgroundType: function(newBackgroundType) {
      const fourSeconds = moment.duration(4, "seconds").asMilliseconds();
      this.preloadImages(96, newBackgroundType, fourSeconds);
    }
  },
  created() {
    const fourSeconds = moment.duration(4, "seconds").asMilliseconds();
    this.preloadImages(96, this.backgroundType, fourSeconds);
  },
  methods: {
    preloadImages: function(numberOfImages, backgroundType, duration) {
      const fromNight = moment("1_0", "k_m").locale("en-gb");
      const numberArray = Array(numberOfImages)
        .fill()
        .map((_, i) => 1 + i);
      setTimeout(() => {
        numberArray.forEach(function() {
          this.preloadedImages.push({
            src: fromNight.format("k_m"),
            backgroundType: backgroundType,
            alt: fromNight.format("k:m")
          });
          fromNight.add(15, "minutes");
        }, this);
      }, duration);
    }
  }
};
</script>
