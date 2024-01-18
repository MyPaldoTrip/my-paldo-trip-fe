<template>
  <div>
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
      <tr v-for="(user, index) in vueState.userList.data" :key="index"
          @click="getUser(user.userId)">
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
  <br>
  <br>
  <div>
    <h1>유저 단건 조회</h1>
    <p v-if="vueState.user">
      {{ vueState.user }}
    </p>
  </div>
  <br>
  <br>

  <div>
    <h1>신청서 목록 조회</h1>
    <table v-if="vueState.application" class="user-table">
      <thead>
      <tr>
        <th>신청서 ID</th>
        <th>이메일</th>
        <th>유저 이름</th>
        <th>제목</th>
        <th>확인 여부</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(a, index) in vueState.application" :key="index">
        <td>{{ a.applicationId }}</td>
        <td>{{ a.email }}</td>
        <td>{{ a.username }}</td>
        <td>{{ a.title }}</td>
        <td>{{ a.verified }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <router-link to="/inputTest">
    <button>신청서 작성하기</button>
  </router-link>
</template>

<script>
import axios from 'axios';
import {onMounted, reactive} from "vue";

export default {
  setup() {
    const vueState = reactive({
      user: null,
      userList: null,
      application: null
    });

    const getUser = async (userId) => {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`)
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

    const getApplication = async () => {
      const response = await axios.get('http://localhost:8080/api/v1/users/application')
      vueState.application = response.data.data;
      console.log(response.data)
    }

    onMounted(async () => {
      await getUserList()
      await getApplication()
    })
    return {
      getUser,
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

.user-table tr:hover {
  background-color: #f5f5f5;
}
</style>