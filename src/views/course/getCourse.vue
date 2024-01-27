<template>
  <div v-if="course">
    <div class="body">
      <div class="container">
        <div class="post">
          <h1 class="title">{{ course.title }}</h1>
          <p class="date">{{ course.createdAt.substr(0, 10) }}</p>
          <div v-for="(url, index) in course.fileURL" :key="index">
            <img class="image" :src="url" alt="여행지 이미지">
            <div>
            </div>
            <div class="content">
            </div>
          </div>
          <h1>{{ course.content }}</h1>
        </div>
      </div>
    </div>

    <div class="trip" >
        <div class="card" v-for="(trip, index) in relatedTrips" :key="index">
          <img class="card-img-top" :src="trip.urlList[0]" alt="">
          <div class="card-body">
            <h5 class="card-title">{{ trip.name }}</h5>
            <p class="card-text">{{trip.description }}</p>
            <a class="btn btn-primary" @click="router().push(`/getTrip/${trip.tripId}`)">자세히 보기</a>
          </div>
        </div>
      </div>
    <div>
      <button type="button" @click="router().push(`/courses/${course.courseId}/update`)"
              class="btn btn-outline-warning">
        코스 수정
      </button>
    </div>
  </div>

</template>

<script>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";
import router from "@/router";

export default {
  methods: {
    router() {
      return router
    }
  },
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const course = ref(null);
    const relatedTrips = ref([]);

    const fetchCourse = () => {
      axios.get(`/api/v1/courses/${courseId}`)
      .then(response => {
        course.value = response.data.data;
        fetchRelatedTrips(course.value.relatedTripId);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    const fetchRelatedTrips = (tripIds) => {
      tripIds.forEach(tripId => {
        axios.get(`/api/v1/trips/${tripId}`)
        .then(response => {
          relatedTrips.value.push(response.data.data);
          console.log(response.data.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    };

    onMounted(fetchCourse);

    return {
      course,
      relatedTrips
    };
  }
};
</script>
<style scoped>
.body {
  margin: auto 15% auto 15%;
}

.container {
  width: 80%;
  margin: 0 auto;
  padding: 5% 2%;
}

.post {
  background: #bee0ff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 2em;
}

.title {
  font-size: 4em;
  margin-bottom: 0.5em;
  color: #001767;
}

.date {
  color: #888;
  margin-bottom: 1em;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 15px;
  margin-bottom: 1em;
}

.content {
  line-height: 2;

}

.content > p {
  margin-bottom: 1em;
  font-size: 30px;
}

.btn {
  float: right;
  margin-right: 21%;
}
.trip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: auto 15% auto 15%;
}
.card {
  width: 23%;
  margin-bottom: 2%;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-primary {
  margin: 0;
}
</style>
