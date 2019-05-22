import moment from 'moment'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    round: function() {
      return function (date, duration, method) {
        return moment(Math[method]((+date) / (-duration)) * (-duration)).locale(this.locale)
      }
    },
    convertToSeconds: function() {
      return function (seconds) {
        return seconds * 1000
      }
    },
    generateRandomNumber: function() {
      return function (minSeconds, maxSeconds) {
        return Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds)
      }
    }
  },
  methods: {
    loadImage(imageName) {
      return require('../assets/images/' + imageName + '.png')
    }
  }
}
