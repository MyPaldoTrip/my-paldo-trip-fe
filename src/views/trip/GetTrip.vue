<template>
  <div class="container">
    <div class="trip-info">
      <h1>{{ vueState.trip ? vueState.trip.name : '' }}</h1>
      <p><strong>도시:</strong> {{ vueState.trip ? vueState.trip.city : '' }}</p>
      <p><strong>카테고리:</strong> {{ vueState.trip ? categoryToKorean(vueState.trip.category) : '' }}</p>
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
      <button @click="managementFile">파일관리</button>
    </div>

    <div class="reviews-section">
      <div class="review-form">
        <h5>후기</h5>
        <textarea v-model="vueState.newReview.content" placeholder="후기를 작성해주세요."></textarea>
        <select v-model="vueState.newReview.score" class="score-select">
          <option disabled value="">평점을 선택해주세요</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <button @click="createReview">후기 등록</button>
      </div>

      <div class="review">
        <div class="filter-sort">
          <label for="filterByFollowing">팔로우한 사용자만 보기:</label>
          <input id="filterByFollowing" type="checkbox" v-model="vueState.reviewListReq.filterByFollowing"
                 @change="getReviewList">

          <label for="reviewSort">정렬:</label>
          <select id="reviewSort" v-model="vueState.reviewListReq.reviewSort" @change="getReviewList">
            <option value="MODIFIED">수정 순</option>
            <option value="RATING">평점 순</option>
            <option value="LEVEL">유저 레벨 순</option>
          </select>
        </div>
        <div v-for="review in vueState.reviews" :key="review.username + review.modifiedAt">
          <div>
            <strong>작성자:</strong> {{ review.username }}
            <strong>레벨:</strong> {{ review.level }}
          </div>
          <div>
            <strong>평점:</strong> {{ review.score }}
          </div>
          <div>
            <strong>후기:</strong> {{ review.content }}
          </div>
          <button @click="openEditForm(review)">수정</button>
          <button @click="deleteReview(review)">삭제</button>
          <div v-if="vueState.editingReview && vueState.editingReview.username === review.username && vueState.editingReview.modifiedAt === review.modifiedAt">
            <textarea v-model="vueState.editingReview.content"></textarea>
            <select v-model="vueState.editingReview.score">
              <option disabled value="">평점을 선택해주세요</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <button @click="editReview">수정 완료</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {onMounted, reactive, watch} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";

export default {
  setup() {
    const vueState = reactive({
      trip: null,
      error: null,
      selectedImage: null,
      reviews: null,
      reviewListReq: {
        filterByFollowing: false,
        reviewSort: 'MODIFIED',
        page: 0,
      },
      newReview: {
        content: '',
        score: null,
      },
      editingReview: null,
    });

    const getTrip = async () => {
      const route = useRoute();
      const tripId = route.params.id;
      vueState.tripId = tripId;

      try {
        const response = await axios.get(`/api/v1/trips/${tripId}`)
        vueState.trip = response.data.data;
        await getReviewList(tripId);
      } catch (error) {
        vueState.error = '여행 정보를 불러오는데 실패했습니다.';
        console.error('There was an error fetching the trip details:', error)
      }
    };

    const categoryToKorean = (category) => {
      switch (category) {
        case 'ATTRACTION':
          return '관광지';
        case 'RESTAURANT':
          return '맛집';
        case 'FESTIVAL':
          return '축제';
        default:
          return category;
      }
    };


    const getReviewList = async () => {
      if (vueState.reviewListReq.reviewSort === '') {
        return;
      }

      try {
        const response = await axios.post(`/api/v1/trips/${vueState.tripId}/reviews/lists`, vueState.reviewListReq, {
          headers: {
            'Authorization': localStorage.getItem('Authorization')
          },
        });
        vueState.reviews = response.data.data;
      } catch (error) {
        alert(error.response.data.message);
        console.error('There was an error fetching the review list:', error);
      }
    }

    watch(() => [vueState.reviewListReq.filterByFollowing, vueState.reviewListReq.reviewSort], getReviewList);

    const createReview = async () => {
      if (!vueState.newReview.score || vueState.newReview.score < 1 || vueState.newReview.score > 5) {
        alert('평점은 1에서 5 사이의 숫자를 입력해주세요.')
        return;
      }
      try {
        await axios.post(`/api/v1/trips/${vueState.trip.tripId}/reviews`, vueState.newReview, {
          headers: {
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        vueState.newReview.content = '';
        vueState.newReview.score = null;
        getReviewList();
      } catch (error) {
        alert(error.response.data.message);
        console.error('There was an error creating the review:', error);
      }
    };

    const openEditForm = (review) => {
      vueState.editingReview = {...review};
    };

    const editReview = async () => {
      try {
        await  axios.patch(`/api/v1/trips/${vueState.trip.tripId}/reviews/${vueState.editingReview.reviewId}`, vueState.editingReview, {
          headers: {
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        vueState.editingReview = null;
        getReviewList();
      } catch (error) {
        alert(error.response.data.message);
        console.error('There was an error updating the review:', error);
      }
    };

    const deleteReview = async (review) => {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return;
      }

      try {
        await axios.delete(`/api/v1/trips/${vueState.trip.tripId}/reviews/${review.reviewId}`, {
          headers: {
            'Authorization': localStorage.getItem('Authorization'),
          },
        });
        getReviewList();
        alert('후기가 삭제되었습니다.')
      } catch (error) {
        alert(error.response.data.message);
        console.error('There was an error deleting the review', error);
      }
    }

    const updateTrip = () => {
      router.push(`/updateTrip/${vueState.trip.tripId}`);
    };

    const deleteTrip = async () => {
      if (!confirm('정말 삭제하시겠습니까?')) {
        return;
      }

      try {
        await axios.delete(`/api/v1/trips/${vueState.trip.tripId}`, {
          headers: {
            'Authorization': localStorage.getItem('Authorization')
          },
        });
        alert('여행정보가 삭제되었습니다.');
        router.push('/getTripList')
      } catch (error) {
        alert(error.response.data.message);
        console.error('There was an error deleting the trip', error);
      }
    }

    const managementFile = () => {
      router.push(`/getTrip/${vueState.trip.tripId}/fileList`)
    };

    onMounted(getTrip);

    return {
      vueState,
      categoryToKorean,
      getReviewList,
      updateTrip,
      deleteTrip,
      createReview,
      openEditForm,
      editReview,
      deleteReview,
      managementFile,
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
  background-color: rgba(0, 0, 0, 0.9);
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
  margin-bottom: 40px;
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

.reviews-section {
  width: 80%;
  margin: auto;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 10px #eee;
  border-radius: 10px;
}

.review-form {
  border-radius: 10px;
  background-color: #f8f8f8;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px #eee;
}

.review-form textarea {
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.review-form input[type="number"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.review-form button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color .3s;
  float: right;
}

.review-form button:hover {
  background-color: #0056b3;
}

.score-select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.review {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  margin-top: 20px;
}

.review > div {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #eee;
}

.review > div > div {
  margin-bottom: 10px;
}

.review > div > div > strong {
  display: inline-block;
  width: 70px;
}

.review > div > div:nth-child(1),
.review > div > div:nth-child(2) {
  display: inline-block;
}

</style>