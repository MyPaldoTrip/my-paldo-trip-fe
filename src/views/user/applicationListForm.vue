<template>
  <table v-if="getData.data" class="user-table">
    <thead>
    <tr>
      <th>신청서 ID</th>
      <th>이메일</th>
      <th>이름</th>
      <th>제목</th>
      <th>확인 여부</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(data, index) in getData.data" :key="index">
      <td>{{ data.applicationId }}</td>
      <router-link :to="`/appGetForm/${data.applicationId}`">
        <td>{{ data.email }}</td>
      </router-link>
      <td>{{ data.username }}</td>
      <td>{{ data.title }}</td>
      <td>{{ data.verified }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {onMounted, reactive} from "vue";
import axios from "axios";

export default {
  setup() {
    const getData = reactive({
      data: ''
    })
    const getList = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/users/application',
            {headers: {Authorization: localStorage.getItem('Authorization')}})
        getData.data = res.data.data
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }

    }
    onMounted(async () => {
      await getList()
    })
    return {
      getData
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