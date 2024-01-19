<template>
  <div>
    <form @submit.prevent="addFiles">
      <input type="file" @change="onFileChange">
      <button type="submit">Add Files</button>
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

      axios.post(`http://localhost:8080/api/v1/courses/${courseId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Files added:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(courseId)
        console.log(file.value)
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
