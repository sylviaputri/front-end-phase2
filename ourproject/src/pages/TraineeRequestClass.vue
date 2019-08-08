<template>
  <div id="traineeRequestClass" class="px-5">
      <h2 class="font-weight-bold mb-4">Permintaan Kelas</h2>
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
            <b-form-input v-model="searchKeyword" type="text" placeholder="Ketik nama kelas yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
          </b-input-group>
        </div>
        <div v-if="searchKeyword!=''" class="px-3" style="clear:both">
          <h5>Hasil pencarian kelas dengan nama kelas "<strong>{{ searchKeyword }}</strong>"</h5>
        </div>
        <class-request style="clear:both" :classRequests=classRequests></class-request>
        <div v-if="classRequests == ''" class="text-center py-5">
          <b-img :src="require('./../assets/images/no-data-found.png')" style="width:100px"></b-img>
          <h5 class="mt-3">Tidak ada permintaan kelas yang ditemukan</h5>
        </div>
        <div v-if="classRequests == null" class="text-center pb-4">
          <b-spinner label="Spinning"></b-spinner>
        </div>
      </div>
  </div>
</template>

<script>
import ClassRequest from './../components/ClassRequest.vue'
export default {
  data () {
    return {
      isPopularActive: true,
      isNewActive: false,
      classRequests: null,
      searchKeyword: ''
    }
  },
  components: {
    'class-request': ClassRequest
  },
  created () {
    window.scrollTo(0, 0)
  },
  methods: {
    changeActiveState: function () {
      this.isPopularActive = !this.isPopularActive
      this.isNewActive = !this.isNewActive
      this.searchClassReq()
    },
    searchClassReq () {
      this.classRequests = null
      let searchName = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === ''){
        searchName = ''
      }
      if (this.isPopularActive) {
        this.$axios
          .get('http://komatikugm.web.id:13370/classrooms/_requests?' + searchName + '&page=0&popular=true&size=15', {withCredentials: true})
          .then(response => (this.classRequests = response.data.data.content))
          .catch(error => { console.log(error.response) })
      } else {
        this.$axios
          .get('http://komatikugm.web.id:13370/classrooms/_requests?' + searchName + '&page=0&false=true&size=15', {withCredentials: true})
          .then(response => (this.classRequests = response.data.data.content))
          .catch(error => { console.log(error.response) })
      }
    }
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_requests?page=0&popular=true&size=15', {withCredentials: true})
      .then(response => (this.classRequests = response.data.data.content))
      .catch(error => { console.log(error.response) })
  },
  watch: {
    searchKeyword () {
      this.searchClassReq()
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
</style>
