<template>
  <div id="adminHistoryAllClasses" class="px-5">
      <h2 class="font-weight-bold mb-4">Riwayat Semua Kelas</h2>
      <div class="tabSort fadedWhiteBackground pt-1 pb-0 px-4 mb-4">
          <b-row>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isClassOpen }">
              KELAS PERLU DINILAI
              <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isClassOpen">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isClassOver }">
              KELAS SUDAH SELESAI
              <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isClassOver">
            </b-col>
          </b-row>
      </div>
      <div class="fadedWhiteBackground">
        <!-- <div>
          <b-input-group class="float-right mr-2 my-2" style="width: 30%">
            <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
            <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
          </b-input-group>
        </div> -->
        <class-history style="clear:both" :classesHistory=allClassesHistory></class-history>
      </div>
  </div>
</template>

<script>
import ClassHistory from './../components/ClassHistory.vue'
export default {
  data () {
    return {
      allClassesHistory: null,
      isClassOpen: true,
      isClassOver: false
    }
  },
  components: {
    'class-history': ClassHistory
  },
   methods: {
    changeActiveState: function () {
      this.isClassOpen = !this.isClassOpen
      this.isClassOver = !this.isClassOver
    }
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms?hasExam=true&page=0&popular=false&size=5', {withCredentials: true})
      .then(response => (this.allClassesHistory = response.data.data.content))
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
