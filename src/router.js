import {createRouter, createWebHistory} from 'vue-router'

import VueHome from "./views/VueHome.vue";
import getCourse from "@/views/course/getCourse.vue";
import getCourseList from "@/views/course/getCourseList.vue";
import addCourse from "@/views/course/addCourse.vue";
import updateCourse from "@/views/course/updateCourse.vue";
import deleteCourse from "@/views/course/deleteCourse.vue";
import uploadCourseFile from "@/views/course/uploadCourseFile.vue";
import deleteFile from "@/views/course/deleteCourseFile.vue";
import toggleLike from "@/views/like/toggleLike.vue";
import addComment from "@/views/comment/addComment.vue";
import VueAbout from "./views/sample/VueAbout.vue";
import OutputTest from "./views/sample/VueDataTest.vue"
import InputTest from "./views/sample/VueInputDataTest.vue"
import signup from "./views/user/signupPage.vue"
import deleteUser from "./views/user/deleteUser.vue"
import loginUser from "./views/user/loginUser.vue";
import getUserList from "./views/user/getUserList.vue";
import getUser from "@/views/user/getUser.vue";
import updateUser from "@/views/user/updateUser.vue";
import applicationSubmitForm from "@/views/user/applicationSubmitForm.vue";
import applicationListForm from "@/views/user/applicationListForm.vue";
import applicationGetForm from "@/views/user/applicationGetForm.vue";
import homePage from "@/assemble/HomePage.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [

    {path: "/courses", component: addCourse},
    {path: "/courses/list", component: getCourseList},
    {path: "/courses/:courseId", component: getCourse},
    {path: "/courses/:courseId/update", component: updateCourse},
    {path: "/courses/:courseId/upload", component: uploadCourseFile},
    {path: "/courses/:courseId/delete", component: deleteCourse},
    {path: "/courses/:courseId/files/delete", component: deleteFile},
    {path: "/courses/:courseId/likes", component: toggleLike},
    {path: "/courses/:courseId/comment", component: addComment}
    {path: "/", component: homePage},
    {path: "/about", component: VueAbout, name: 'about'},
    {path: "/outputTest", component: OutputTest, name: 'test'},
    {path: "/inputTest", component: InputTest},
    {path: "/signup", component: signup},
    {path: "/deleteUser", component: deleteUser},
    {path: "/login", component: loginUser},
    {path: "/getUserList", component: getUserList},
    {path: "/getUser/:userId", component: getUser, name: 'getUser'},
    {path: "/updateUser", component: updateUser},
    {path: "/appSubmitForm", component: applicationSubmitForm},
    {path: "/appListForm", component: applicationListForm},
    {path: "/appGetForm/:applicationId", component: applicationGetForm},

  ]
})

export default router