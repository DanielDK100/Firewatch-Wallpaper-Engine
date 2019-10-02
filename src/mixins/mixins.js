import moment from 'moment'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    round: function () {
      return function (date, duration, method, locale = this.locale) {
        return moment(Math[method]((+date) / (-duration)) * (-duration)).locale(locale)
      }
    },
    generateRandomNumber: function () {
      return function (minMinutes, maxMinutes) {
        const minMinutesToMilliSeconds = moment.duration(minMinutes, 'minutes').asMilliseconds()
        const maxMinutesToMilliSeconds = moment.duration(maxMinutes, 'minutes').asMilliseconds()
        return Math.floor(Math.random() * (maxMinutesToMilliSeconds - minMinutesToMilliSeconds + 1) + minMinutesToMilliSeconds)
      }
    }
  }
}
