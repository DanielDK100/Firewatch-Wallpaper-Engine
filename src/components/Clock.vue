<template>
  <div id="clock" v-show="showClock" v-text="clock"></div>
</template>

<script>
import mixins from '../mixins/mixins.js'
import moment from 'moment'

export default {
  mixins: [mixins],
  props: ['properties'],
  data() {
    return {
      showClock: true,
      clock: null,
      locale: 'en-gb',
      timeFormat: 'lll'
    }
  },
  watch: {
    properties: function(newProperties) {
      newProperties.isClockEnabled ? this.showClock = newProperties.isClockEnabled.value : null
      newProperties.locale ? this.locale = newProperties.locale.value : null
      newProperties.timeFormat ? this.timeFormat = newProperties.timeFormat.value : null
    }
  },
  created() {
    const now = moment().locale(this.locale)
    const roundedTime = this.round(now, moment.duration(15, 'minutes'), 'ceil', 'en-gb')
    this.startClockInterval(roundedTime, now, moment.duration(1, 'seconds').asMilliseconds())
  },
  methods: {
    startClockInterval: function(roundedTime, now, duration) {
      this.setBackground(roundedTime)
      this.setClock(now)
      if (process.env.VUE_APP_TESTING == 'true') {
        duration = moment.duration(0.500, 'seconds').asMilliseconds()
      }
      setInterval(() => {
        if (process.env.VUE_APP_TESTING == 'true') {
          now = now.add(1, 'minutes')
        }
        else {
          now = moment().locale(this.locale)
        }
        roundedTime = this.round(now, moment.duration(15, 'minutes'), 'ceil', 'en-gb')
        this.setBackground(roundedTime)
        this.setClock(now)
      }, duration)
    },
    setClock: function(now) {
      this.clock = now.format(this.timeFormat)
    },
    setBackground: function(roundedTime) {
      this.$emit('background', roundedTime.format('k_m'))
    }
  }
}
</script>
