<template>
  <div>
    <form @submit.prevent="addCityFiles">
      <input type="file" @change="onFileChange">
      <button type="submit">Add Files</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";

export default {
  setup() {
    const file = ref(null);
    const route = useRoute();
    const cityId = route.params.cityId;
    const onFileChange = e => {
      file.value = e.target.files[0];
    };


    const addCityFiles = () => {
      const formData = new FormData();
      formData.append('multipartFile', file.value);

      axios.post(`http://localhost:8080/api/v1/cities/${cityId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Files added:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(cityId)
        console.log(file.value)
      });
    };

    return {
      cityId,
      onFileChange,
      addCityFiles
    };
  }
};
</script>
