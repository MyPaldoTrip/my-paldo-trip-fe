<template>
  <div>
    <vueHome/>
    <vueInputDataTest/>
    <!--    <vueDataTest/>-->
  </div>
</template>

<script>
// import vueDataTest from "@/views/sample/VueDataTest.vue";
import vueHome from "@/views/sample/VueHome.vue";
import vueInputDataTest from "@/views/sample/VueInputDataTest.vue";

export default {
  components: {
    vueHome,
    vueInputDataTest,
    // vueDataTest
  }
}
</script>

<style scoped>

</style>