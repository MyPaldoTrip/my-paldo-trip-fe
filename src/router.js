import {createRouter, createWebHistory} from 'vue-router'
import VueHome from "./views/VueHome.vue";
import VueAbout from "./views/VueAbout.vue";
import OutputTest from "./views/VueDataTest.vue"
import InputTest from "./views/VueInputDataTest.vue"
import getCourse from "@/views/course/getCourse.vue";
import getCourseList from "@/views/course/getCourseList.vue";
import addCourse from "@/views/course/addCourse.vue";
import updateCourse from "@/views/course/updateCourse.vue";
import deleteCourse from "@/views/course/deleteCourse.vue";
import uploadCourseFile from "@/views/course/uploadCourseFile.vue";
import deleteFile from "@/views/course/deleteCourseFile.vue";
import toggleLike from "@/views/like/toggleLike.vue";
import addComment from "@/views/comment/addComment.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: VueHome},
    {path: "/about", component: VueAbout},
    {path: "/outputTest", component: OutputTest},
    {path: "/inputTest", component: InputTest},
    {path: "/courses", component: addCourse},
    {path: "/courses/list", component: getCourseList},
    {path: "/courses/:courseId", component: getCourse}
    {path: "/courses/:courseId/update", component: updateCourse},

  ]
})

export default router