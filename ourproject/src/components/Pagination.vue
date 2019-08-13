<template>
    <b-pagination-nav v-model="currentPage" :link-gen="linkGen" :number-of-pages="totalPages" use-router align="right" size="lg"></b-pagination-nav>
</template>

<script>
export default {
  data () {
    return {
        currentPage: 1
    }
  },
  props: ['totalPages'],
  methods: {
    linkGen (pageNum) {
    }
  },
  watch: {
    currentPage () {
      this.$parent.getContentPage(this.currentPage - 1)
    }
  }
}
</script>

<style>
.page-link{
    background: transparent !important;
    color: black;
    font-weight: bold;
    padding: 15px !important;
    border: none
}
.page-item.active{
    background: #0A87C0;
}
</style>
