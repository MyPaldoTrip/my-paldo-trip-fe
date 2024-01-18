<template>
  <div>
    <h1>여행정보 생성</h1>
    <form @submit.prevent="submitForm">
      <div class="input-field">
        <label for="cityId">도시 ID:</label>
        <input id="cityId" type="text" v-model="vueState.cityId" required>
      </div>

      <div class="input-field">
        <label for="category">카테고리:</label>
        <select id="category" v-model="vueState.category" required>
          <option value="">카테고리 선택</option>
          <option value="attraction">관광지</option>
          <option value="restaurant">맛집</option>
          <option value="festival">축제</option>
        </select>
      </div>

      <div class="input-field">
        <label for="name">여행정보 이름:</label>
        <input id="tripName" type="text" v-model="vueState.name" required>
      </div>

      <div class="input-field">
        <label for="description">여행정보 설명:</label>
        <textarea id="description" v-model="vueState.description" required></textarea>
      </div>

      <div class="input-field">
        <label for="tripFile">여행정보 파일:</label>
        <input id="tripFile" type="file" @change="onFileChange">
      </div>

      <button type="submit">생성</button>
    </form>
  </div>
</template>


<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";


const vueState = ref({
  cityId: '',
  category: '',
  name: '',
  description: '',
  tripFile: null,
});


const router = useRouter();

const onFileChange = (e) => {
  vueState.value.tripFile = e.target.files[0]
};

const submitForm = async () => {
  try {
    console.log(vueState.value);
    const formData = new FormData();
    formData.append('req', JSON.stringify({
      "cityId": vueState.value.cityId,
      "category": vueState.value.category,
      "name": vueState.value.name,
      "description": vueState.value.description,
    }));
    formData.append('multipartFile', vueState.value.tripFile);

    await axios.post('http://localhost:8080/api/v1/trips', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('Authorization')
      },
    }).then(response => {
      console.log(response)
      alert(response.data.message);
    })

    router.push('/getTripList');
  } catch (error) {
    console.error('There was an error creating the trip:', error.response);
    alert(error.response.data.message);
  }
};
</script>


<style scoped>
.input-field {
  margin-bottom: 20px;
}

.input-field label {
  display: block;
  margin-bottom: 5px;
}

input, select, txtarea {
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 14px;
}

button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>