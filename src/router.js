import {createRouter, createWebHistory} from 'vue-router'
// import VueHome from "./views/sample/VueHome.vue";
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