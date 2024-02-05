<template>
  <div style="background-color: beige">
    <h1 style="background-color: wheat">별점 높은 여행 정보</h1>
    <div class="card-container" v-if="vueState.tripList">
      <div class="card" v-for="(trip, index) in vueState.tripList.data" :key="index"
           @click="goToGetTrip(trip.tripId)">
        <img :src="getImageUrl(trip.fileUrlList)" alt="Default image" class="card-img">
        <div class="card-body">
          <h5 class="card-title">{{ trip.name }}</h5>
          <p class="card-text"><strong>도시: </strong>{{ trip.city }}</p>
          <p class="card-text"><strong>카테고리: </strong>{{ categoryToKorean(trip.category) }}</p>
          <p class="card-text"><strong>평점: </strong>{{ trip.averageRating }}</p>
          <p class="card-text"><strong>후기 수: </strong>{{ trip.reviews }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {onMounted, reactive, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  setup() {
    const vueState = reactive({
      searchCity: '',
      selectedCategory: '',
      selectedTripSort: '',
      trip: null,
      tripList: null,
      error: null,
    });

    const categoryToKorean = (category) => {
      switch (category) {
        case 'ATTRACTION':
          return '관광지';
        case 'RESTAURANT':
          return '맛집';
        case 'FESTIVAL':
          return '축제';
        default:
          return category;
      }
    }

    const getImageUrl = (fileUrlList) => {
      if (fileUrlList && fileUrlList.length > 0) {
        const randomIndex = Math.floor(Math.random() * fileUrlList.length);
        return fileUrlList[randomIndex];
      } else {
        return '';
      }
    };

    const createTrip = () => {
      router.push('/createTrip')
    };

    const getTripList = async () => {
      vueState.error = null;
      try {
        const response = await axios.post('/api/v1/trips/lists', {
          "cityName": null,
          "category": null,
          "tripSort": 'RATING',
          "page": 0,
          "size" : 14
        });
        vueState.tripList = response.data.data.tripListRes;
        console.log('tripRes',response)
      } catch (error) {
        vueState.error = '여행 정보를 불러오는데 실패했습니다.';
        console.error('There was an error fetching the trips:', error);
      }
    };

    const router = useRouter();
    const goToGetTrip = (tripId) => {
      router.push(`/getTrip/${tripId}`);
    };

    onMounted(() => {
      getTripList();
    })

    watch(() => [vueState.searchCity, vueState.selectedCategory], getTripList);

    return {
      getImageUrl,
      getTripList,
      vueState,
      goToGetTrip,
      categoryToKorean,
      createTrip
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
}

.search-field input, .search-field select {
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  height: 30px;
}

.create-button {
  margin: 38px 0;
  padding: 5px;
  font-size: 14px;
  height: 30px;
  border: none;
  background-color: #E8F9FD;
  color: #071952;
  cursor: pointer;
  transition: background-color .3s;
}

.create-button:hover {
  background-color: #666666;
}

.search-field {
  display: flex;
  flex-direction: column;
  margin: 10px;
  max-width: 300px;
}

.search-field label {
  margin-bottom: 5px;
}

.trip-table tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
}

.card {
  width: 18rem;
  margin: 1em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card-img {
  padding: 5px;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.card-body {
  padding: 2em;
  text-align: center;
}

.card-title {
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 1em;
}

.card-text {
  font-size: 1em;
  color: #777;
  margin-bottom: 0.5em;
}
</style>