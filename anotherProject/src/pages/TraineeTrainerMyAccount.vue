<template>
    <div id="myAccountPage" class="px-4 pt-3">
      <b-row>
        <b-col sm="3">
          <side-menu-account class="mr-3" style="width:100%"></side-menu-account>
        </b-col>
        <b-col sm="9">
          <div class="contentAccountMenu" style="width:100%">
            <router-view></router-view>
          </div>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import SideMenuAccount from './../components/SideMenuAccount.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    'side-menu-account': SideMenuAccount
  },
  created () {
    window.scrollTo(0, 0)
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
  min-height: 100%
}
div.contentAccountMenu{
  width: 78%;
}
</style>
