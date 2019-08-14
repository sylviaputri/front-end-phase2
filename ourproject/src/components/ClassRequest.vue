<template>
  <div>
    <b-card-group id="cardGroupTopClassRequested" class="my-3 px-2">
      <b-card class="topClassRequested my-1" v-for="classRequest in classRequests" :key="classRequest.classId">
        <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">{{ classRequest.moduleName }}</b-card-text>
        <b-card-text class="topClassRequestedName mb-0">Kelas : {{ classRequest.className }}</b-card-text>
        <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : {{ classRequest.trainerName }}</b-card-text>
        <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh {{ classRequest.requesterCount }} orang</b-card-text>
        <b-card-footer v-if="role === 'TRAINEE'" class="border-0 p-0 m-0 grayColor" style="background:transparent">
          <b-card-text class="topClassRequestedTime float-left mb-0">{{ classRequest.createdAt | moment("DD-MM-YYYY hh:mm:ss") }}</b-card-text>
          <b-button v-if="classRequest.hasVote || classRequest.hasVote == null" @click="joinRequestClass(classRequest.classId)" variant="secondary" class="btnCancelJoinClassRequest float-right">Batal</b-button>
          <b-button v-else @click="joinRequestClass(classRequest.classId)" variant="primary" class="btnJoinClassRequest float-right">Bergabung</b-button>
        </b-card-footer>
        <b-card-footer v-else class="border-0 p-0 m-0 grayColor" style="background:transparent">
          <b-card-text class="trainerClassRequestedTime float-left mb-0">{{ classRequest.createdAt | moment("DD-MM-YYYY hh:mm:ss") }}</b-card-text>
          <b-button variant="primary" @click="getClassDetail(classRequest.classId)" v-b-modal="'modal-open-class-1'" class="btn openClassRequested float-right">Buka Kelas</b-button>
          <b-button variant="secondary" v-b-modal="'modal-decline-class-'+classRequest.classId" class="declineClassRequested float-right mr-3">Tolak</b-button>
        </b-card-footer>
        <!-- Pop up open class -->
        <b-modal v-if="classDetail != null" id="modal-open-class-1" class="modal-detail-class" centered>
          <p class="font-weight-bold pl-5 mb-5" style="font-size:18px">{{ classRequest.moduleName }} V.{{ classDetail.module.version }} <font-awesome-icon v-if="classDetail.module.hasExam" icon="file-signature" size="sm"/></p>
          <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
            <b-col sm="7">Jumlah Minimal Peserta</b-col>
            <b-col sm="3"><b-form-input v-model="inputMinMember" type="number" min="1"></b-form-input></b-col>
            <b-col sm="2">orang</b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
            <b-col sm="7">Jumlah Maksimal Peserta</b-col>
            <b-col sm="3"><b-form-input v-model="inputMaxMember" type="number" min="1"></b-form-input></b-col>
            <b-col sm="2">orang</b-col>
          </b-row>
          <p class="font-weight-bold pl-5 mb-1">{{ classDetail.module.timePerSession }} Menit / Sesi</p>
          <b-row class="pl-5 pb-2 pt-3">
            <b-col sm="10"></b-col>
            <b-col sm="2" class="text-center" v-if="classDetail.module.hasExam">Dengan Ujian</b-col>
          </b-row>
          <b-row class="pl-5" v-for="index in classDetail.module.totalSession" :key="index">
            <b-col sm="2" class="mt-2">Sesi {{ index }}</b-col>
            <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
            <b-col sm="1" class="mt-2">Pukul</b-col>
            <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
            <b-col sm="2" class="mt-2">WIB</b-col>
            <b-col sm="2" v-if="classDetail.module.hasExam" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
          </b-row>
          <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar materi yang harus diajarkan</p>
          <p v-html="classDetail.module.materialDescription"></p>
          <p class="font-weight-bold pl-5 mb-1">Materi yang telah diunggah</p>
          <ol class="pl-5 pb-3">
            <li class="ml-4 pl-2" v-for="material in classDetail.classroomMaterials" :key="material.id">
              <b-row>
                <b-col sm="7">
                  <a href="">{{ material.file }}</a>
                </b-col>
                <b-col sm="2">
                  <b-button v-b-modal="'modal-delete-file-' + material.id" variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
                </b-col>
              </b-row>
              <b-modal :id="'modal-delete-file-' + material.id" centered>
                Apakah Anda yakin ingin menghapus file {{ material.file }}?
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                  <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                  <b-button size="sm" variant="primary" @click="ok(); deleteFileMaterial(classRequest.classId, material.id)" style="width:100px">Ya</b-button>
                </template>
              </b-modal>
            </li>
          </ol>
          <div class="pl-5">
            <b-form-file v-model="fileBrowsed" class="mt-1 float-left" plain style="width: 40%"></b-form-file>
            <b-button @click="addFile(classRequest.classId)" variant="outline-dark" class="p-1">Upload File</b-button>
          </div>
          <!-- pop up footer -->
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
            <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
            <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Buka kelas</b-button>
          </template>
        </b-modal>
        <!-- Pop up decline class -->
        <b-modal :id="'modal-decline-class-'+classRequest.classId" centered>
          Apakah Anda yakin akan menolak permintaan kelas {{ classRequest.className }} ini?
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
            <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
            <b-button size="sm" variant="primary" @click="ok(); rejectClassRequest(classRequest.classId)" style="width:100px">Ya</b-button>
          </template>
        </b-modal>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      role: null,
      inputMinMember: 10,
      inputMaxMember: 50,
      classDetail: null,
      fileBrowsed: '',
      classDetailId: 0
    }
  },
  props: ['classRequests'],
  methods: {
    getClassDetail (classId) {
      this.$axios.get('http://komatikugm.web.id:13370/classrooms/' + classId, { withCredentials: true })
      .then(response => (this.classDetail = response.data.data.classroom))
      .catch(error => { console.log(error) })
    },
    joinRequestClass (classId) {
      this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
          classroomId: classId
      }, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getClassRequests()
        })
      .catch(error => console.log(error.response))
    },
    deleteFileMaterial (classId, materialId) {
      this.$axios
          .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials/' + materialId, {withCredentials: true})
          .then(response => {
            console.log(response)
            this.getClassDetail(classId)
          })
          .catch(error => { console.log(error.response) })
    },
    rejectClassRequest (classId) {
      this.$axios.delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_requests/_reject', { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getClassRequests()
      })
      .catch(error => console.log(error.response))
    },
    addFile (classId) {
        const formData = new FormData()
        formData.append('file', this.fileBrowsed)
        formData.append('id', classId)
        this.classDetailId = classId
        this.$axios
            .post('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials', formData, {withCredentials: true})
            .then(response => {
              console.log(response)
              this.getClassDetail(classId)
            })
            .catch(error => { console.log(error.response) })
    }
  },
  created () {
    this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
      .then(response => {
        let originalRole = response.data.role
        if (originalRole === 'TRAINER' && localStorage.role === 'TRAINEE') {
          this.role = localStorage.role
        } else {
          this.role = originalRole
        }
      })
      .catch(error => { console.log(error) })
  }
}
</script>

<style scoped>
div.topClassRequested{
  min-width: 100%;
}
div.topClassRequested .card-body{
  padding: 8px 20px;
}
div.topClassRequested .topClassRequestedModuleName{
  font-size: 17px;
}
div.topClassRequested .topClassRequestedTime{
  font-size: 12px;
}
div.topClassRequested .btnCancelJoinClassRequest, div.topClassRequested .btnJoinClassRequest{
  width: 120px
}
</style>
