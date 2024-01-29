<template>
  <div class="body">
    <div class="mb-3">
      <label class="form-label">수정할 제목</label>
      <input v-model="courseUpdateReq.title" class="form-control" placeholder="" type="text">
    </div>
    <div class="mb-3">
      <label class="form-label">수정할 도시정보</label>
      <input v-model="courseUpdateReq.cityName" class="form-control" placeholder="" type="text">
    </div>
    <div class="mb-3">
      <label class="form-label">수정할 여행정보</label>
      <input v-model="courseUpdateReq.tripNames" class="form-control" placeholder="" type="text">
    </div>
    <div class="mb-3">
      <label class="form-label">수정할 내용</label>
      <textarea v-model="courseUpdateReq.content" class="form-control" rows="30"></textarea>
    </div>
    <button class="btn btn-outline-warning" @click="updateCourse">수정 완료</button>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';
import router from "@/router";

export default {
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const courseUpdateReq = ref({
      title: '', content: '', cityName: '', tripNames: ''
    });

    const fetchCourse = () => {
      axios.get(`/api/v1/courses/${courseId}`)
      .then(response => {
        console.log('getCourseRes',response.data)
        courseUpdateReq.value.title = response.data.data.title;
        courseUpdateReq.value.content = response.data.data.content;
        courseUpdateReq.value.cityName = response.data.data.cityName;
        courseUpdateReq.value.tripNames = Array.isArray(response.data.data.relatedTripNames)
            ? response.data.data.relatedTripNames.join(',')
            : response.data.data.relatedTripNames;
        console.log(courseUpdateReq.value.tripNames)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    const updateCourse = () => {
      const tripNames = courseUpdateReq.value.tripNames.split(',').map(String);
      courseUpdateReq.value.tripNames = tripNames;
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
<style scoped>
.body {
  margin: 30px 15% auto 15%;
}
</style>
