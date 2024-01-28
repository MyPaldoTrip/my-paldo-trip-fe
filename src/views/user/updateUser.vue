<script>
import axios from 'axios';
import {onMounted, reactive} from "vue";
import router from "@/router";

export default {
  setup() {
    const postData = reactive({
      username: null,
      introduction: null,
      age: null,
      password: null,
      multipartFile: null

    });

    const uploadFile = (event) => {
      postData.multipartFile = event.target.files[0];// 파일 선택
    }
    const update = async () => {
      const formData = new FormData();
      const json = JSON.stringify({
        username: postData.username,
        introduction: postData.introduction,
        age: postData.age,
        password: postData.password
      });

      formData.append('multipartFile', postData.multipartFile); // 'file'은 서버에서 해당 파일을 받을 때 사용할 파라미터 이름입니다.
      formData.append('req', json);
      try {
        const response = await axios.put('/api/v1/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('Authorization')
          }
        });
        console.log("응답값" + response.data);
        alert("업데이트 완료!")
        router.push('/')
      } catch (error) {
        console.error(error);
      }
    }
    const fetchUser = async () => {
      const res = await axios.get(`/api/v1/users`,
          {headers: {'Authorization': localStorage.getItem('Authorization')}})
      const userId = res.data.data.userId;
      const response = await axios.get(`/api/v1/users/${userId}`)
      console.log(response.data.data)
      postData.username = response.data.data.username
      postData.introduction = response.data.data.introduction
      postData.age = response.data.data.age
      postData.password = response.data.data.password
      postData.multipartFile = response.data.data.multipartFile
    }
    onMounted(fetchUser)
    return {
      uploadFile,
      update,
      postData
    }
  }
}
</script>

<template>
  <label>유저이름</label>
  <input type="text" v-model="postData.username"/>
  <br>
  <label>소개</label>
  <input type="text" v-model="postData.introduction"/>
  <br>
  <label>나이</label>
  <input type="text" v-model="postData.age"/>
  <br>
  <label>비밀번호</label>
  <input type="text" v-model="postData.password"/>
  <br>
  <input type="file" @change="uploadFile">
  <br>
  <button @click="update">수정</button>
</template>
