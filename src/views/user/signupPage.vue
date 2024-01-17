<template>
  <div class="signup-container">
    <h1>회원 가입</h1>
    <form @submit.prevent="submitForm" class="signup-form">
      <label>email:</label>
      <input type="text" v-model="postData.email" required/>

      <label>username:</label>
      <input type="text" v-model="postData.username" required/>

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
      username: '',
      password: ''
    });

    const submitForm = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/users/signup', postData);
        console.log(response.data);
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