<template>
  <div>
    <h2>첨부 파일 목록</h2>
    <ul>

      <li v-for="file in courseFiles" :key="file.id">
        <img class="image" :src="file.FileURL" alt="여행지 이미지">
        <button class="btn btn-outline-danger" @click="deleteCourseFile(file.CourseFileId)">Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const courseFiles = ref([]);
    const courseId = route.params.courseId;
    const Authorization = localStorage.getItem('Authorization');
    const fetchCourseFiles = () => {
      axios.get(`/api/v1/courses/${courseId}/files`, {
        headers: {
          'Authorization': Authorization
        }
      })
      .then(response => {
        courseFiles.value = response.data.data;
        console.log(response)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    const deleteCourseFile = (fileId) => {
      axios.delete(`/api/v1/courses/${courseId}/files/${fileId}`, {
        headers: {
          'Authorization': Authorization
        }
      })
      .then(response => {
        console.log('File Deleted:', response.data);
        alert('정상적으로 처리되었습니다.')
        fetchCourseFiles();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('error')
      });
    };

    onMounted(fetchCourseFiles);

    return {
      courseFiles,
      deleteCourseFile
    };
  }
};
</script>
