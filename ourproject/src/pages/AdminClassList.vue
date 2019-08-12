<template>
<div class="px-5">
	<h2 class="font-weight-bold text-center whiteColor">Daftar Kelas "{{module.name}}"</h2>
    <class-list :classRooms=classroom></class-list>
    <div class="col-12 d-flex py-3">
        <div class="mr-auto">
            <router-link :to="{path: '/admin/all-modules/detail-module/' + this.$route.params.moduleId}">
                <b-button variant="primary" class="btnBack">Kembali</b-button>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import ClassList from './../components/Classlist.vue'
export default {
  data () {
    return {
      classroom: '',
      module: ''
    }
  },
  components: {
        'class-list': ClassList
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.$axios
    .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
    .then(response => (this.classroom = response.data.data.module.classrooms))
    .catch(error => { console.log(error.response) })
    this.$axios
    .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
    .then(response => (this.module = response.data.data.module))
    .catch(error => { console.log(error.response) })
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
