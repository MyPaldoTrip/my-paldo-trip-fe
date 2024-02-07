<template>
  <div v-if="course">
    <div class="body">
      <div class="container">
        <div class="post">
          <h1 class="title">{{ course.title }}</h1>
          <p class="date">{{ course.createdAt.substr(0, 10) }}</p>
          <div v-for="(url, index) in course.fileURL" :key="index">
            <img :src="url" alt="여행지 이미지" class="image">
            <div>
            </div>
          </div>
          <h1>{{ course.content }}</h1>
        </div>
      </div>
    </div>

    <div class="trip">
      <div v-for="(trip, index) in relatedTrips" :key="index" class="card">
        <img :src="trip.urlList[0]" alt="" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ trip.name }}</h5>
          <p class="card-text">{{ trip.description }}</p>
          <a class="btn btn-primary" @click="router().push(`/getTrip/${trip.tripId}`)">자세히 보기</a>
        </div>
      </div>
    </div>
    <div v-if="course.username === username || userRole !== 'ROLE_USER'" class="courseControl">
      <button class="btn btn-outline-warning" type="button"
              @click="router().push(`/courses/${course.courseId}/update`)">
        코스 수정
      </button>
      <button class="btn btn-outline-danger" type="button" @click="deleteCourse">코스 삭제</button>
    </div>
  </div>

</template>

<script>
import {onMounted, ref} from 'vue';
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
    const username = ref(null);
    const userRole = ref(null);
    const Authorization = localStorage.getItem('Authorization')

    const fetchCourse = () => {
      axios.get(`/api/v1/courses/${courseId}`)
      .then(response => {
        course.value = response.data.data;
        fetchRelatedTrips(course.value.relatedTripIds);
        // console.log(response.data)
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
          // console.log(response.data.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    };
    const fetchUserProfile = () => {
      axios.get('/api/v1/users', {
        headers: {
          'Authorization': Authorization
        }
      })
      .then(response => {
        username.value = response.data.data.username;
        userRole.value = response.data.data.userRole;
        // console.log('profile', response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    const deleteCourse = () => {
      axios.delete(`/api/v1/courses/${courseId}`, {
        headers: {
          'Authorization': Authorization
        }
      })
      .then(response => {
        console.log('Course deleted:', response.data);
        alert("코스가 삭제되었습니다.")
        router.push(`/courses/list`)
      })
      .catch(error => {
        console.error('Error', error);
        alert('error')
      });
    }

    onMounted(() => {
      fetchCourse();
      fetchUserProfile();
    });

    return {
      deleteCourse,
      course,
      username,
      userRole,
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

.content > p {
  margin-bottom: 1em;
  font-size: 30px;
}

.courseControl {
  float: right;
  margin: 10px 21% 15px auto;

  .btn {
    margin-left: 10px;
  }
}

.trip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: auto 15% auto 15%;
  height: 400px;
}

.card {
  width: 250px;
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

.card-img-top {
  height: 250px;
}


</style>
