<template>
  <div>
    <vueHome/>
    <br>
    <popular-course/>
    <br>
    <br>
    <popular-trip/>
  </div>
</template>

<script>
import vueHome from "@/views/sample/VueHome.vue";
import PopularCourse from "@/views/home/popularCourse.vue";
import PopularTrip from "@/views/home/popularTrip.vue"

export default {
  components: {
    PopularCourse,
    vueHome,
    PopularTrip,
  }
}
</script>

<style scoped>

</style>