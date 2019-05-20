<template>
  <div id="weather-container">
    <div id="weather"></div>
  </div>
</template>

<script>
export default {
  props: {
    showWeather: {
      type: Boolean,
    },
    weather: {
      type: String,
    }
  }
}
</script>
