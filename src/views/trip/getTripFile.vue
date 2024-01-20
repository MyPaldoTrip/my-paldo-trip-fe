<template>
  <div class="center">
    <h2>파일 상세 정보</h2>
    <img :src="file.fileUrl" alt="Selected file">
    <button @click="deleteFile">파일 삭제</button>
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";

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

const deleteFile = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) {
    return;
  }

  try {
    await axios.delete(`http://localhost:8080/api/v1/trips/${tripId}/files/${fileId}`, {
      headers: {
        'Authorization': localStorage.getItem('Authorization'),
      },
    });

    alert('파일이 삭제되었습니다.');
    router.push(`/getTrip/${tripId}/fileList`).catch(error => {
      console.error('There was an error routing to the file list:', error);
    });
  } catch (error) {
    console.error('There was an error deleting the file:', error);
  }
};
</script>


<style scoped>
.center {
  text-align: center;
}

button {
  display: block;
  margin: 20px auto;
}

</style>