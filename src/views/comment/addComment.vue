<template>
  <div>
    <div v-if="selectedComment" class="input-group mb-3">
      <h4>댓글 수정</h4>
      <input v-model="selectedComment.content" aria-describedby="button-addon2" aria-label="Comment"
             class="form-control" placeholder="수정할 내용을 입력하세요."
             type="text">
      <button id="button-addon2" class="btn btn-outline-info"
              type="button" @click="updateComment(selectedComment.commentId)">수정완료
      </button>
      <br>
      <br>
    </div>

    <h2>댓글 목록</h2>
    <div v-for="(comment, index) in comments" :key="index">
      <div class="comment">
        <a class="list-group-item list-group-item-action list-group-item-primary">작성자 :
          {{ comment.username }}(lv{{ 0 + comment.level }})</a>
        <a class="list-group-item list-group-item-action list-group-item-info">댓글내용 :
          {{ comment.content }}</a>
      </div>
      <button class="btn btn-outline-warning" type="button" @click="selectComment(comment)">수정
      </button>
      <button class="btn btn-outline-danger" type="button"
              @click="deleteComment(comment.commentId)">삭제
      </button>
    </div>

  </div>
  <div>
    <input v-model="newComment.content" aria-describedby="button-addon2" aria-label="Comment"
           class="form-control" placeholder="댓글을 입력하세요."
           type="text">
    <button id="button-addon2" class="btn btn-outline-primary"
            type="button" @click="saveComment">댓글 등록
    </button>
  </div>

  <div class="control-panel">
    <label>
      <select v-model="size" class="form-select" @change="getCommentList">
        <option value="5">5개씩 보기</option>
        <option value="10">10개씩 보기</option>
        <option value="15">15개씩 보기</option>
        <option value="20">20개씩 보기</option>
      </select>
    </label>
    <div class="filter-panel">
      <label>
        <select v-model="searchReq.commentSort" class="form-select" @change="getCommentList">
          <option value="MODIFIED">최신순</option>
          <option value="LEVEL">등급 높은순</option>
        </select>
      </label>
    </div>

    <button v-for="pageNum in totalPages" :key="pageNum" class="btn btn-outline-info" type="button"
            @click="setPage(pageNum)">
      {{ pageNum }}
    </button>
    <div>
      <button class="btn btn-outline-info" type="button" @click="toggleFollow">
        <span v-if="searchReq.filterByFollowing">전체 유저 보기</span>
        <span v-else>팔로우한 유저만 보기</span>
      </button>
    </div>
  </div>

</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const courseId = route.params.courseId;
    const newComment = ref({text: ''});
    const comments = ref([]);
    const selectedComment = ref(null);
    const Authorization = localStorage.getItem('Authorization');
    const page = ref(1);
    const size = ref(10);
    const totalPages = ref(1);
    const searchReq = ref({
      filterByFollowing: false,
      commentSort: 'MODIFIED'
    });

    const toggleFollow = () => {
      searchReq.value.filterByFollowing = !searchReq.value.filterByFollowing;
      getCommentList();
    };

    const setPage = (pageNum) => {
      page.value = pageNum;
      getCommentList();
    };
    const saveComment = () => {
      axios.post(`/api/v1/courses/${courseId}/comments`, newComment.value, {
        headers: {'Authorization': Authorization}
      })
      .then(response => {
        console.log('Comment Saved:', response.data.data);
        console.log('newComment.value:', newComment.value);
        console.log('comments.value:', comments.value);

        comments.value.push(response.data.data);
        newComment.value.comment = '';
        getCommentList();
      })
      .catch(error => console.error('Error:', error));
    };

    const getCommentList = () => {
      axios.post(`/api/v1/courses/${courseId}/comments/list`, searchReq.value,
          {
            params: {
              page: page.value - 1,
              size: size.value
            },
            headers: {'Authorization': Authorization}
          })
      .then(response => {
        console.log('Comments:', response.data.data);
        comments.value = response.data.data;
        totalPages.value = response.data.data[0].totalPage;
      })
      .catch(error => console.error('Error:', error));
    };

    const selectComment = (comment) => {
      selectedComment.value = {...comment};
    };

    const updateComment = (commentId) => {
      axios.put(`/api/v1/courses/${courseId}/comments/${commentId}`,
          selectedComment.value, {
            headers: {'Authorization': Authorization}
          })
      .then(response => {
        console.log('Comment Updated:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('권한이 없습니다.')
      });
    };

    const deleteComment = (commentId) => {
      axios.delete(`/api/v1/courses/${courseId}/comments/${commentId}`,
          {headers: {'Authorization': Authorization}})
      .then(response => {
        console.log('Comment Deleted:', response.data);
        alert('삭제되었습니다.')
        getCommentList();
      })
      .catch(error => {
            console.error('Error:', error);
            alert('권한이 없습니다');
          }
      );

    };

    onMounted(getCommentList);

    return {
      newComment,
      comments,
      selectedComment,
      page,
      size,
      totalPages,
      searchReq,
      selectComment,
      saveComment,
      getCommentList,
      updateComment,
      deleteComment,
      toggleFollow,
      setPage
    };
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
  margin-right: 10px;
}

.form-select {
  margin-bottom: 10px;
}

.form-control {
  width: 25%;
  margin-left: 38%;
}

.comment {
  font-size: 25px;
}
</style>
