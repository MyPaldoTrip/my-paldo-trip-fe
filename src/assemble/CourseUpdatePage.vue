<template>
  <div>
    <update-course/>
    <upload-course-file/>
    <delete-course-file/>

  </div>
</template>

<script>


import uploadCourseFile from "@/views/course/uploadCourseFile.vue";
import deleteCourseFile from "@/views/course/deleteCourseFile.vue";
import updateCourse from "@/views/course/updateCourse.vue";

export default {
  components: {
    updateCourse,
    uploadCourseFile,
    deleteCourseFile

  }
}
</script>

<style scoped>

</style>