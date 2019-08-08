<template>
    <div>
        <b-row class="fadedWhiteBackground m-auto" style="width:100%">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(1)" v-bind:class="{ activeTab: activeTab==1 }">
                Permintaan yang Sedang Berjalan
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==1">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(2)" v-bind:class="{ activeTab: activeTab==2 }">
                Permintaan Ditolak
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==2">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(3)" v-bind:class="{ activeTab: activeTab==3 }">
                Permintaan Diterima
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==3">
            </b-col>
        </b-row>
        <div class="fadedWhiteBackground">
            <div v-if="myClassRequests == ''" class="text-center pt-5">Tidak ada kelas yang sedang kamu ajukan</div>
            <div v-if="myClassRequests == null" class="text-center pt-3">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <class-request v-else class="p-3" :classRequests=myClassRequests></class-request>
        </div>
    </div>
</template>

<script scoped>
import ClassRequest from './ClassRequest.vue'
export default {
  data () {
    return {
      activeTab: 1,
      myClassRequests: null
    }
  },
  components: {
    'class-request': ClassRequest
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
      this.getMyClassRequests()
    },
    getMyClassRequests () {
      if (this.activeTab == 1) {
        this.$axios
        .get('http://komatikugm.web.id:13370/classrooms/_requests/_users?page=0&size=15&status=waiting', {withCredentials: true})
        .then(response => (this.myClassRequests = response.data.data.content))
        .catch(error => { console.log(error.response) })
      } else if (this.activeTab == 2) {
        this.$axios
        .get('http://komatikugm.web.id:13370/classrooms/_requests/_users?page=0&size=15&status=rejected', {withCredentials: true})
        .then(response => (this.myClassRequests = response.data.data.content))
        .catch(error => { console.log(error.response) })
      } else {
        this.$axios
        .get('http://komatikugm.web.id:13370/classrooms/_requests/_users?page=0&size=15&status=accepted', {withCredentials: true})
        .then(response => (this.myClassRequests = response.data.data.content))
        .catch(error => { console.log(error.response) })
      }
    }
  },
  mounted () {
    this.getMyClassRequests()
  },
  watch: {
    myClassRequests () {
      this.getMyClassRequests()
    }
  }
}
</script>
