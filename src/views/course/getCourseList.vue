<template>
  <div class=cards>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div v-for="course in courses" :key="course.id" class="col">
        <div class="card">
          <router-link :to="`/courses/${course.courseId}/test`">
           <img :src="course.thumbnailUrl" alt="" class="card-img-top">
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ course.title }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <svg class="bi bi-heart-fill" fill="red" height="16" viewBox="0 0 16 16"
                   width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      fill-rule="evenodd"></path>
              </svg>
              {{ course.likeCount }}
              <svg class="bi bi-chat-dots" fill="currentColor" height="16" viewBox="0 0 16 16"
                   width="16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                <path
                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
              </svg>
              {{ course.commentCount }}
            </li>
            <li class="list-group-item">작성자 : {{ course.username }}(lv{{ 0 + course.level }})</li>
            <li class="list-group-item">작성일 - {{ course.createdAt.substring(0, 10) }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button class="btn btn-outline-primary" type="button" @click="router().push(`/courses`)">코스
      생성
    </button>
  </div>

  <div class="search">
    <input v-model="searchReq.filterByCityName" aria-label="default input example" class="form-control"
           placeholder="도시 이름"
           type="text">

    <select v-model="searchReq.courseSort" aria-label="Default select example" class="form-select"
            @change="fetchCourses">
      <option value="MODIFIED">최신순</option>
      <option value="LEVEL">등급 높은순</option>
      <option value="LIKE">좋아요 많은순</option>
      <option value="COMMENT">댓글 많은순</option>
    </select>

    <button class="btn btn-primary" type="button" @click="fetchCourses">검색</button>
  </div>
  <div class="marginTop">
    <div>
      <button class="btn btn-outline-info" type="button" @click="toggleFollow">
        <span v-if="searchReq.filterByFollowing">전체 유저 보기</span>
        <span v-else>팔로우한 유저만 보기</span>
      </button>
    </div>
    <div>
      <button v-for="pageNum in totalPages" :key="pageNum" class="btn btn-outline-info"
              type="button" @click="setPage(pageNum)">
        {{ pageNum }}
      </button>
    </div>
  </div>
  <select v-model="size" class="form-select" @change="fetchCourses">
    <option value="5">5개씩 보기</option>
    <option value="10">10개씩 보기</option>
    <option value="15">15개씩 보기</option>
    <option value="20">20개씩 보기</option>
  </select>
</template>

<script>
import {onMounted, ref} from 'vue';
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
    const totalPages = ref(1);
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
        courses.value = response.data.data.courseListResList;
        totalPages.value = response.data.data.courseListResList[0].totalPage;
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

.btn-outline-info {
  margin-top: 10px;
}

.btn-outline-primary {
  margin-bottom: 10px;
}

.cards {
  margin: 100px 10% 30px 10%;
}
.col {
  height : 600px;
}
.card-img-top {
  height: 400px;
}

</style>
