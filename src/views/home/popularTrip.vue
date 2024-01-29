<template>
  <b-row style="background-color: beige">
    <h1>별점 높은 여행 정보</h1>
    <div v-if="vueState.tripList">
      <div v-for="(trip, index) in vueState.tripList.data" :key="index"
           @click="goToGetTrip(trip.tripId)">
        <b-card>
          <b-card-img :src="getImageUrl(trip.fileUrlList)" alt="Default image" class="card-img"/>
          <b-card-body>
            <h5 class="card-title">{{ trip.name }}</h5>
            <p class="card-text"><strong>도시: </strong>{{ trip.city }}</p>
            <p class="card-text"><strong>카테고리: </strong>{{ categoryToKorean(trip.category) }}</p>
            <p class="card-text"><strong>평점: </strong>{{ trip.averageRating }}</p>
            <p class="card-text"><strong>후기 수: </strong>{{ trip.reviews }}</p>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </b-row>

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

</style>