<template>
  <button @click="deleteUser">회원탈퇴</button>
</template>

<script>
import axios from 'axios';
import {reactive} from "vue";
import router from "@/router";

export default {
  setup() {
    const vueState = reactive({});
    const deleteUser = async () => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/users`,
            {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnYWc5NzMwMDBAZ21haWwuY29tIiwiZXhwIjoxNzA1NDYzODM3LCJpYXQiOjE3MDU0NjAyMzd9.DGCfCZqKDM1fdv8yR4mxvqgenqI3eG8mJm3sHp6xeuM'}})
        vueState.res = response.data.data;
        console.log(response.data.data)
        alert(`response: ${response.data.data.message}`)
        router.push("/")
      } catch (error) {
        console.error(error)
        alert(`에러: ${error.message}`)
      }

    }
    return {
      deleteUser,
      vueState
    }
  }
}
</script>

<style scoped>

</style>