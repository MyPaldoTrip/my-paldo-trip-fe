<template>
  <h1 style="color: coral">회원 탈퇴하시겠습니까?</h1>
  <b-button @click="deleteUser" style="background-color: cadetblue">네 탈퇴하겠습니다.</b-button>
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
        const response = await axios.delete(`/api/v1/users`,
            {headers: {'Authorization': localStorage.getItem('Authorization')}})
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