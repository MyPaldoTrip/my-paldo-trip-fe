<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  props: {
    cityName: String,
  },
  setup(props) {
    const weatherData = ref(null);

    const fetchWeatherData = async () => {
      try {

        const response = await axios.post('/api/v1/weathers/open', {
          cityName: props.cityName
        }, {
          // headers: {
          //   'Authorization': localStorage.getItem('Authorization'),
          // },
        });
        weatherData.value = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    onMounted(() => {
      fetchWeatherData();
    });

    return {
      weatherData,
      fetchWeatherData,
    };
  },
};
</script>

<template>
  <div id="app">
    <h1>{{ cityInput }} 날씨 예보</h1>
    <div class="weather-cards" v-if="weatherData">
      <div v-for="weatherItem in weatherData.data" :key="weatherItem.date" class="weather-card">
        <h3>{{ weatherItem.date }}</h3>
        <p>날씨: {{ weatherItem.weather }}</p>
        <p>최고기온: {{ weatherItem.max_temp }}C</p>
        <p>최저기온: {{ weatherItem.min_temp }}C</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px; /* 카드 사이의 간격 설정 */
  justify-content: center; /* 가로 정렬을 가운데로 설정 */
  padding: 0 150px; /* 양 옆에 20px의 여백 설정 */
}

.weather-card {
  flex: 1;
  border: 1px solid #ccc;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
