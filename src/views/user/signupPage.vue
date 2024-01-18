<template>
  <div class="signup-container">
    <h1>회원 가입</h1>
    <form @submit.prevent="submitForm" class="signup-form">
      <label>email:</label>
      <input type="text" v-model="postData.email" required/>

      <button type="button" @click="sendMail" style="background-color: coral">이메일로 인증 코드 발송</button>
      <br>

      <label>인증 코드</label>
      <input type="text" v-model="code.code" required/>
      <button type="button" @click="verifiedCode" style="background-color: coral">인증 코드 검증</button>

      <br>
      <label>username:</label>
      <input type="text" v-model="postData.username" required/>

      <label>password:</label>
      <input type="text" v-model="postData.password" required/>


      <button type="submit">회원 가입 하기</button>
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
      email: '',
      username: '',
      password: ''
    });
    const code = reactive({
      code: ''
    })

    const submitForm = async () => {
      try {
        const response = await axios.post('/api/v1/users/signup', postData);
        console.log(response.data);
        router.push('/')
      } catch (error) {
        console.error(error);
      }
    }
    const sendMail = async () => {
      try {
        const emailAdd = reactive({
          email: postData.email
        })
        const response = await axios.post('/api/v1/users/email', emailAdd);
        console.log(response.data);
        alert("인증 코드가 이메일로 발송 되었습니다.")
      } catch (error) {
        console.error(error);
      }
    }

    const verifiedCode = async () => {
      try {
        const codeV = reactive({
          email: postData.email,
          code: code.code
        })
        const response = await axios.post('/api/v1/users/email/verify', codeV);
        console.log(response.data);
        alert("코드 검증 성공")
      } catch (error) {
        console.error(error);
      }
    }

    return {
      verifiedCode,
      sendMail,
      postData,
      code,
      submitForm
    }
  }
}
</script>

<style scoped>
.signup-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signup-form {
  display: flex;
  flex-direction: column;
}

.signup-form label {
  margin-bottom: 5px;
  font-weight: bold;
}

.signup-form input {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.signup-form button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.signup-form button:hover {
  background-color: #0056b3;
}
</style>