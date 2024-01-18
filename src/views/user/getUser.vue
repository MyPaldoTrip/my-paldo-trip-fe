<template>
  <div class="container mt-5">
    <h1 class="mb-4">회원 정보</h1>
    <div v-if="vueState.user" class="card">
      <img :src="vueState.user.profileURL" alt="프로필 이미지" class="card-img-top">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">이메일: {{ vueState.user.email }}</li>
        <li class="list-group-item">사용자 이름: {{ vueState.user.username }}</li>
        <li class="list-group-item">소개: {{ vueState.user.introduction }}</li>
        <li class="list-group-item">프로필 URL: {{ vueState.user.profileURL }}</li>
        <li class="list-group-item">나이: {{ vueState.user.age }}</li>
        <li class="list-group-item">레벨: {{ vueState.user.level }}</li>
      </ul>
    </div>
    <router-link to="/" class="btn btn-primary mt-4">홈으로</router-link>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import {useRoute} from 'vue-router';

export default {
  setup() {
    const vueState = reactive({
      user: null,
    });
    const route = useRoute(); // useRoute를 사용하여 현재 route 객체를 가져옵니다.
    const getUser = async () => {
      const userId = route.params.userId;
      const response = await axios.get(`/api/v1/users/${userId}`)
      vueState.user = response.data.data;
      console.log(response.data.data)
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
  height: 200px;
  object-fit: cover;
}
</style>