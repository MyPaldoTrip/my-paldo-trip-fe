<template>
  <div>
    <h1>도시 생성 페이지</h1>
    <form @submit.prevent="submitForm">
      <label>
        provinceName(시/도):
        <input type="text" v-model="provinceName"/>
      </label>
      <label>
        cityName(구/동):
        <input type="text" v-model="cityName">
<!--        <button type="button" @click="duplicateCheck" style="background-color: coral">중복 체크</button>-->
      </label>
      <label>
        cityInfo(도시정보):
        <textarea v-model="cityInfo"></textarea>
      </label>
      <input type="file" @change="handleFileUpload"/>
      <button type="submit">저장</button>
    </form>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const provinceName = ref('');
    const cityName = ref('');
    const cityInfo = ref('');
    const multipartFile = ref(null);

    const handleFileUpload = event => {
      multipartFile.value = event.target.files[0];
    };

    const submitForm = () => {

      const saveJson = {
        provinceName: provinceName.value,
        cityName: cityName.value,
        cityInfo: cityInfo.value
      };

      const formData = new FormData();
      formData.append('req', JSON.stringify(saveJson));
      formData.append('multipartFile', multipartFile.value);
      console.log(multipartFile.value);
      console.log(saveJson.cityInfo);
      axios.post('/api/v1/cities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Authorization')
        }

      })

      .then(response => {
        console.log('Success:', response);
        router.push(`/cities/${response.data.data.cityId}`);
        alert("생성 완료!!")
      })
      .catch(error => {
        console.error('Error:', error);
        alert("생성 실패!!")
      });

    };

    return {
      provinceName,
      cityName,
      cityInfo,
      handleFileUpload,
      submitForm
    };
  }
};
</script>


<style scoped>

</style>
