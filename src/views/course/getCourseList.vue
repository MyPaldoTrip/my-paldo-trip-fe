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
          <router-link :to="`/courses/${course.courseId}`">{{ course.title }}</router-link>
        </td>
        <td>{{ course.author }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <div>
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
  <div>
    <label>
      City:
      <select v-model="searchReq.cityName">
        <option value="">Select a city</option>
        <option value="도시 이름 1">도시 이름 1</option>
        <option value="춘천">춘천</option>
        <!-- 필요한 경우 다른 옵션 추가 -->
      </select>
    </label>
<!--    <button @click="toggleFollow">-->
<!--      <span v-if="searchReq.value.filterByFollowing === 'true'">전체 유저 보기</span>-->
<!--      <span v-else>팔로우한 유저만 보기</span>-->
<!--    </button>-->
<!--    <label>-->
<!--      Sort By:-->
<!--      <select v-model="searchReq.CourseSort">-->
<!--        <option value="">Select a sort order</option>-->
<!--        <option value="MODIFIED">최신순</option>-->
<!--        <option value="LEVEL">등급 높은순</option>-->
<!--        <option value="LIKE">좋아요 많은순</option>-->
<!--        <option value="COMMENT">댓글 많은순</option>-->
<!--        &lt;!&ndash; 필요한 경우 다른 옵션 추가 &ndash;&gt;-->
<!--      </select>-->
<!--    </label>-->
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
      cityName: '',
      filterByFollowing: '',
      CourseSort: ''
    });

    const setPage = (pageNum) => {
      page.value = pageNum;
      fetchCourses();
    };

    // const toggleFollow = () => {
    //   searchReq.value.filterByFollowing = searchReq.value.filterByFollowing === 'true' ? 'false' : 'true';
    //   fetchCourses();
    // };

    const fetchCourses = () => {
      axios.post('http://localhost:8080/api/v1/courses/list', searchReq.value, {
        params: {
          page: page.value - 1,
          size: size.value
        }
          // ,headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGVtYWlsLmNvbSIsImV4cCI6MTcwNTU2MTUxMywiaWF0IjoxNzA1NTU3OTEzfQ.z3b3nxTFUQBUxzm2VeDD4JsMMJKhIUbrgiavc0WhsQs'}
      })
      .then(response => {
        console.log(response.data)
        courses.value = response.data.data;
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(searchReq)
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
      // toggleFollow
    };
  }
};
</script>

