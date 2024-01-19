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
          Authorization: localStorage.getItem('Authorization')
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
