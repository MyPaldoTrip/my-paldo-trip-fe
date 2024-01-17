<template>
  <div class="signup-container">
    <h1>로그인</h1>
    <form @submit.prevent="submitForm" class="login-form">
      <label>email:</label>
      <input type="text" v-model="postData.email" required/>

      <label>password:</label>
      <input type="text" v-model="postData.password" required/>


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
      email: '',
      password: ''
    });
    const submitForm = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/users/login', postData);
        console.log(response.headers.authorization);
        const authorization = response.headers.getAuthorization();
        localStorage.setItem('Authorization', authorization)
        alert(`response: ${response.data.message}`)
        router.push('/')
      } catch (error) {
        console.error(error);
        alert(`에러: ${error.message}`)
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
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-bottom: 5px;
  font-weight: bold;
}

.login-form input {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-form button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}
</style>