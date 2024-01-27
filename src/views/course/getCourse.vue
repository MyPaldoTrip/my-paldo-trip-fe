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
    <div>
      <button type="button" @click="router().push(`/courses/${course.courseId}/update`)"
              class="btn btn-outline-warning">
        코스 수정
      </button>
    </div>
    <div>
      관련 여행정보 : {{ course.relatedTripId }}
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

    const fetchCourse = () => {
      axios.get(`/api/v1/courses/${courseId}`)
      .then(response => {
        console.log(response.data)
        course.value = response.data.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    onMounted(fetchCourse);

    return {
      course
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
</style>
