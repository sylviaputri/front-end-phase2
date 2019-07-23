<template>
<div class="px-5">
	<h2 class="font-weight-bold mb-4">Detail Modul</h2>
	<div class="fadedWhiteBackground px-2 py-2">
		<h6>Kode</h6>
	</div>
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
