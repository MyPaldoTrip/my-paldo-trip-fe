<template>

  <div>
    <div class="course-card" v-for="course in courses" :key="course.id">
      <h3>
        <router-link :to="`/courses/${course.courseId}`">{{ course.title }}</router-link>
      </h3>
      <p>{{ course.username }}</p>
      <p>Course ID: {{ course.courseId }}</p>
    </div>

    <div class="control-panel">
      <label>
        Size:
        <select v-model="size">
          <option value="5">5개씩 보기</option>
          <option value="10">10개씩 보기</option>
          <option value="15">15개씩 보기</option>
          <option value="20">20개씩 보기</option>
        </select>
      </label>
      <button v-for="pageNum in totalPages" :key="pageNum" @click="setPage(pageNum)">
        {{ pageNum }}
      </button>
      <button @click="fetchCourses">Search</button>
    </div>

    <div class="filter-panel">
      <label>
        City:
        <select v-model="searchReq.filterByCityName">
          <option value="">Select a city</option>
          <option value="도시 이름 1">도시 이름 1</option>
          <option value="춘천">춘천</option>
          <!-- 필요한 경우 다른 옵션 추가 -->
        </select>
      </label>
      <label>
        Sort By:
        <select v-model="searchReq.courseSort">
          <option value="MODIFIED">최신순</option>
          <option value="LEVEL">등급 높은순</option>
          <option value="LIKE">좋아요 많은순</option>
          <option value="COMMENT">댓글 많은순</option>
          <!-- 필요한 경우 다른 옵션 추가 -->
        </select>
      </label>
    </div>
  </div>
  <div>
    <button @click="toggleFollow">
      <span v-if="searchReq.filterByFollowing">전체 유저 보기</span>
      <span v-else>팔로우한 유저만 보기</span>
    </button>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import axios from 'axios';

export default {
  setup() {
    const courses = ref([]);
    const page = ref(1);
    const size = ref(10);
    const totalPages = ref(5); // 총 페이지 수. 필요한 경우 이 값을 동적으로 업데이트하십시오.
    const searchReq = ref({
      filterByCityName: '',
      filterByFollowing: false,
      courseSort: 'MODIFIED'
    });

    const setPage = (pageNum) => {
      page.value = pageNum;
      fetchCourses();
    };

    const toggleFollow = () => {
      searchReq.value.filterByFollowing = !searchReq.value.filterByFollowing;
      fetchCourses();
    };

    const fetchCourses = () => {
      axios.post('/api/v1/courses/list', searchReq.value, {
        params: {
          page: page.value - 1,
          size: size.value
        }, headers: {Authorization: localStorage.getItem('Authorization')}
      })
      .then(response => {
        courses.value = response.data.data;
        console.log(searchReq)
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(searchReq)
        alert('error')
      });
    };

    onMounted(fetchCourses);

    return {
      courses,
      page,
      size,
      totalPages,
      searchReq,
      fetchCourses,
      setPage,
      toggleFollow
    };
  }
};
</script>

<style>
.course-card {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
}

.control-panel, .filter-panel {
  margin-bottom: 20px;
}
</style>
