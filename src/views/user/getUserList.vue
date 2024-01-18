<template>
  <div>
    <br>
    <br>
    <h1>유저 목록 조회</h1>
    <div>
      <input type="checkbox" id="checkbox1" v-model="vueState.ascChecked">
      <label for="checkbox1">오름차순 : {{ vueState.ascChecked }}</label>
      <input type="checkbox" id="checkbox2" v-model="vueState.follower">
      <label for="checkbox2">팔로워 보기 : {{ vueState.follower }}</label>
      <input type="checkbox" id="checkbox3" v-model="vueState.following">
      <label for="checkbox3">팔로잉 보기 : {{ vueState.following }}</label>
    </div>
    <label>나이</label>
    <input type="text" id="text1" v-model="vueState.age">
    <label>레벨</label>
    <input type="text" id="text1" v-model="vueState.level">

    <select v-model="vueState.role">
      <option disabled value="">역할 별 보기</option>
      <option v-for="roleType in vueState.roleTypes" :key="roleType" :value="roleType">
        {{ roleType }}
      </option>
    </select>

    <select v-model="vueState.size">
      <option disabled value="">화면에 표시할 개수</option>
      <option v-for="size in vueState.sizeEnum" :key="size" :value="size">
        {{ size }}
      </option>
    </select>

    <select v-model="vueState.sort">
      <option disabled value="">정렬 방법</option>
      <option v-for="sort in vueState.sortEnum" :key="sort" :value="sort">
        {{ sort }}
      </option>
    </select>

    <button @click="getUserList(1)">조건 검색</button>

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
        <th>가입 일</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in vueState.userList.data" :key="index">
        <td>{{ user.userId }}</td>
        <router-link :to="`/getUser/${user.userId}`">
          <td>{{ user.email }}</td>
        </router-link>
        <td>{{ user.username }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.level }}</td>
        <td>{{ user.userRoleValue }}</td>

        <td>{{ user.writeReviewCnt }}</td>
        <td>{{ user.followerCnt }}</td>
        <td>{{ user.modified }}</td>
      </tr>
      </tbody>
    </table>

    <div>
      <button v-for="page in vueState.totalPageNumbers" :key="page" @click="getUserList(page)"
              class="center-container">
        {{ page }}
      </button>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import {onMounted, reactive} from "vue";
// import router from "@/router";

export default {
  setup() {
    const RoleType = Object.freeze({
      DEFAULT: '전체',
      ROLE_ADMIN: 'ROLE_ADMIN',
      ROLE_OPERATOR: 'ROLE_OPERATOR',
      ROLE_USER: 'ROLE_USER'
    })
    const SizeEnum = Object.freeze({
      5: 5,
      10: 10,
      20: 20
    })
    const SortEnum = Object.freeze({
      MODIFIED: 'MODIFIED',
      AGE: 'AGE',
      LEVEL: 'LEVEL',
      WRITE_REVIEW_CNT: 'WRITE_REVIEW_CNT',
      FOLLOWER_CNT: 'FOLLOWER_CNT'
    })

    const vueState = reactive({
      userList: null,
      totalPageNumbers: 5,
      page: null,
      ascChecked: false,
      follower: null,
      following: null,
      age: null,
      level: null,
      role: '전체',
      roleTypes: Object.values(RoleType),
      size: 5,
      sizeEnum: Object.values(SizeEnum),
      sort: 'MODIFIED',
      sortEnum: Object.values(SortEnum)
    })

    const getUserList = async (page) => {
      const data = {
        "page": page != null ? page - 1 : vueState.page,
        "size": vueState.size !== 5 ? vueState.size : 5,
        "asc": vueState.ascChecked !== false ? vueState.ascChecked : null,
        "userSort": vueState.sort !== 'MODIFIED' ? vueState.sort : 'MODIFIED',
        "ageCondition": vueState.age,
        "levelCondition": vueState.level,
        "userRoleCondition": vueState.role !== '전체' ? vueState.role : null,
        "followerCondition": vueState.follower === true ? vueState.follower : null,
        "followingCondition": vueState.following === true ? vueState.following : null
      }
      const response = await axios.post('/api/v1/users', data,
          {headers: {'Authorization': localStorage.getItem('Authorization')}})
      vueState.userList = response.data;
      console.log(response.data.data)
    }
    onMounted(async () => {
      await getUserList()
    })
    return {
      getUserList,
      vueState
    }
  }
}
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

.custom {
  padding-left: 20px;
}
</style>