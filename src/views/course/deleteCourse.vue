<template>
  <div>
    <button @click="deleteCourse">Delete</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  props: ['courseId'],
  methods: {
    deleteCourse() {
      const courseId = this.$route.params.courseId;
      axios.delete(`http://localhost:8080/api/v1/courses/${courseId}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGVtYWlsLmNvbSIsImV4cCI6MTcwNTU0ODIxNSwiaWF0IjoxNzA1NTQ0NjE1fQ.9Giu9cE4odgcn9gn-3HnjpDbn7u3Wn3bohOzt1WTLO8' // 실제 토큰 값으로 대체해야 합니다.
        }
      })
      .then(response => {
        console.log('Course deleted:', response.data);
        alert("파일이 삭제되었습니다.")
        router.push(`/courses/list`)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
};
</script>
