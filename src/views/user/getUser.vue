<template>
  <div class="container mt-5" style="background-color: beige">
    <h1 class="mb-4">회원 정보</h1>
    <div v-if="vueState.user" class="card">
      <img :src="vueState.user.profileURL" alt="프로필 이미지" class="card-img-top">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">이메일: {{ vueState.user.email }}</li>
        <li class="list-group-item">사용자 이름: {{ vueState.user.username }}</li>
        <li class="list-group-item">소개: {{ vueState.user.introduction }}</li>
        <li class="list-group-item">나이: {{ vueState.user.age }}</li>
        <li class="list-group-item">레벨: {{ vueState.user.level }}</li>
        <b-card>
          <b-card-title>팔로잉 유저 {{ vueState.user.followingEntityList.size }}</b-card-title>
          <b-card-body>
            <b-card-text v-for="(user,index) in vueState.user.followingEntityList" :key="index">
              {{ index + 1 }}. 유저이름 : {{ user.username }}, 이메일 :
              <a :href="`/getUser/${user.userId}`">
                {{ user.email }}
              </a>
            </b-card-text>
          </b-card-body>
        </b-card>
        <b-card>
          <b-card-title>팔로워 유저</b-card-title>
          <b-card-body>
            <b-card-text v-for="(user,index) in vueState.user.followerEntityList" :key="index">
              {{ index + 1 }}. 유저이름 : {{ user.username }}, 이메일 :
              <a :href="`/getUser/${user.userId}`">
                {{ user.email }}
              </a>
            </b-card-text>
          </b-card-body>
        </b-card>

      </ul>
    </div>
    <b-button @click="follow">팔로우하기</b-button>
    <router-link to="/" class="btn btn-primary mt-4">홈으로</router-link>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {useRoute} from 'vue-router';

export default {
  setup() {
    const vueState = reactive({
      user: null,
      loggedUser: null,
      followed: false,
    });
    const route = useRoute(); // useRoute를 사용하여 현재 route 객체를 가져옵니다.
    const getUser = async () => {
      const userId = route.params.userId;
      const response = await axios.get(`/api/v1/users/${userId}`)
      vueState.user = response.data.data;
      console.log(response.data.data)
    }
    // const checkFollow = async () => {
    //   const response = await axios.get(`/api/v1/users`,
    //       {headers: {'Authorization': localStorage.getItem('Authorization')}})
    //   vueState.loggedUser = response.data.data;
    //   console.log(vueState.loggedUser)
    //   // if (vueState.loggedUser.followingEntityList)
    // }
    const follow = async () => {
      try {
        const userId = route.params.userId;
        const res = await axios.put(`/api/v1/users/${userId}/follow`, null,
            {headers: {'Authorization': localStorage.getItem('Authorization')}})
        alert(res.data.data.message)
      } catch (error) {
        alert(error.response.data.message)
      }

    }
    onMounted(() => {
      getUser()
    })
    return {
      vueState,
      follow,
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