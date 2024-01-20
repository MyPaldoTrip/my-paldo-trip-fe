<template>
  <div>
    <h2>파일 상세 정보</h2>
    <img :src="file.fileUrl" alt="Selected file">
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const tripId = route.params.tripId;
const fileId = route.params.fileId;
const file = ref({});

const getTripFile = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/trips/${tripId}/files/${fileId}`, {
      headers: {
        'Authorization': localStorage.getItem('Authorization'),
      },
    });

    file.value = response.data.data;
  } catch (error) {
    console.error('There was an error getting the trip file:', error);
  }
};
onMounted(getTripFile);


</script>


<style scoped>

</style>