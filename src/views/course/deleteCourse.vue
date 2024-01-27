<template>
  <div>
    <button type="button" class="btn btn-outline-danger" @click="deleteCourse">코스 삭제</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  methods: {
    deleteCourse() {
      const courseId = this.$route.params.courseId;
      axios.delete(`/api/v1/courses/${courseId}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('Course deleted:', response.data);
        alert("코스가 삭제되었습니다.")
        router.push(`/courses/list`)
      })
      .catch(error => {
        console.error('Error:', error);
        alert('error')
      });
    }
  }
};
</script>
<style scoped>
.btn {
  float: right;
  margin-right: 21%;
}
</style>
