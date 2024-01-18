<template>
  <div class="container">
    <div class="trip-info">
      <h1>{{ vueState.trip ? vueState.trip.name : '' }}</h1>
      <p>{{ vueState.trip ? vueState.trip.city : '' }}</p>
      <p>{{ vueState.trip ? vueState.trip.category : '' }}</p>
      <p>{{ vueState.trip ? vueState.trip.description : '' }}</p>
      <div class="image-container">
        <div class="modal" v-if="vueState.selectedImage">
          <span class="close" @click="vueState.selectedImage = null">&times;</span>
          <img class="modal-content" :src="vueState.selectedImage">
        </div>

        <div class="image-wrapper" v-for="(url, index) in (vueState.trip ? vueState.trip.urlList : [])" :key="index">
          <img :src="url" alt="이미지" @click="vueState.selectedImage = url">
        </div>
      </div>
    </div>
    <div class="button-group">
      <button @click="updateTrip">수정하기</button>
      <button @click="deleteTrip">삭제하기</button>
    </div>
    <div class="review">
      <!--      후기가 들어갈 공간-->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";

export default {
  setup() {
    const vueState = reactive({
      trip: null,
      error: null,
      selectedImage: null,
    });


    const getTrip = async () => {
      const route = useRoute();
      const tripId = route.params.id;

      try {
        const response = await axios.post(`http://localhost:8080/api/v1/trips/${tripId}`)
        // console.log(response.data);
        vueState.trip = response.data.data;
      } catch (error) {
        vueState.error = '여행 정보를 불러오는데 실패했습니다.';
        console.error('There was an error fetching the trip details:', error)
      }
    };

    const updateTrip = () => {
      router.push(`/updateTrip/${vueState.trip.tripId}`);
    };

    const deleteTrip = async () => {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return;
      }

      // 삭제요청 로직

    }

    onMounted(getTrip);

    return {
      vueState,
      updateTrip,
      deleteTrip
    };
  },
};
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

.image-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

.image-wrapper {
  flex: 0 0 23%;
  margin: 1%;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

.image-wrapper img {
  width: 100%;
  height: auto;
}

.image-wrapper img:hover {
  transform: scale(1.1);
  transition: transform .2s;
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

.review {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f8f8f8;
}
</style>