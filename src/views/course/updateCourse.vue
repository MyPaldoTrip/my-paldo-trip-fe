<template>
  <div>
    <div class="mb-3">
      <label class="form-label">수정할 제목</label>
      <input type="text" v-model="courseUpdateReq.title" class="form-control" placeholder="">
    </div>
    <div class="mb-3">
      <label class="form-label">수정할 도시정보</label>
      <input type="text" v-model="courseUpdateReq.cityName" class="form-control" placeholder="">
    </div>
    <div class="mb-3">
      <label class="form-label">수정할 여행정보</label>
      <input type="text" v-model="courseUpdateReq.tripIds" class="form-control" placeholder="">
    </div>
    <div  class="mb-3">
      <label class="form-label">수정할 내용</label>
      <textarea class="form-control" v-model="courseUpdateReq.content" rows="30"></textarea>
    </div>
    <button class="btn btn-outline-warning" @click="updateCourse">수정 완료</button>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const courseUpdateReq = ref({
      title: '', content: '', cityName:'', tripIds:[]
    });

    const fetchCourse = () => {
      axios.get(`/api/v1/courses/${courseId}`)
      .then(response => {
        courseUpdateReq.value.title = response.data.data.title;
        courseUpdateReq.value.content = response.data.data.content;
        courseUpdateReq.value.cityName = response.data.data.cityName;
        courseUpdateReq.value.tripIds = response.data.data.relatedTripId;

      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    const updateCourse = () => {
      const tripIds = courseUpdateReq.value.tripIds.split(',').map(Number);
      courseUpdateReq.value.tripIds = tripIds;
      axios.put(`/api/v1/courses/${courseId}`, courseUpdateReq.value, {
        headers: {
          'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(response => {
        console.log('Course updated:', response.data);
        alert('정상적으로 처리되었습니다.')
        router.push(`/courses/${courseId}/test`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`Error : ${error.response.data.message}`)
      });
    };

    onMounted(fetchCourse);

    return {
      courseUpdateReq,
      updateCourse
    };
  }
};
</script>
