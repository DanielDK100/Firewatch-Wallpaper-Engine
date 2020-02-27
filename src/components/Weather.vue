<template>
  <div id="weather-container" v-show="showWeather">
    <font-awesome-icon id="weather-icon" :icon="fontAwesome.icon"></font-awesome-icon>
    <div id="temperature" v-text="temperature + ' °'"></div>
    <div id="city-name" v-show="showCityName" v-text="cityName"></div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins.js";
import moment from "moment";
import { mapState } from "vuex";

export default {
  mixins: [mixins],
  props: ["properties"],
  data() {
    return {
      showWeather: false,
      fontAwesome: {
        icon: "exclamation-triangle"
      },
      temperature: 0,
      showCityName: true,
      cityName: null,
      unit: "metric",
      cityObject: {
        type: "name",
        name: "London, UK",
        latitude: 51.5073,
        longitude: -0.1277,
        id: 2643743
      }
    };
  },
  computed: {
    ...mapState(["weather"])
  },
  watch: {
    properties: function(newProperties) {
      newProperties.isWeatherEnabled
        ? (this.showWeather = newProperties.isWeatherEnabled.value)
        : null;
      newProperties.weatherUnit
        ? (this.unit = newProperties.weatherUnit.value)
        : null;
      newProperties.weatherFetchByType
        ? (this.cityObject.type = newProperties.weatherFetchByType.value)
        : null;
      newProperties.weatherName
        ? (this.cityObject.name = newProperties.weatherName.value)
        : null;
      newProperties.weatherLatitude
        ? (this.cityObject.latitude = newProperties.weatherLatitude.value)
        : null;
      newProperties.weatherLongitude
        ? (this.cityObject.longitude = newProperties.weatherLongitude.value)
        : null;
      newProperties.weatherId
        ? (this.cityObject.id = newProperties.weatherId.value)
        : null;
      newProperties.isCityNameShown
        ? (this.showCityName = newProperties.isCityNameShown.value)
        : null;
      this.fetchWeather();
    }
  },
  created() {
    this.startWeatherInterval(
      moment.duration(3, "hours").asMilliseconds() +
        this.generateRandomNumber(-5, 11)
    );
  },
  methods: {
    fetchWeather: function() {
      if (this.showWeather) {
        switch (this.cityObject.type) {
          case "name":
            this.$store
              .dispatch("fetchWeatherByName", {
                name: this.cityObject.name,
                unit: this.unit
              })
              .then(() => {
                this.showWeather = true;
                this.temperature = ~~this.weather.main.temp;
                this.cityName = this.weather.name;
                this.setWeatherIcon(this.weather.weather[0].main);
              })
              .catch(error => {
                this.temperature = "N/A";
                this.cityName = null;
                // eslint-disable-next-line
                console.log(error);
              });
            break;
          case "coordinates":
            this.$store
              .dispatch("fetchWeatherByCoordinates", {
                latitude: this.cityObject.latitude,
                longitude: this.cityObject.longitude,
                unit: this.unit
              })
              .then(() => {
                this.showWeather = true;
                this.temperature = ~~this.weather.main.temp;
                this.cityName = this.weather.name;
                this.setWeatherIcon(this.weather.weather[0].main);
              })
              .catch(error => {
                this.temperature = "N/A";
                this.cityName = null;
                // eslint-disable-next-line
                console.log(error);
              });
            break;
          case "id":
            this.$store
              .dispatch("fetchWeatherById", {
                id: this.cityObject.id,
                unit: this.unit
              })
              .then(() => {
                this.showWeather = true;
                this.temperature = ~~this.weather.main.temp;
                this.cityName = this.weather.name;
                this.setWeatherIcon(this.weather.weather[0].main);
              })
              .catch(error => {
                this.temperature = "N/A";
                this.cityName = null;
                // eslint-disable-next-line
                console.log(error);
              });
            break;
        }
      }
    },
    setWeatherIcon: function(icon) {
      const currentHour = moment().format("k");
      switch (icon) {
        case "Thunderstorm":
          this.fontAwesome.icon = "bolt";
          break;
        case "Drizzle":
          this.fontAwesome.icon = "cloud-rain";
          break;
        case "Rain":
          this.fontAwesome.icon = "cloud-rain";
          break;
        case "Snow":
          this.fontAwesome.icon = "snowflake";
          break;
        case "Mist":
          this.fontAwesome.icon = "smog";
          break;
        case "Smoke":
          this.fontAwesome.icon = "smog";
          break;
        case "Haze":
          this.fontAwesome.icon = "smog";
          break;
        case "Dust":
          this.fontAwesome.icon = "smog";
          break;
        case "Fog":
          this.fontAwesome.icon = "smog";
          break;
        case "Sand":
          this.fontAwesome.icon = "smog";
          break;
        case "Ash":
          this.fontAwesome.icon = "smog";
          break;
        case "Squall":
          this.fontAwesome.icon = "wind";
          break;
        case "Tornado":
          this.fontAwesome.icon = "wind";
          break;
        case "Clear":
          this.fontAwesome.icon = "sun";
          if (currentHour >= 21 || currentHour <= 5) {
            this.fontAwesome.icon = "moon";
          }
          break;
        case "Clouds":
          this.fontAwesome.icon = "cloud";
          break;
      }
    },
    startWeatherInterval: function(duration) {
      setTimeout(
        () => this.fetchWeather(),
        moment.duration(1, "seconds").asMilliseconds()
      );
      setInterval(() => {
        this.fetchWeather();
      }, duration);
    }
  }
};
</script>
