<template>
  <div id="traineeDashboard">
      <div id="introduction" class="ml-5">
          <h1 class="font-weight-bold">Dashboard</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      <div id="classFollowed"></div>
      <div id="topTrainers"></div>
      <div id="topModul"></div>
      <div id="modulRequested"></div>
      <div id="classRequested"></div>
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
