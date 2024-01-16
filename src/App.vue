<template>
  <div id="app">
    <VueHeader/>
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import VueHeader from "./components/layout/VueHeader.vue";

export default {
  name: 'App',
  components: {
    VueHeader,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
