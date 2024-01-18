<template>
  <div>

    <button @click="toggleLike">
      <span v-if="likeStatus==='좋아요'">♥x</span>
      <span v-else>♥</span>
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import {ref} from "vue";
export default {
  props: ['courseId'],
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const likeStatus = ref('좋아요')
    const toggleLike = () => {
      axios.post(`http://localhost:8080/api/v1/courses/${courseId}/likes`, {}, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGVtYWlsLmNvbSIsImV4cCI6MTcwNTU2NjQwNSwiaWF0IjoxNzA1NTYyODA1fQ.nuCBybqXSz_WWl2uF7vebHvmHdKXLYOgGATsRBQqNHA' // 실제 토큰 값으로 대체해야 합니다.
        }
      })
      .then(response => {
        console.log('Like Toggled:', response.data.data);
        likeStatus.value = response.data.data.msg;
        console.log(likeStatus)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    return {
      likeStatus,
      toggleLike
    };
  }
};
</script>
