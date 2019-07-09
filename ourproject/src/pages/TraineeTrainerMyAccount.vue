<template>
    <div id="myAccountPage" class="px-4 py-3">
      <side-menu-account></side-menu-account>
    </div>
</template>

<script>
import SideMenuAccount from './../components/SideMenuAccount.vue'
export default {
  components: {
    'side-menu-account': SideMenuAccount
  }
}
</script>

<style>
div#myAccountPage{
  background: url('./../assets/background_images/profile.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  margin-top: 55px !important;
  width: 100%;
  height: 100%;
}
</style>
