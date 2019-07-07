<template>
  <div id="traineeRequestModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Permintaan Modul</h2>
      <div class="tabSort fadedWhiteBackground pt-1 pb-0 px-4 mb-4">
          <b-row>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isPopularActive }">
              POPULER
              <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isPopularActive">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isNewActive }">
              BARU
              <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isNewActive">
            </b-col>
          </b-row>
      </div>
      <div class="fadedWhiteBackground">
        <div>
          <b-input-group class="float-right mr-2 my-2" style="width: 30%">
            <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
            <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
          </b-input-group>
        </div>
        <module-request style="clear:both"></module-request>
      </div>
  </div>
</template>

<script>
import ModuleRequest from './../components/ModuleRequest.vue'
export default {
  data () {
    return {
      isPopularActive: true,
      isNewActive: false
    }
  },
  components: {
    'module-request': ModuleRequest
  },
  created () {
    window.scrollTo(0, 0)
  },
  methods: {
    changeActiveState: function () {
      this.isPopularActive = !this.isPopularActive
      this.isNewActive = !this.isNewActive
    }
  }
}
</script>

<style>
html{
  background: url('./../assets/background_images/apps_page.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
/* Tab */
.activeTab{
  color: rgb(10, 135, 192) !important
}
.tabs:hover{
  color: rgb(10, 135, 192) !important
}
</style>
