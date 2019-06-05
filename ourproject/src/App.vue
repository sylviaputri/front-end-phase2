<template>
  <v-app>
    <component v-bind:is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import TraineeLayout from './layouts/TraineeLayout'
import LoginLayout from './layouts/LoginLayout'
export default {
  computed: {
    layout () {
      return this.$store.getters.layout
    }
  },
  components: {
    'trainee-layout': TraineeLayout,
    'login-layout': LoginLayout
    // define as many layouts you want for the application
  }
}
</script>
