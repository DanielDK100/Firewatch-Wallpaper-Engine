<template>
  <div  v-show="showWeather" id="weather-container">
    <font-awesome-icon :icon="fontAwesome.icon" size="4x"></font-awesome-icon>
    <div id="weather" v-text="temperature + ' °'"></div>
  </div>
</template>

<script>
export default {
  props: {
    showWeather: {
      type: Boolean,
    },
    fontAwesome: {
      type: Object,
    },
    temperature: {
      type: Number,
    }
  }
}
</script>
