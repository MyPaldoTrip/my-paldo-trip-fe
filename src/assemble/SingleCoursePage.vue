<template>
  <div>
    <get-course/>
    <toggle-like/>
    <add-comment/>

  </div>
</template>

<script>


import getCourse from "@/views/course/getCourse.vue";
import addComment from "@/views/comment/addComment.vue";
import toggleLike from "@/views/like/toggleLike.vue";

export default {
  components: {
    getCourse,
    toggleLike,
    addComment,

  }
}
</script>

<style scoped>

</style>