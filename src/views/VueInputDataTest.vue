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
        const response = await axios.post('http://localhost:8080/api/v1/users/application',
            postData,
            {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWc5NzMwMDBAZ21haWwuY29tIiwiZXhwIjoxNzA1NDM4Njc5LCJpYXQiOjE3MDU0MzUwNzl9.f2KeM4alUXBUgAaVon3vXZWp6Lh1e0jIB7KCelKJ16o'}});
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