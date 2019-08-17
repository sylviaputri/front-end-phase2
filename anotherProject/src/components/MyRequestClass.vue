<template>
    <div>
        <b-row class="fadedWhiteBackground m-auto" style="width:100%">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor activeTab">
                Permintaan yang Sedang Berjalan
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px">
            </b-col>
        </b-row>
        <div class="fadedWhiteBackground">
            <div v-if="myClassRequests == ''" class="text-center my-3 py-2">Tidak ada kelas yang sedang kamu ajukan</div>
            <div v-if="myClassRequests == null" class="text-center my-3 py-2">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-card-group v-else id="cardGroupTopClassRequested" class="my-3 px-2">
              <b-card class="topClassRequested my-1" v-for="myClassRequest in myClassRequests" :key="myClassRequest[0].id">
                <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">{{ myClassRequest[0].module.name }}</b-card-text>
                <b-card-text class="topClassRequestedName mb-0">Kelas : {{ myClassRequest[0].name }}</b-card-text>
                <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : {{ myClassRequest[0].trainer.fullname }}</b-card-text>
                <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh {{ myClassRequest[0].classroomRequests.length }} orang</b-card-text>
                <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
                  <b-card-text class="topClassRequestedTime float-left mb-0">{{ myClassRequest[0].classroomRequests[0].createdAt | moment("DD-MM-YYYY HH:mm:ss") }}</b-card-text>
                  <b-button @click="cancelJoinRequestClass(myClassRequest[0].id)" variant="secondary" class="btnCancelJoinClassRequest float-right">Batal</b-button>
                </b-card-footer>
              </b-card>
            </b-card-group>
            <pagination :totalPages="totalPages" :page.sync="page" class="pb-1 pt-3"></pagination>
        </div>
    </div>
</template>

<script scoped>
import Pagination from './Pagination.vue'
export default {
  data () {
    return {
      myClassRequests: null,
      totalPages: 0,
      page: 0,
      size: 1
    }
  },
  components: {
    'pagination': Pagination
  },
  methods: {
    getContentPage (page) {
      this.classRequests = null
      this.page = page
      this.$axios
        .get('http://komatikugm.web.id:13370/classrooms/_requests/_users?page=' + this.page + '&size=' + this.size, {withCredentials: true})
        .then(response => {
          this.myClassRequests = response.data.data.content
          this.totalPages = response.data.data.totalPages
        })
        .catch(error => { console.log(error.response) })
    },
    cancelJoinRequestClass (classId) {
      this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
          classroomId: classId
      }, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.getContentPage(0)
        })
      .catch(error => console.log(error.response))
    }
  },
  mounted () {
    this.getContentPage(0)
  }
}
</script>

<style>
.topClassRequested {
  min-width: 100% !important
}
</style>
