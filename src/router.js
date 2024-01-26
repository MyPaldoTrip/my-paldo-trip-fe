import {createRouter, createWebHistory} from 'vue-router'

import getCourse from "@/views/course/getCourse.vue";
import getCourseList from "@/views/course/getCourseList.vue";
import addCourse from "@/views/course/addCourse.vue";
import deleteCourse from "@/views/course/deleteCourse.vue";
import uploadCourseFile from "@/views/course/manageCourseFile.vue";
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
import createCity from "@/views/city/createCity.vue";
import deleteCity from "@/views/city/deleteCity.vue";
import uploadCityFile from "@/views/city/uploadCityFile.vue";
import updateCity from "@/views/city/updateCity.vue";
import getProvinceList from "@/views/city/getProvinceList.vue";
import GetTripList from "./views/trip/GetTripList.vue";
import GetTrip from "./views/trip/GetTrip.vue";
import CreateTrip from "./views/trip/CreateTrip.vue";
import UpdateTrip from "./views/trip/UpdateTrip.vue";
import GetTripFileList from "./views/trip/getTripFileList.vue";
import GetTripFile from "./views/trip/getTripFile.vue";
import getTripCourse from "@/views/city/getTripCourse.vue";
import SingleCoursePage from "@/assemble/SingleCoursePage.vue";
import RedirectPage from "@/views/user/RedirectPage.vue";
import CourseUpdatePage from "@/assemble/CourseUpdatePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Course
    {path: "/courses", component: addCourse},
    {path: "/courses/list", component: getCourseList},
    {path: "/courses/:courseId", component: getCourse},
    {path: "/courses/:courseId/upload", component: uploadCourseFile},
    {path: "/courses/:courseId/delete", component: deleteCourse},
    {path: "/courses/:courseId/test", component: SingleCoursePage},
    {path: "/courses/:courseId/update", component: CourseUpdatePage},
    // like
    {path: "/courses/:courseId/likes", component: toggleLike},
    // comment
    {path: "/courses/:courseId/comment", component: addComment},

    {path: "/", component: homePage},
    {path: "/getTripList", component: GetTripList},
    {path: "/getTrip/:id", component: GetTrip},
    {path: "/createTrip", component: CreateTrip},
    {path: "/updateTrip/:id", component: UpdateTrip},
    {path: "/getTrip/:id/fileList", component: GetTripFileList},
    {path: "/getTrip/:tripId/files/:fileId", component: GetTripFile},
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
    {path: "/cities", component: createCity},
    {path: "/cities/:cityId/update", component: updateCity},
    {path: "/cities/:cityId/delete", component: deleteCity},
    {path: "/cities/:cityId/upload", component: uploadCityFile},
    {path: "/cities/list", component: getProvinceList},
    {path: "/getTripCourse/:cityName", component: getTripCourse},
    {path: "/kakao-login/oauth2/code", component: RedirectPage},
  ]
})

export default router
