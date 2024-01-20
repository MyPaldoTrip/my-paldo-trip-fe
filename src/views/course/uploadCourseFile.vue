<template>
  <div>
    <form class="input-group mb-3" @submit.prevent="addFiles">
      <input class="form-control" type="file" @change="onFileChange">
      <button class="input-group-text" type="submit">Add Files</button>
    </form>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";

export default {
  setup() {
    const file = ref(null);
    const route = useRoute();
    const courseId = route.params.courseId;
    const onFileChange = e => {
      file.value = e.target.files[0];
    };

    const addFiles = () => {
      const formData = new FormData();
      formData.append('multipartFile', file.value);

      axios.post(`/api/v1/courses/${courseId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('Files added:', response.data);
        alert('정상적으로 처리되었습니다')
      })
      .catch(error => {
        console.error('Error:', error);
        alert('error')
      });
    };

    return {
      courseId,
      onFileChange,
      addFiles
    };
  }
};
</script>
