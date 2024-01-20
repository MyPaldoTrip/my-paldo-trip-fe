<template>
  <div class="trip-file-list">
    <h2>파일 목록</h2>
    <ul class="image-list">
      <li v-for="file in tripFileList" :key="file.tripFileId" class="image-item">
        <router-link :to="`/getTrip/${tripId}/files/${file.tripFileId}`">
          <img :src="file.fileUrl" alt="trip file">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

const route = useRoute();
const tripId = route.params.id;
const tripFileList = reactive([]);

const getTripFileList = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/trips/${tripId}/files`, {
      headers: {
        'Authorization': localStorage.getItem('Authorization'),
      },
    });

    tripFileList.push(...response.data.data);
  } catch (error) {
    console.error('There was an error getting the trip file list:', error);
  }
};

onMounted(getTripFileList);
</script>


<style scoped>
.image-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  width: 80%;
  margin: 0 auto;
  list-style: none;
}

.image-item {
  flex: 0 0 calc(25% - 2%);
  margin: 1%;
  height: auto;
}

.image-item img {
  width: 100%;
  height: auto;
}

.image-item img:hover {
  transform: scale(1.1);
  transition: transform .2s;
}
</style>
