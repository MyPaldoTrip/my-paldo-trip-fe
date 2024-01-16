<template>
  <div>
    <br>
    <br>
    <h1>유저 단건 조회</h1>
    <p v-if="vueState.user">
      {{ vueState.user }}
    </p>
    <br>
    <br>

    <h1>유저 목록 조회</h1>
    <table v-if="vueState.userList" class="user-table">
      <thead>
      <tr>
        <th>유저 ID</th>
        <th>이메일</th>
        <th>유저 이름</th>
        <th>나이</th>
        <th>레벨</th>
        <th>역할</th>
        <th>쓴 리뷰 수</th>
        <th>팔로워 수</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in vueState.userList.data" :key="index">
        <td>{{ user.userId }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.level }}</td>
        <td>{{ user.userRoleValue }}</td>
        <td>{{ user.writeReviewCnt }}</td>
        <td>{{ user.followerCnt }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';
import {onMounted, reactive} from "vue";

export default {
  setup() {
    const vueState = reactive({
      user: null,
      userList: null
    });

    const getUser = async () => {
      const response = await axios.get('http://localhost:8080/api/v1/users/4')
      vueState.user = response.data.data;
      console.log(response.data.data)
    }
    const getUserList = async () => {
      const data = {
        "page": 0,
        "size": 5,
        "asc": null,
        "userSort": "LEVEL",
        "ageCondition": null,
        "levelCondition": null,
        "userRoleCondition": null,
        "followerCondition": null,
        "followingCondition": null
      }
      const response = await axios.post('http://localhost:8080/api/v1/users', data)
      vueState.userList = response.data;
      console.log(response.data.data)
    }

    onMounted(async () => {
      await getUser()
      await getUserList()
    })
    return {
      vueState
    }
  },
};
</script>
<style scoped>
.user-table {
  margin: auto;
  border-collapse: separate;
  border-spacing: 10px;
}

.user-table td {
  padding-left: 20px;
}

.user-table th {
  padding-left: 20px;
}
</style>