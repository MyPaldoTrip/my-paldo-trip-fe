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

  <br>
  <div class="wrap">
    <div class="title">로그인</div>
    <a class="kakao"
       href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e7d865af6b6955f7a10c13318366d5c9&redirect_uri=http://43.200.254.60:8080/kakao-login/oauth2/code">

      <div class="kakao_i"></div>
      <div class="kakao_txt">카카오톡으로 간편로그인</div>
    </a>

  </div>
  <br>
  <br>
  <router-link to="/signup">
    <b-button>회원가입</b-button>
  </router-link>
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
        const response = await axios.post('/api/v1/users/login', postData);
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

.wrap {
  display: inline-block;
  width: 490px;
  padding: 40px 20px 20px 20px;
  background-color: #f5f6f7;
  position: relative;
  border-radius: 30px;
  box-sizing: border-box;
}

.title {
  margin: 0 auto;
  width: 240px;
  height: 44px;
  text-align: center;
  font-size: 25px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 240px auto;
  margin-bottom: 20px;
}

.kakao {
  margin-top: 15px;
  height: 60px;
  border: solid 1px #FEE500;
  background: #FEE500;
  color: #3c1d1e;
  font-size: 18px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  width: 450px;
  display: flex;
}

.kakao_txt {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding-right: 60px;
}

.kakao_i {
  background: url("../../assets/kakao_login_button.png") no-repeat;
  width: 300px;
  height: 100%;
  background-size: 90%;
  background-position: 50%;
  margin: 0 20px;
}

a {
  text-decoration: none;
}

</style>