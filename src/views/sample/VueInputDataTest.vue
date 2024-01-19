<template>
  <div>
    <h1>제목과 내용 입력</h1>
    <form @submit.prevent="submitForm">
      <label>제목:</label>
      <input type="text" v-model="postData.title" required/>

      <label>내용:</label>
      <textarea v-model="postData.content" required></textarea>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {reactive} from 'vue';
import router from "@/router";

export default {
  setup() {
    const postData = reactive({
      title: '',
      content: ''
    });

    const submitForm = async () => {
      try {
        const response = await axios.post('/api/v1/users/application',
            postData,
            {headers: {'Authorization': localStorage.getItem('Authorization')}});
        console.log(response.data);
        router.push('/outputTest')
      } catch (error) {
        console.error(error);
      }
    }

    return {
      postData,
      submitForm
    }
  }
}
</script>