<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="course in courses" :key="course.id">
        <td>{{ course.courseId }}</td>
        <td>
          <!-- 제목을 클릭하면 해당 코스의 세부 정보를 보는 페이지로 이동합니다 -->
          <router-link :to="`/courses/${course.courseId}`">{{ course.title }}</router-link>
        </td>
        <td>{{ course.author }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const courses = ref([]);
    const page = ref(0);
    const size = ref(10);
    const searchReq = ref({
      "filterByFollowing": ""
    });

    const fetchCourses = () => {
      axios.post('http://localhost:8080/api/v1/courses/list', searchReq.value, {
        params: {
          page: page.value,
          size: size.value
        },
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlQGVtYWlsLmNvbSIsImV4cCI6MTcwNTQ3MjYyMywiaWF0IjoxNzA1NDY5MDIzfQ.oNDFC7z0-lAf_OvoLKjo31JQBWmqjep5J5qclfKL3HA'}
      })
      .then(response => {
        console.log(response.data)
        courses.value = response.data.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    onMounted(fetchCourses);

    return {
      courses,
      page,
      size,
      searchReq,
      fetchCourses
    };
  }
};
</script>
