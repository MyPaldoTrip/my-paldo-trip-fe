<template>
  <div>
    <form @submit.prevent="submitForm">
      <label>
        title:
        <input type="text" v-model="title"/>
      </label>
      <label>
        content:
        <textarea v-model="content"></textarea>
      </label>
      <label>
        cityName:
        <input type="text" v-model="cityName"/>
      </label>
      <input type="file" @change="handleFileUpload"/>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const title = ref('');
    const content = ref('');
    const cityName = ref('');
    const file = ref(null);

    const handleFileUpload = event => {
      file.value = event.target.files[0];
    };

    const submitForm = () => {

      const saveJson = {
        title: title.value,
        content: content.value,
        cityName: cityName.value
      };

      const formData = new FormData();
      formData.append('saveJson', JSON.stringify(saveJson));
      formData.append('multipartFile', file.value);

      axios.post('/api/v1/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization')
        }

      })
      .then(response => {
        console.log('Success:', response);
        alert('정상적으로 처리되었습니다')
        router.push(`/courses/${response.data.data.courseId}`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('error')
      });
    };

    return {
      title,
      content,
      cityName,
      handleFileUpload,
      submitForm
    };
  }
};
</script>
