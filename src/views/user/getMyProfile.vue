<template>
  <div class="container mt-5">
    <h1 class="mb-4">회원 정보</h1>
    <div v-if="vueState.user" class="card">
      <img :src="vueState.user.profileURL" alt="프로필 이미지" class="card-img-top">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">이메일: {{ vueState.user.email }}</li>
        <li class="list-group-item">사용자 이름: {{ vueState.user.username }}</li>
        <li class="list-group-item">소개: {{ vueState.user.introduction }}</li>
        <li class="list-group-item">나이: {{ vueState.user.age }}</li>
        <li class="list-group-item">레벨: {{ vueState.user.level }}</li>
      </ul>
    </div>
    <router-link to="/updateUser" class="btn btn-primary mt-4">수정하기</router-link>
    <router-link to="/" class="btn btn-secondary mt-4">홈으로</router-link>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";

export default {
  setup() {
    const vueState = reactive({
      user: null,
    });
    const getUser = async () => {
      const response = await axios.get(`/api/v1/users`,
          {headers: {'Authorization': localStorage.getItem('Authorization')}})
      const userId = response.data.data.userId;
      const res = await axios.get(`/api/v1/users/${userId}`)
      vueState.user = res.data.data;
      console.log(res.data.data)
    }
    getUser()
    return {
      vueState
    }
  }
}
</script>

<style scoped>
.card-img-top {
  height: 600px;
  object-fit: cover;
}
</style>