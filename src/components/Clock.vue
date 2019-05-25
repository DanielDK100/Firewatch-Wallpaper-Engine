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
      locale: 'da',
      showClock: false,
      now: null,
      clock: null,
      roundedTime: null,
      timeFormat: 'LTS',
      newProperties: null
    }
  },
  watch: {
    properties: function(newProperties) {
      if (newProperties.isClockEnabled) {
        if (newProperties.isClockEnabled.value) {
          this.showClock = true
        }
        else {
          this.showClock = false
        }
      }
      if (newProperties.isTwentyFourHour) {
        if (newProperties.isTwentyFourHour.value) {
          this.locale = 'da'
        }
        else {
          this.locale = 'en-us'
        }
      }
      if (newProperties.timeFormat) {
        this.timeFormat = newProperties.timeFormat.value
      }
    }
  },
  created() {
    this.now = moment().locale(this.locale)
    this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil')
    this.startClockInterval(this.roundedTime, this.now, moment.duration(1, 'seconds').asMilliseconds())
  },
  methods: {
    startClockInterval: function(roundedTime, now, duration) {
      this.setBackground(roundedTime)
      this.setClock(now)
      setInterval(() => {
        this.now = moment().locale(this.locale)
        this.roundedTime = this.round(this.now, moment.duration(15, 'minutes'), 'ceil')

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
