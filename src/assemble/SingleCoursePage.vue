<template>
  <div>
    <get-course/>
    <toggle-like/>
    <delete-course/>
    <add-comment/>

  </div>
</template>

<script>


import getCourse from "@/views/course/getCourse.vue";
import deleteCourse from "@/views/course/deleteCourse.vue";
import addComment from "@/views/comment/addComment.vue";
import toggleLike from "@/views/like/toggleLike.vue";

export default {
  components: {
    getCourse,
    toggleLike,
    deleteCourse,
    addComment,

  }
}
</script>

<style scoped>

</style>