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
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const courseUpdateReq = ref({
      title: '', content: ''
    });

    const updateCourse = () => {

      axios.put(`http://localhost:8080/api/v1/courses/${courseId}`, courseUpdateReq.value, {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
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
