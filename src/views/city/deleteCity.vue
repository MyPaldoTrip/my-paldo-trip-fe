<template>
  <div>
    <button @click="deleteCity">Delete</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  props: ['cityId'],
  methods: {
    deleteCity() {
      const cityId = this.$route.params.cityId;
      axios.delete(`http://localhost:8080/api/v1/cities/${cityId}`, {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('City deleted:', response.data);
        alert("삭제 성공.")
        router.push(`/cities/list`)
      })
      .catch(error => {
        console.error('Error:', error);
        alert("삭제 실패!")
      });
    }
  }
};
</script>

<style scoped>

</style>
