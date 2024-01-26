<template>
  <div>
    <update-course/>
    <manage-course-file/>

  </div>
</template>

<script>

import updateCourse from "@/views/course/updateCourse.vue";
import manageCourseFile from "@/views/course/manageCourseFile.vue";

export default {
  components: {
    updateCourse,
    manageCourseFile

  }
}
</script>

<style scoped>

</style>