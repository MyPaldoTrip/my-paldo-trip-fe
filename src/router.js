import {createRouter, createWebHistory} from 'vue-router'
import VueHome from "./views/VueHome.vue";
import VueAbout from "./views/VueAbout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: VueHome},
    {path: "/about", component: VueAbout},
  ]
})

export default router