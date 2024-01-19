<template>
  <div class="container">
    <div class="trip-info">
      <h1>여행정보 수정</h1>
      <form @submit.prevent="submitForm">
        <div class="input-field">
          <label for="cityId">도시 ID:</label>
          <input id="cityId" type="number" v-model="vueState.cityId" required>
        </div>


        <div class="input-field">
          <label for="category">카테고리:</label>
          <select id="category" v-model="vueState.category" required>
            <option value="">카테고리 선택</option>
            <option value="ATTRACTION">관광지</option>
            <option value="RESTAURANT">맛집</option>
            <option value="FESTIVAL">축제</option>
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

        <button type="submit">수정하기</button>
      </form>
    </div>
  </div>
</template>


<script setup>

import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

const vueState = ref({
  cityId: '',
  category: '',
  name: '',
  description: '',
});

const router = useRouter();
const route = useRoute();
const tripId = Number(route.params.id);

const fetchTrip = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/trips/${tripId}`);
    const trip = response.data.data;
    vueState.value = {...trip, cityId: Number(trip.cityId)};
  } catch (error) {
    alert(error.response.data.message)
    console.error('There was an error fetching the trip:', error);
  }
};

const submitForm = async () => {
  try {
    const updateReq = {
      cityId: vueState.value.cityId,
      category: vueState.value.category,
      name: vueState.value.name,
      description: vueState.value.description,
    };

    await axios.patch(`http://localhost:8080/api/v1/trips/${tripId}`, updateReq, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      },
    });

    router.push(`/getTrip/${tripId}`);
    alert('여행정보가 수정되었습니다.');
  } catch (error) {
    alert(error.response.data.message);
    console.error('There was an error updating the trip:', error);
  }
};

onMounted(fetchTrip);
</script>


<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.trip-info {
  text-align: center;
  margin-bottom: 50px;
}

.input-field {
  margin-bottom: 20px;
}

.input-field label {
  display: block;
  margin-bottom: 5px;
}

.input-field input,
.input-field textarea,
.input-field select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-group button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color .3s;
}

.button-group button:hover {
  background-color: #0056b3;
}
</style>