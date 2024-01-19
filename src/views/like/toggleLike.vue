<template>
  <div>

    <button @click="toggleLike"></button>
    <span v-if="likeStatus.isLiked">♡</span>
    <span v-else>♥️</span>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import {onMounted, ref} from "vue";
export default {
  props: ['courseId'],
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const likeStatus = ref(false)

    const likeCheck = () => {
      axios.get(`http://localhost:8080/api/v1/courses/${courseId}/likes`, {
        headers: {
          Authorization: localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('res',response)
        likeStatus.value = response.data.data;
        console.log('zz',response.data.data.isLiked);
      })
      .catch(error => {
        console.error('Error',error)
      });
    };

    const toggleLike = () => {
      axios.post(`http://localhost:8080/api/v1/courses/${courseId}/likes`, {}, {
        headers: {
          Authorization: localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('Like Toggled:', response.data.data);
        console.log('likeStatus',likeStatus)
        likeCheck();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    onMounted(() => likeCheck());
    return {
      likeStatus,
      toggleLike
    };
  }
};
</script>
