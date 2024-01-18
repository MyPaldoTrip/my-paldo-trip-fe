<template>
  <div>
    <!-- 댓글 작성 -->
    <div>
      <h2>댓글 작성</h2>
      <input v-model="newComment.content" placeholder="댓글을 입력하세요."/>
      <button @click="saveComment">작성</button>
    </div>
    <!-- 댓글 수정 -->
    <div v-if="selectedComment">
      <h2>댓글 수정</h2>
      <input v-model="selectedComment.content" placeholder="수정할 내용을 입력하세요."/>
      <button @click="updateComment(selectedComment.commentId)">수정 완료</button>
    </div>
    <!-- 댓글 목록 -->
    <div>
      <h2>댓글 목록</h2>
      <div v-for="(comment, index) in comments" :key="index">
        <p> 댓글 ID : {{ comment.commentId }}</p>
        <p> 댓글 내용 : {{ comment.content }}</p>
        <button @click="selectComment(comment)">수정</button>
        <button @click="deleteComment(comment.commentId)">삭제</button>
      </div>
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
    const courseId = route.params.courseId; // 실제 코스 ID로 변경해야 합니다.
    const newComment = ref({text: ''});
    const comments = ref([]);
    const selectedComment = ref(null);
    const Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGVtYWlsLmNvbSIsImV4cCI6MTcwNTU4MTM1MywiaWF0IjoxNzA1NTc3NzUzfQ.AWygOY0TRrBg87jj4m1s7TH4Hpgix-dN4AFrzL7iE3k';
    const page = ref(1);
    const size = ref(20);
    // const totalPages = ref(5); // 총 페이지 수. 필요한 경우 이 값을 동적으로 업데이트하십시오.
    const searchReq = ref({
      filterByFollowing: '',
      CommentSort: ''
    });
    const saveComment = () => {
      axios.post(`http://localhost:8080/api/v1/courses/${courseId}/comments`, newComment.value, {
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
      axios.post(`http://localhost:8080/api/v1/courses/${courseId}/comments/list`, searchReq.value,
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
      })
      .catch(error => console.error('Error:', error));
    };

    const selectComment = (comment) => {
      selectedComment.value = {...comment};
    };

    const updateComment = (commentId) => {
      axios.put(`http://localhost:8080/api/v1/courses/${courseId}/comments/${commentId}`,
          selectedComment.value, {
            headers: {'Authorization': Authorization}
          })
      .then(response => {
        console.log('Comment Updated:', response.data);
        window.location.reload();
      })
      .catch(error => console.error('Error:', error));
    };

    const deleteComment = (commentId) => {
      axios.delete(`http://localhost:8080/api/v1/courses/${courseId}/comments/${commentId}`,
          {headers: {'Authorization': Authorization}})
      .then(response => {
        console.log('Comment Deleted:', response.data);
        getCommentList();
      })
      .catch(error => console.error('Error:', error));
    };

    // 컴포넌트가 마운트 되면 댓글 목록을 불러옵니다.
    onMounted(getCommentList);

    return {
      newComment,
      comments,
      selectedComment,
      page,
      size,
      searchReq,
      selectComment,
      saveComment,
      getCommentList,
      updateComment,
      deleteComment
    };
  }
};
</script>
