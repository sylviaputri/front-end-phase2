<template>
  <v-app id="rootDiv">
    <component v-bind:is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import TraineeLayout from './layouts/TraineeLayout'
import LoginLayout from './layouts/LoginLayout'
import AdminLayout from './layouts/AdminLayout'
export default {
  computed: {
    layout () {
      return this.$store.getters.layout
    },
    sidebarMenu () {
      return this.$store.getters.sidebarMenu
    }
  },
  components: {
    'trainee-layout': TraineeLayout,
    'login-layout': LoginLayout,
    'admin-layout' : AdminLayout
    // define as many layouts you want for the application
  }
}
</script>

<style>
body, #rootDiv{
  height: 100%;
  background: transparent;
}
</style>
