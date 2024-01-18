<template>
  <div class="container mt-5">
    <h1 class="mb-4">신청서 정보</h1>
    <div v-if="vueState.application" class="card">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">이메일: {{ vueState.application.email }}</li>
        <li class="list-group-item">이름: {{ vueState.application.username }}</li>
        <li class="list-group-item">제목: {{ vueState.application.title }}</li>
        <li class="list-group-item">내용: {{ vueState.application.content }}</li>
        <li class="list-group-item">확인 여부: {{ vueState.application.verified }}</li>
      </ul>
    </div>
    <br>
    <button @click="confirm(true)" style="background-color: lightblue">승인</button>
    <button @click="confirm(false)" style="background-color: pink">거절</button>
    <br>
    <router-link to="/appListForm" class="btn btn-primary mt-4">신청서 목록으로</router-link>
    <router-link to="/" class="btn btn-secondary mt-4">홈으로</router-link>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import {useRoute} from 'vue-router';
import router from "@/router";

export default {
  setup() {
    const vueState = reactive({
      application: null,
    });
    const route = useRoute(); // useRoute를 사용하여 현재 route 객체를 가져옵니다.
    const getApplication = async () => {
      const applicationId = route.params.applicationId;
      const response = await axios.get(
          `http://localhost:8080/api/v1/users/application/${applicationId}`)
      vueState.application = response.data.data;
      console.log(response.data.data)
    }
    const confirm = async (isAccepted) => {
      const confirmData = reactive({
        applicationId: vueState.application.applicationId,
        accept: isAccepted ? true : null
      })
      const res = await axios.patch('http://localhost:8080/api/v1/users/application', confirmData)
      console.log(res.data)
      if (confirmData.accept) {
        alert(vueState.application.email + " 운영자로 변경")
      } else {
        alert(vueState.application.email + " 운영자 변경 거절")
      }
      router.push("/appListForm")
    }

    getApplication()
    return {
      confirm,
      vueState,
    }
  }
}
</script>

<style scoped>

</style>