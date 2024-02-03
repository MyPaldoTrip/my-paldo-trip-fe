<template>
  <div>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="/">
        <img src="../../assets/마이팔도트립2.png" height="250" width="250" class="logo-image"/>
        마이팔도트립
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/getTripList">여행정보</b-nav-item>
          <b-nav-item href="/courses/list">코스</b-nav-item>
          <b-nav-item href="/getUserList">유저 조회</b-nav-item>
          <b-nav-item href="/cities/list">도시 조회</b-nav-item>
          <b-nav-item href="/appListForm">등업 신청</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav>
        <b-nav-item @click="chat" class="ml-auto">채팅</b-nav-item>
        <b-nav-item href="/login" class="ml-auto" v-if="data.isLoggedIn==null">로그인</b-nav-item>

        <b-nav-item-dropdown class="ml-auto" v-else>
          <template #button-content>
            <em>{{ data.username }}</em>
          </template>

          <router-link to="/myProfile">
            <b-nav-item style="background-color: beige">내 정보</b-nav-item>
          </router-link>
          <router-link to="/deleteUser">
            <b-nav-item style="background-color: beige">회원 탈퇴</b-nav-item>
          </router-link>
          <b-nav-item @click="logout" style="background-color: beige">로그아웃</b-nav-item>

        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-navbar>
  </div>

</template>
<script>

import {reactive} from "vue";
import axios from "axios";
import router from "@/router";

export default {

  setup() {
    const data = reactive({
      isLoggedIn: localStorage.getItem('Authorization'),
      username: null,
    })
    const chat = async () => {
      const token = reactive({
        authToken: localStorage.getItem('Authorization')
      })
      window.location.href = "http://43.201.132.6:8080/api/v1/chat-rooms/chat-page/"
          + token.authToken
    }

    const getUsername = async () => {
      try {
        const response = await axios.get(`/api/v1/users`,
            {headers: {'Authorization': localStorage.getItem('Authorization')}})
        console.log(response)
        data.username = response.data.data.username
      } catch (error) {
        console.log(error)
        localStorage.removeItem('Authorization')
        data.isLoggedIn = null
        alert('로그인 유효 기간 만료로 자동 로그아웃 됩니다')
        await router.push("/")
      }
    }

    const logout = () => {
      localStorage.removeItem('Authorization')
      data.isLoggedIn = null
      alert('로그아웃 완료')
      router.push("/")
    }

    if (localStorage.getItem('Authorization') !== null) {
      getUsername()
    }

    return {
      data,
      chat,
      logout,

    }
  }
};
</script>
<style>
.header-container {
  display: flex;
  align-items: center;
}

.custom-nav {
  background-color: lightgray;
  width: 100%;
}

.text1 {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.nav-item-content {
  display: flex;
  align-items: center;
}

.nav-item {
  margin-right: 20px;
  transition: color 0.5s ease;
}

.nav-item:hover {
  font-size: 20px;
  color: #007bff; /* 호버 색상 */
}

.logo-image {
  height: 100px;
  width: 120px;
  margin-right: 20px;
}
</style>
