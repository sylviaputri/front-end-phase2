<template>
  <router-link to="/" @click.native="setLayout('login-layout')" ref="cobaRef">dfdef</router-link>
</template>

<script>
  export default {
    methods: {
      setLayout (layout) {
        this.$store.commit('SET_LAYOUT', layout)
      }
    },
    created() {
      this.setLayout('trainee-layout')
    },
  }
</script>
