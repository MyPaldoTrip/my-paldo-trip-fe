<template>
  <h1>별점 높은 여행 정보</h1>

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
    <tr v-for="(trip, index) in vueState.tripList.data" :key="index">
      <td>{{ trip.tripId }}</td>
      <td>{{ trip.city }}</td>
<!--      <td>{{ categoryToKorean(trip.category) }}</td>-->
      <td>{{ trip.name }}</td>
      <td>{{ trip.averageRating }}</td>
      <td>{{ trip.reviews }}</td>
    </tr>
    </tbody>
  </table>
  <h1>좋아요 높은 코스 정보</h1>
  <div class="course-card" v-for="course in courses" :key="course.id">
    <h3>
      <router-link :to="`/courses/${course.courseId}`">{{ course.title }}</router-link>
    </h3>
    <p>{{ course.author }}</p>
    <p>Course ID: {{ course.courseId }}</p>
  </div>
  <div>
    <div class="course-card" v-for="course in courses" :key="course.id">
      <h3>
        <router-link :to="`/courses/${course.courseId}`">{{ course.title }}</router-link>
      </h3>
      <p>{{ course.author }}</p>
      <p>Course ID: {{ course.courseId }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
 import {useRoute} from "vue-router";

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

    const getTripList = async () => {
      const route = useRoute();
      const cityName = route.params.cityName;
      vueState.error = null;
      try {
        const response = await axios.post('http://localhost:8080/api/v1/trips/lists', {
          "cityName": cityName,
          "category": null,
          "tripSort": 'RATING',
          "page": 0,
        });
        vueState.tripList = response.data;
        console.log(response.data)
      } catch (error) {
        vueState.error = '여행 정보를 불러오는데 실패했습니다.';
        console.error('There was an error fetching the trips:', error);
      }
    };
    onMounted(async () => {
      await getTripList()
    })
//코스
    const courses = ref([]);
    const searchReq = ref({
      filterByCityName: '',
      filterByFollowing: false,
      courseSort: 'LIKE'
    });
    const fetchCourses = () => {
      axios.post('http://localhost:8080/api/v1/courses/list', searchReq.value, {
        params: {
          page: 0,
          size: 5
        },
        headers: {'Authorization': localStorage.getItem('Authorization')}
      })
      .then(response => {
        courses.value = response.data.data;
        console.log(searchReq)
        console.log(courses.value)
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(searchReq)
      });
    };
    onMounted(fetchCourses);
    return {
      vueState,
      getTripList,
      courses
    }
  }
}
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
