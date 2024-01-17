<template>
  <div v-if="course">
    <h2>{{ course.title }}</h2>
    <p>코스 번호: {{ course.courseId }}</p>
    <p>작성자: {{ course.author }}</p>
    <p>내용: {{ course.content }}</p>
    <div v-for="(url, index) in course.fileURL" :key="index">
      <p>파일 URL: <a :href="url" target="_blank">{{ url }}</a></p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      course: null
    };
  },
  methods: {
    fetchCourse() {
      const courseId = this.$route.params.courseId;
      axios.get(`http://localhost:8080/api/v1/courses/${courseId}`)
      .then(response => {
        console.log(response.data)
        this.course = response.data.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  },
  created() {
    this.fetchCourse();
  }
};
</script>