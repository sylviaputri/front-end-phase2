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
            <class-request class="p-3" :classRequests=myClassRequests></class-request>
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
    }
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_requests?page=0&size=5', {withCredentials: true})
      .then(response => (this.myClassRequests = response.data.data.content))
      .catch(error => { console.log(error.response) })
  }
}
</script>
