<template>
  <div id="traineeDashboard" class="generalBackground">
  </div>
</template>

<script>
export default {
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    this.setLayout('trainee-layout')
  }
}
</script>

<style>
html{
  background: url('./../assets/background_images/welcome_page_1.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
