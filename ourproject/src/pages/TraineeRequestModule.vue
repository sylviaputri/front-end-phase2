<template>
  <div id="traineeTrainerReqeustModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Permintaan Modul</h2>
      <div class="tabSort fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col>
              Populer
            </b-col>
            <b-col>
              Terbaru
            </b-col>
          </b-row>
      </div>
      <module-request></module-request>
  </div>
</template>

<script>
import ModuleRequest from './../components/ModuleRequest.vue'
export default {
  components: {
    'module-request': ModuleRequest
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
</style>
