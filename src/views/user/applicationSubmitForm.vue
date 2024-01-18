<template>
  <div class="signup-container">
    <h1>운영자 신청서 제출</h1>

    <form @submit.prevent="submitForm" class="signup-form">
      <label>제목</label>
      <input type="text" v-model="postData.title" required/>
      <br>
      <label>내용</label>
      <input type="text" v-model="postData.content" required/>
      <br>

      <button type="submit">제출 하기</button>
    </form>
  </div>
</template>

<script>
// import router from "@/router";

import {reactive} from "vue";
import axios from "axios";
import router from "@/router";

export default {
  setup() {
    const postData = reactive({
      title: '',
      content: ''
    })

    const submitForm = async () => {
      try {
        const response = await axios.post('/api/v1/users/application',
            postData, {headers: {'Authorization': localStorage.getItem('Authorization')}});
        console.log(response.data);
        alert("신청이 완료되었습니다.")
        router.push('/')
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
<style scoped>

</style>