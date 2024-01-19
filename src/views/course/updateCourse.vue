<template>
  <div>
    <form @submit.prevent="updateCourse">
      <input type="text" v-model="courseUpdateReq.title" placeholder="Title">
      <input type="text" v-model="courseUpdateReq.content" placeholder="Content">
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const courseUpdateReq = ref({
      title : '', content : ''
    });

    const updateCourse = () => {

      axios.put(`http://localhost:8080/api/v1/courses/${courseId}`, courseUpdateReq.value, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGVtYWlsLmNvbSIsImV4cCI6MTcwNTUwNjU4NiwiaWF0IjoxNzA1NTAyOTg2fQ.0KxLYiW09dEJv21PCQViBxClk9P34xpyjsw-ElcDmtA' // 실제 토큰 값으로 대체해야 합니다.
        }
      })
      .then(response => {
        console.log('Course updated:', response.data);
        router.push(`/courses/${courseId}`);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    return {
      courseUpdateReq,
      updateCourse
    };
  }
};
</script>
