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
import mixin from "../mixins/mixins.js";
import moment from "moment";

export default {
  mixins: [mixin],
  data() {
    return {
      showPreloadedImages: false,
      preloadedImages: []
    };
  },
  created() {
    this.preloadImages(
      96,
      "lake",
      moment.duration(4, "seconds").asMilliseconds()
    );
    this.preloadImages(
      96,
      "watchtower",
      moment.duration(4, "seconds").asMilliseconds()
    );
  },
  methods: {
    preloadImages: function(numberOfImages, backgroundType, duration) {
      const fromNight = moment("1_0", "k_m").locale("en-gb");
      setTimeout(() => {
        for (let i = 1; i <= numberOfImages; i++) {
          this.preloadedImages.push({
            src: fromNight.format("k_m"),
            backgroundType: backgroundType,
            alt: fromNight.format("k:m")
          });
          fromNight.add(15, "minutes");
        }
      }, duration);
    }
  }
};
</script>
