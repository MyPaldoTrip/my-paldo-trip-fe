<template>
  <div>
    <div>
      <br>
      <h1 class="page-title">마이 팔도 트립</h1>
    </div>
    <b-navbar toggleable="lg" type="dark" class="custom-nav">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "vueHeader",
};
</script>
<style>
.custom-nav {
  background-color: beige;
}

.page-title {
  font-size: 3em; /* 글자 크기 */
  font-family: 'Arial', sans-serif; /* 폰트 */
  color: #333; /* 글자 색상 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, .5); /* 그림자 효과 */
}
</style>