<template>
<div class="px-5">
	<h2 class="font-weight-bold text-center whiteColor">Judul Modul</h2>
    <class-list></class-list>
    <div class="col-12 d-flex py-3">
        <div class="mr-auto">
            <router-link to="/admin/all-modules/detail-module/">
                <b-button variant="primary" class="btnBack">Kembali</b-button>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import ClassList from './../components/Classlist.vue'
export default {
  components: {
        'class-list': ClassList
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
