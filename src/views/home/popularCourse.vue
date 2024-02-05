<template>
  <b-row style="background-color: beige">
    <h1 style="background-color: wheat">인기 코스</h1>
    <div v-for="course in courses" :key="course.id" class="col">
      <b-card>
        <router-link :to="`/courses/${course.courseId}/test`">
          <b-card-img :src="course.thumbnailUrl" alt="" class="card-img-top"/>
        </router-link>
        <b-card-body class="card-body">
          <b-card-title>{{ course.title }}</b-card-title>
        </b-card-body>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <svg class="bi bi-heart-fill" fill="red" height="16" viewBox="0 0 16 16"
                 width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                    fill-rule="evenodd"></path>
            </svg>
            {{ course.likeCount }}
            <svg class="bi bi-chat-dots" fill="currentColor" height="16" viewBox="0 0 16 16"
                 width="16" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
              <path
                  d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
            </svg>
            {{ course.commentCount }}
          </li>
          <li class="list-group-item">작성자 : {{ course.username }}(lv{{ 0 + course.level }})</li>
          <li class="list-group-item">작성일 - {{ course.createdAt.substring(0, 10) }}</li>
        </ul>
      </b-card>
    </div>
  </b-row>
</template>

<script>
import axios from "axios";
import {onMounted, ref} from "vue";

export default {

  setup() {
    const courses = ref([]);
    const searchReq = ref({
      filterByCityName: '',
      filterByFollowing: false,
      courseSort: 'LIKE'
    });

    const fetchCourses = () => {
      axios.post('/api/v1/courses/list', searchReq.value, {
        params: {
          page: 0,
          size: 4
        }, headers: {Authorization: localStorage.getItem('Authorization')}
      })
      .then(response => {
        courses.value = response.data.data.courseListResList;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('error')
      });
    };
    onMounted(fetchCourses);
    return {
      courses
    }
  }
}
</script>
<style scoped>
.col {
  height : 600px;
  margin : auto;

}
.card-img-top {
  height: 350px;
}
</style>