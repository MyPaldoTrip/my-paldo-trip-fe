<template>
  <div class="body">
    <form class="input-group mb-3">
      <input class="form-control" type="file" @change="onFileChange">
      <button class="input-group-text" @click="addFiles">업로드</button>
    </form>
    <div>
      <h2>첨부 파일 목록</h2>
      <div class="fileList">
        <div v-for="file in courseFiles" :key="file.id">
          <img class="image" :src="file.FileURL" width="500px" height="500px" alt="여행지 이미지">
          <br>
          <button class="btn btn-outline-danger" @click="deleteCourseFile(file.CourseFileId)">삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';

export default {
  setup() {
    const file = ref(null);
    const route = useRoute();
    const courseId = route.params.courseId;
    const courseFiles = ref([]);
    const Authorization = localStorage.getItem('Authorization');

    const onFileChange = e => {
      file.value = e.target.files[0];
    };

    const addFiles = () => {
      const formData = new FormData();
      formData.append('multipartFile', file.value);

      axios.post(`/api/v1/courses/${courseId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': Authorization
        }
      })
      .then(response => {
        console.log('Files added:', response.data);
        setTimeout(fetchCourseFiles, 1000);
        alert('정상적으로 처리되었습니다')
      })
      .catch(error => {
        console.error('Error:', error);
        alert('error')
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

    onMounted(fetchCourseFiles);

    return {
      courseId,
      onFileChange,
      addFiles,
      courseFiles,
      deleteCourseFile
    };
  }
};
</script>
<style scoped>
.fileList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 50px 50px 50px;
}

.image {
  margin-right: 50px;
}

.btn {
  margin-top: 20px;
}

.body {
  margin: 30px 15% auto 15%;
}
</style>