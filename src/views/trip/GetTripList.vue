<template>
  <div>
    <br>
    <br>
    <h1>여행정보</h1>
    <div class="container">
      <button class="create-button" @click="createTrip">여행정보 생성</button>
      <div class="search-field">
        <label for="citySearch">도시 이름 검색:</label>
        <input id="citySearch" type="text" v-model="vueState.searchCity" placeholder="도시 이름 검색">
      </div>

      <div class="search-field">
        <label for="categorySelect">카테고리:</label>
        <select v-model="vueState.selectedCategory" @change="getTripList">
          <option value="">모든 카테고리</option>
          <option value="attraction">관광지</option>
          <option value="restaurant">맛집</option>
          <option value="festival">축제</option>
        </select>
      </div>

      <div class="search-field">
        <label for="sortSelect">정렬:</label>
        <select v-model="vueState.selectedTripSort" @change="getTripList">
          <option value="">정렬</option>
          <option value="created">생성 순</option>
          <option value="rating">평점 높은 순</option>
          <option value="reviews">리뷰 순</option>
        </select>
      </div>
    </div>
    <table v-if="vueState.tripList" class="trip-table">
      <thead>
      <tr>
        <th>여행정보 ID</th>
        <th>도시</th>
        <th>카테고리</th>
        <th>여행정보 이름</th>
        <th>평균 별점</th>
        <th>리뷰 갯수</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(trip, index) in vueState.tripList.data" :key="index" @click="goToGetTrip(trip.tripId)">
        <td>{{ trip.tripId }}</td>
        <td>{{ trip.city }}</td>
        <td>{{ categoryToKorean(trip.category) }}</td>
        <td>{{ trip.name }}</td>
        <td>{{ trip.averageRating }}</td>
        <td>{{ trip.reviews }}</td>
      </tr>
      </tbody>
    </table>
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

    const createTrip = () => {
      router.push('/createTrip')
    };

    const getTripList = async () => {
      vueState.error = null;
      try {
        const response = await axios.post('/api/v1/trips/lists', {
          "cityName": vueState.searchCity || null,
          "category": vueState.selectedCategory || null,
          "tripSort": vueState.selectedTripSort || null,
          "page": 0,
        });
        vueState.tripList = response.data;
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
  background-color: #888888;
  color: white;
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

.trip-table {
  margin: auto;
  border-collapse: separate;
  border-spacing: 10px;
}

.trip-table tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>