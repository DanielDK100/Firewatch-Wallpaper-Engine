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
      now: null,
      clock: null,
      roundedTime: null,
      locale: 'en-gb',
      timeFormat: 'lll'
    }
  },
  watch: {
    properties: function(newProperties) {
      newProperties.isClockEnabled ? this.showClock = newProperties.isClockEnabled.value : false
      newProperties.locale ? this.locale = newProperties.locale.value : null
      newProperties.timeFormat ? this.timeFormat = newProperties.timeFormat.value : null
    }
  },
  created() {
    this.now = moment().locale(this.locale)
    this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil', 'en-gb')
    this.startClockInterval(this.roundedTime, this.now, moment.duration(1, 'seconds').asMilliseconds())
  },
  methods: {
    startClockInterval: function(roundedTime, now, duration) {
      this.setBackground(roundedTime)
      this.setClock(now)
      if (process.env.VUE_APP_TESTING == 'true') {
        duration = 300
      }
      setInterval(() => {
        if (process.env.VUE_APP_TESTING == 'true') {
          this.now = this.now.add(1, 'minutes')
        }
        else {
          this.now = moment().locale(this.locale)
        }
        this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil', 'en-gb')
        this.setBackground(this.roundedTime)
        this.setClock(this.now)
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
