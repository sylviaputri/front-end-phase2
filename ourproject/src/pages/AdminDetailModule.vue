<template>
  <div id="adminDetailModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Detail Modul</h2>
      <detail-module></detail-module>
  </div>
</template>

<script>
import DetailModule from './../components/DetailModule.vue'
export default {
  components: {
    'detail-module': DetailModule
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    window.scrollTo(0, 0)
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
</style>
