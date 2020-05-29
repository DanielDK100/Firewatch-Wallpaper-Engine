<template>
  <div id="weather-container" v-show="showWeather">
    <font-awesome-icon :icon="weatherIcon" transform="shrink-2"></font-awesome-icon>
    <div id="temperature" v-text="temperature + '°'"></div>
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
      weatherIcon: "exclamation-triangle",
      temperature: 0,
      unit: "metric",
      cityName: null,
      showCityName: true,
      weatherApiKey: null,
      refreshId: null,
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
      newProperties.weatherApiKey
        ? (this.weatherApiKey = newProperties.weatherApiKey.value)
        : null;
      this.fetchWeather();
    },
    weatherApiKey: function() {
      clearInterval(this.refreshId);
      this.startWeatherInterval(
        this.weatherApiKey
          ? moment.duration(1, "minutes").asMilliseconds()
          : moment.duration(3, "hours").asMilliseconds() +
              this.generateRandomNumber(-5, 11)
      );
    }
  },
  methods: {
    saveWeatherData(showWeather, temperature, cityName, weatherIcon) {
      this.showWeather = showWeather;
      this.temperature = temperature;
      this.cityName = cityName;
      this.weatherIcon = weatherIcon;
    },
    catchWeatherException(temperature, cityName, error) {
      this.temperature = temperature;
      this.cityName = cityName;
      // eslint-disable-next-line
      console.log(error);
    },
    fetchWeather: function() {
      if (this.showWeather) {
        switch (this.cityObject.type) {
          case "name":
            this.$store
              .dispatch("fetchWeatherByName", {
                name: this.cityObject.name,
                unit: this.unit,
                apiKey: this.weatherApiKey
                  ? this.weatherApiKey
                  : process.env.VUE_APP_WEATHER_API_KEY
              })
              .then(() => {
                this.saveWeatherData(
                  true,
                  ~~this.weather.main.temp,
                  this.weather.name,
                  this.setWeatherIcon(this.weather.weather[0].main)
                );
              })
              .catch(error => {
                this.catchWeatherException("N/A", null, error);
              });
            break;
          case "coordinates":
            this.$store
              .dispatch("fetchWeatherByCoordinates", {
                latitude: this.cityObject.latitude,
                longitude: this.cityObject.longitude,
                unit: this.unit,
                apiKey: this.weatherApiKey
                  ? this.weatherApiKey
                  : process.env.VUE_APP_WEATHER_API_KEY
              })
              .then(() => {
                this.saveWeatherData(
                  true,
                  ~~this.weather.main.temp,
                  this.weather.name,
                  this.setWeatherIcon(this.weather.weather[0].main)
                );
              })
              .catch(error => {
                this.catchWeatherException("N/A", null, error);
              });
            break;
          case "id":
            this.$store
              .dispatch("fetchWeatherById", {
                id: this.cityObject.id,
                unit: this.unit,
                apiKey: this.weatherApiKey
                  ? this.weatherApiKey
                  : process.env.VUE_APP_WEATHER_API_KEY
              })
              .then(() => {
                this.saveWeatherData(
                  true,
                  ~~this.weather.main.temp,
                  this.weather.name,
                  this.setWeatherIcon(this.weather.weather[0].main)
                );
              })
              .catch(error => {
                this.catchWeatherException("N/A", null, error);
              });
            break;
        }
      }
    },
    setWeatherIcon: function(icon) {
      const currentHour = moment().format("k");
      const cloudRain = "cloud-rain";
      const smog = "smog";
      const wind = "wind";
      if (currentHour >= 21 || currentHour <= 5) {
        icon = "Moon";
      }
      return {
        Thunderstorm: "bolt",
        Drizzle: cloudRain,
        Rain: cloudRain,
        Snow: "snowflake",
        Mist: smog,
        Smoke: smog,
        Haze: smog,
        Dust: smog,
        Fog: smog,
        Sand: smog,
        Ash: smog,
        Squall: wind,
        Tornado: wind,
        Clear: "sun",
        Clouds: "cloud",
        Moon: "moon"
      }[icon];
    },
    startWeatherInterval: function(duration) {
      setTimeout(
        () => this.fetchWeather(),
        moment.duration(1, "seconds").asMilliseconds()
      );
      this.refreshId = setInterval(() => {
        this.fetchWeather();
      }, duration);
    }
  }
};
</script>
