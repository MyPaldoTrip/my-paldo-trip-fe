<template>
  <div>
    <button class="btn btn-outline-danger" type="button" @click="toggleLike">
      <span v-if="likeStatus.isLiked">
      <svg class="bi bi-heart-fill" fill="currentColor" height="16" viewBox="0 0 16 16"
           width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              fill-rule="evenodd"></path>
      </svg></span>
      <span v-else><svg class="bi bi-heart" fill="currentColor" height="16"
                        viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
      </svg></span>
    </button>
  </div>

</template>

<script>
import axios from 'axios';
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";

export default {
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const likeStatus = ref(false)

    const likeCheck = () => {
      axios.get(`/api/v1/courses/${courseId}/likes`, {
        headers: {
          Authorization: localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        // console.log('like', response)
        likeStatus.value = response.data.data;
      })
      .catch(error => {
        console.error('Error', error)
      });
    };

    const toggleLike = () => {
      axios.post(`/api/v1/courses/${courseId}/likes`, {}, {
        headers: {
          Authorization: localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('Like Toggled:', response.data.data);
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
