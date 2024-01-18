<template>
  <div>
    <h2>Course Files </h2>
    <ul>

      <li v-for="file in courseFiles" :key="file.id">
        {{ file }}
        <button @click="deleteCourseFile(file.CourseFileId)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
  props: ['courseId'],
  setup() {
    const route = useRoute();
    const courseFiles = ref([]);
    const courseId = route.params.courseId;
    const fetchCourseFiles = () => {
      axios.get(`http://localhost:8080/api/v1/courses/${courseId}/files`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGVtYWlsLmNvbSIsImV4cCI6MTcwNTU2MTUxMywiaWF0IjoxNzA1NTU3OTEzfQ.z3b3nxTFUQBUxzm2VeDD4JsMMJKhIUbrgiavc0WhsQs' // 실제 토큰 값으로 대체해야 합니다.
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
      axios.delete(`http://localhost:8080/api/v1/courses/${courseId}/files/${fileId}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGVtYWlsLmNvbSIsImV4cCI6MTcwNTU2MTUxMywiaWF0IjoxNzA1NTU3OTEzfQ.z3b3nxTFUQBUxzm2VeDD4JsMMJKhIUbrgiavc0WhsQs' // 실제 토큰 값으로 대체해야 합니다.
        }
      })
      .then(response => {
        console.log('File Deleted:', response.data);
        fetchCourseFiles();
      })
      .catch(error => {
        console.error('Error:', error);
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
