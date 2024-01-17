import {createRouter, createWebHistory} from 'vue-router'
import VueHome from "./views/VueHome.vue";
import VueAbout from "./views/VueAbout.vue";
import OutputTest from "./views/VueDataTest.vue"
import InputTest from "./views/VueInputDataTest.vue"
import getCourse from "@/views/course/getCourse.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: VueHome},
    {path: "/about", component: VueAbout},
    {path: "/outputTest", component: OutputTest},
    {path: "/inputTest", component: InputTest},
    // {path: "/courses", component: addCourse},
    // {path: "/courses/list", component: getCourseList},
    {path: "/courses/:courseId", component: getCourse}

  ]
})

export default router