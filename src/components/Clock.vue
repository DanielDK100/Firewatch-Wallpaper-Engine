<template>
  <div id="clock" v-show="showClock" v-text="clock"></div>
</template>

<script>
export default {
  props: {
    showClock: {
      type: Boolean,
    },
    clock: {
      type: String,
    }
  }
}
</script>
