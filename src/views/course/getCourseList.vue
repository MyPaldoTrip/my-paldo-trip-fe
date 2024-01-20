<template>
  <div>
    <table class="table">
      <thead class="table-light">
      <tr>
        <th scope="col">코스 번호</th>
        <th scope="col">제목</th>
        <th scope="col">작성자</th>
        <th scope="col">좋아요 수</th>
        <th scope="col">작성일</th>
      </tr>
      </thead>
      <tbody class="table-group-divider" v-for="course in courses" :key="course.id">
      <tr>
        <td>{{ course.courseId }} {{}}</td>
        <td>
          <router-link :to="`/courses/${course.courseId}/test`">
            {{ course.title }}
          </router-link>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path
                d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path
                d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg>
          {{ course.commentCount }}
        </td>
        <td>{{ course.username }} (lv{{ course.level }})</td>
        <td>{{ course.likeCount }}</td>
        <td>{{ course.createdAt.substr(0, 10) }}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-outline-primary" @click="router().push(`/courses`)">코스 생성</button>

    </div>

    <div class="search">
      <input class="form-control" type="text" v-model="searchReq.filterByCityName"
             placeholder="도시 이름"
             aria-label="default input example">

      <select class="form-select" v-model="searchReq.courseSort" @change="fetchCourses"
              aria-label="Default select example">
        <option value="MODIFIED">최신순</option>
        <option value="LEVEL">등급 높은순</option>
        <option value="LIKE">좋아요 많은순</option>
        <option value="COMMENT">댓글 많은순</option>
      </select>

      <button type="button" class="btn btn-primary" @click="fetchCourses">검색</button>
    </div>
    <div class="marginTop">
      <div>
        <button type="button" class="btn btn-outline-info" @click="toggleFollow">
          <span v-if="searchReq.filterByFollowing">전체 유저 보기</span>
          <span v-else>팔로우한 유저만 보기</span>
        </button>
      </div>
      <div>
        <button type="button" class="btn btn-outline-info" v-for="pageNum in totalPages"
                :key="pageNum" @click="setPage(pageNum)">
          {{ pageNum }}
        </button>
      </div>
    </div>
    <select class="form-select" v-model="size" @change="fetchCourses">
      <option value="5">5개씩 보기</option>
      <option value="10">10개씩 보기</option>
      <option value="15">15개씩 보기</option>
      <option value="20">20개씩 보기</option>
    </select>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import router from "@/router";

export default {
  methods: {
    router() {
      return router
    }
  },
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
        totalPages.value = response.data.data[0].totalPage;
      })
      .catch(error => {
        console.error('Error:', error);
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

<style scoped>

table.table {
  margin-bottom: 50px;
}


input.form-control {
  width: 10%;
}

select.form-select {
  float: right;
  width: 10%;
  margin-right: 20px;
  margin-left: 15px;
}

.search {
  margin-left: 44%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btn {
  margin-left: 10px;
}

tbody.table-group-divider{
  font-size: 20px;
}

</style>
