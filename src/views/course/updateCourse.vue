<template>
  <div>
    <div class="mb-3">
      <label class="form-label">수정할 제목</label>
      <input type="text" v-model="courseUpdateReq.title" class="form-control" placeholder="">
    </div>
    <div @submit.prevent="updateCourse" class="mb-3">
      <label class="form-label">수정할 내용</label>
      <textarea class="form-control" v-model="courseUpdateReq.content" rows="30"></textarea>
      <button class="btn btn-outline-warning" type="submit" @click="updateCourse" >Update</button>
    </div>
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

      axios.put(`/api/v1/courses/${courseId}`, courseUpdateReq.value, {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('Course updated:', response.data);
        alert('정상적으로 처리되었습니다.')
        router.push(`/courses/${courseId}/test`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`Error : ${error.response.data.message}`)
      });
    };

    return {
      courseUpdateReq,
      updateCourse
    };
  }
};
</script>
