<template>
  <div>
    <form @submit.prevent="updateCity">
      <input type="text" v-model="cityUpdateReq.provinceName" placeholder="ProvinceName">
      <input type="text" v-model="cityUpdateReq.cityName" placeholder="CityName">
      <textarea v-model="cityUpdateReq.cityInfo" placeholder="CityInfo"></textarea>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const route = useRoute();
    const cityId = route.params.cityId;
    const cityUpdateReq = ref({
      provinceName : '', cityName : '',cityInfo : ''
    });

    const updateCity = () => {

      console.log(cityId)
      axios.put(`http://localhost:8080/api/v1/cities/${cityId}`, cityUpdateReq.value, {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('City updated:', response.data);
        router.push(`/cities/${cityId}`);
        alert("업데이트 성공!")
      })
      .catch(error => {
        console.error('Error:', error);
        alert("업데이트 실패!!")
      });
    };

    return {
      cityUpdateReq,
      updateCity
    };
  }
};
</script>
<style scoped>

</style>
