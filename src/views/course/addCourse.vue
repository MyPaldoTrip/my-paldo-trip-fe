<template>

  <div class="form">
    <div class="mb-3">
      <label class="form-label">제목</label>
      <input v-model="title" class="form-control" placeholder="제목을 입력해주세요" type="text">
    </div>
    <div class="mb-3">
      <label class="form-label">도시 이름</label>
      <input v-model="cityName" class="form-control" placeholder="등록된 도시를 입력해주세요" type="text">
    </div>
    <div class="mb-3">
      <label class="form-label">연관된 여행 정보</label>
      <input v-model="relatedTripNames" class="form-control" placeholder="등록된 여행 정보를 입력해주세요 ex) 제주민속,와랑와랑" type="text">
    </div>
    <div class="mb-3" @submit.prevent="submitForm">
      <label class="form-label">내용</label>
      <textarea v-model="content" class="form-control" rows="30" placeholder="내용을 입력해주세요"></textarea>
    </div>
    <div>
      <form class="input-group mb-3" @submit.prevent="handleFileUpload">
        <input class="form-control" type="file" @change="handleFileUpload">
      </form>
      <button class="btn btn-primary" type="submit" @click="submitForm">작성</button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const title = ref('');
    const content = ref('');
    const cityName = ref('');
    const file = ref(null);
    const relatedTripNames = ref('');

    const handleFileUpload = event => {
      file.value = event.target.files[0];
    };

    const submitForm = () => {

      const req = {
        title: title.value,
        content: content.value,
        cityName: cityName.value,
        tripNames: relatedTripNames.value.split(',').map(String)
      };

      const formData = new FormData();
      formData.append('req', JSON.stringify(req));
      formData.append('multipartFile', file.value);

      axios.post('/api/v1/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('Success:', response);
        alert('정상적으로 처리되었습니다')
        router.push(`/courses/${response.data.data.courseId}/test`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('error')
      });
    };

    return {
      title,
      content,
      cityName,
      relatedTripNames,
      handleFileUpload,
      submitForm
    };
  }
};
</script>
<style scoped>
.form {
  margin: auto 20% auto 20%;
}
</style>