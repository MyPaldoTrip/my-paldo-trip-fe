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
        <b-nav-item href="/api/v1/chat-rooms/chat-page" class="ml-auto">채팅</b-nav-item>
        <b-nav-item href="/login" class="ml-auto">로그인</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>

</template>
<script>
export default {
  name: "vueHeader",
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
