<template>
  <div>
    <b-card-group id="cardGroupTopClassRequested" class="my-3 px-2">
      <b-card class="topClassRequested my-1" v-for="classRequest in classRequests" :key="classRequest.classId">
        <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">{{ classRequest.moduleName }}</b-card-text>
        <b-card-text class="topClassRequestedName mb-0">Kelas : {{ classRequest.className }}</b-card-text>
        <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : {{ classRequest.trainerName }}</b-card-text>
        <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh {{ classRequest.requesterCount }} orang</b-card-text>
        <b-card-footer v-if="role === 'TRAINEE'" class="border-0 p-0 m-0 grayColor" style="background:transparent">
          <b-card-text class="topClassRequestedTime float-left mb-0">{{ classRequest.createdAt | moment("DD-MM-YYYY HH:mm:ss") }}</b-card-text>
          <b-button v-if="classRequest.hasVote || classRequest.hasVote == null" @click="joinRequestClass(classRequest.classId)" variant="dark" class="btnCancelJoinClassRequest float-right">Batal</b-button>
          <b-button v-else @click="joinRequestClass(classRequest.classId)" variant="primary" class="btnJoinClassRequest float-right">Bergabung</b-button>
        </b-card-footer>
        <b-card-footer v-else-if="role === 'TRAINER' || role === 'ADMIN'" class="border-0 p-0 m-0 grayColor" style="background:transparent">
          <b-card-text class="trainerClassRequestedTime float-left mb-0">{{ classRequest.createdAt | moment("DD-MM-YYYY HH:mm:ss") }}</b-card-text>
          <b-button variant="primary" @click="getClassDetail(classRequest.classId)" v-b-modal="'modal-open-class'" class="btn openClassRequested float-right">Buka Kelas</b-button>
          <b-button variant="dark" v-b-modal="'modal-decline-class-'+classRequest.classId" class="declineClassRequested float-right mr-3">Tolak</b-button>
        </b-card-footer>
        <!-- Pop up open class -->
        <b-modal id="modal-open-class" class="modal-open-class" centered v-if="detailClass != null">
          <p class="font-weight-bold pl-5 mb-5" style="font-size:18px">{{ detailClass.classroom.module.name }} V.{{ detailClass.classroom.module.version }} <font-awesome-icon v-if="detailClass.classroom.module.hasExam" icon="file-signature" size="sm"/></p>
          <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
            <b-col sm="7">Jumlah Minimal Peserta</b-col>
            <b-col sm="3"><b-form-input v-model="detailClass.classroom.min_member" type="number" min="1"></b-form-input></b-col>
            <b-col sm="2">orang</b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
            <b-col sm="7">Jumlah Maksimal Peserta</b-col>
            <b-col sm="3"><b-form-input v-model="detailClass.classroom.max_member" type="number" min="1"></b-form-input></b-col>
            <b-col sm="2">orang</b-col>
          </b-row>
          <p class="font-weight-bold pl-5 mb-1">{{ detailClass.classroom.module.timePerSession }} Menit / Sesi</p>
          <b-row class="pl-5 pb-2 pt-3">
            <b-col sm="10"></b-col>
            <b-col sm="2" class="text-center" v-if="detailClass.classroom.module.hasExam">Dengan Ujian</b-col>
          </b-row>
          <b-row class="pl-5" v-for="(item, index) in detailClass.classroom.classroomSessions" :key="index">
            <b-col sm="2" class="mt-2">{{ item.description = 'Sesi ' + (index + 1) }}</b-col>
            <b-col sm="3">
              <date-picker v-model="arrDate[index]" :config="{format: 'DD/MM/YYYY'}"></date-picker>
            </b-col>
            <b-col sm="1" class="mt-2">Pukul</b-col>
            <b-col sm="2">
              <date-picker v-model="arrTime[index]" :config="{format: 'HH:mm'}"></date-picker>
            </b-col>
            <b-col sm="2" class="mt-2">WIB</b-col>
            <b-col sm="2" v-if="detailClass.classroom.module.hasExam" class="text-center">
              <b-form-checkbox @change="changeCheck(index)" :checked="item.exam==true"></b-form-checkbox>
            </b-col>
          </b-row>
          <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar materi yang harus diajarkan</p>
          <p v-html="detailClass.classroom.module.materialDescription" class="pl-5"></p>
          <p class="font-weight-bold pl-5 mb-1">Materi yang telah diunggah</p>
          <ol class="pl-5 pb-3">
            <li class="ml-4 pl-2" v-for="material in detailClass.classroom.classroomMaterials" :key="material.id">
            <b-row>
              <b-col sm="4">
              <a :href="'http://komatikugm.web.id:13371/'+ material.file" target="_blank">{{ material.file | ellipsis }}</a>
              </b-col>
              <b-col sm="2">
              <b-button @click="deleteFileMaterial(detailClass.classroom.id, material.id)" variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
              </b-col>
            </b-row>
            </li>
          </ol>
          <div class="pl-5">
            <b-form-file v-model="fileBrowsed" class="mt-1 float-left" plain style="width: 40%"></b-form-file>
            <b-button @click="addFile(detailClass.classroom.id)" variant="outline-dark" class="p-1">Upload File</b-button>
          </div>
          <!-- pop up footer -->
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
            <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
            <b-button size="sm" variant="primary" @click="addClass(detailClass.classroom.id, detailClass.classroom.max_member, detailClass.classroom.min_member, detailClass.classroom.name, 'open', detailClass.classroom.module.totalSession);  if (vValid==true) { ok(); vValid=false }" style="width:100px">Buka kelas</b-button>
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
      detailClass: null,
      fileBrowsed: '',
      classDetailId: 0,
      arrDate: [],
      arrTime: [],
      material: null,
      arrIdSession: [],
      arrClass: [],
      vValid: false
    }
  },
  props: ['classRequests'],
  methods: {
    getClassDetail (classId) {
      this.$axios.get('http://komatikugm.web.id:13370/classrooms/' + classId, {withCredentials: true})
      .then(response => {
        this.detailClass = response.data.data
        this.material = response.data.data.classroom.classroomMaterials
        this.arrDate.length = response.data.data.classroom.classroomSessions.length
        this.arrTime.length = response.data.data.classroom.classroomSessions.length
        this.arrClass.length = response.data.data.classroom.classroomSessions.length
        this.arrIdSession.length = response.data.data.classroom.classroomSessions.length
        for (var index = 0; index < response.data.data.classroom.classroomSessions.length; index++) {
          this.arrIdSession[index] = response.data.data.classroom.classroomSessions[index].id
        }
      })
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    changeCheck (idx) {
      if (this.detailClass.classroom.classroomSessions[idx].exam === true) {
        this.detailClass.classroom.classroomSessions[idx].exam = false
      } else {
        this.detailClass.classroom.classroomSessions[idx].exam = true
      }
    },
    addClass (classId, iMax, iMin, iName, iStatus, ttlSession) {
      if (iName === '' || iMin === '' || Number(iMin) < 5 || iMax === '' || Number(iMax) < Number(iMin)) {
        if (iName === '') {
          alert('Nama kelas harus diisi')
        }
        if (iMin === '' || Number(iMin) < 5) {
          alert('Jumlah minimum peserta sebanyak 5 orang')
        }
        if (iMax === '' || Number(iMax) < Number(iMin)) {
          alert('Jumlah maksimal peserta tidak kurang dari ' + this.iMin + ' orang')
        }
      } else {
        for (var index = 0; index < Number(ttlSession); index++) {
          this.arrDate[index] = this.arrDate[index].match(/(\d{2})\/(\d{2})\/(\d{4})/)
          this.arrTime[index] = this.arrTime[index].match(/(\d{2}):(\d{2})/)
          this.arrDate[index] = new Date(this.arrDate[index][3], this.arrDate[index][2] - 1, this.arrDate[index][1], this.arrTime[index][1], this.arrTime[index][2]).getTime()
          this.arrClass[index] = {
            description: 'Sesi ' + (index + 1),
            exam: this.detailClass.classroom.classroomSessions[index].exam,
            id: this.arrIdSession[index],
            startTime: this.arrDate[index]
          }
        }
        this.$axios.put('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId, {
          classroomSessions: this.arrClass,
          maxMember: Number(iMax),
          minMember: Number(iMin),
          name: iName,
          status: iStatus,
          trainerEmail: this.detailClass.classroom.trainer.email
        }, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.$axios.delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_requests/_reject', { withCredentials: true })
          .then(response => {
            console.log(response)
            this.$parent.getContentPage(0)
          })
        })
        .catch(error => {
          console.log(error.response)
          var errorMessage = error.response.data.message
          if (Array.isArray(errorMessage)) {
            var errorMessageArray = ''
            for (var i = 0; i < errorMessage.length; i++) {
              errorMessageArray += errorMessage[i] + ' '
            }
            alert(errorMessageArray)
          } else alert(errorMessage)
        })
      }
    },
    joinRequestClass (classId) {
      this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
          classroomId: classId
      }, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getContentPage(0)
        })
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    deleteFileMaterial (classId, materialId) {
      this.$axios
      .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials/' + materialId, {withCredentials: true})
      .then(response => {
        console.log(response)
        this.getClassDetail(classId)
      })
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    rejectClassRequest (classId) {
      this.$axios.delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_requests/_reject', { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getContentPage(0)
      })
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
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
        .catch(error => {
          console.log(error.response)
          var errorMessage = error.response.data.message
          if (Array.isArray(errorMessage)) {
            var errorMessageArray = ''
            for (var i = 0; i < errorMessage.length; i++) {
              errorMessageArray += errorMessage[i] + ' '
            }
            alert(errorMessageArray)
          } else alert(errorMessage)
        })
    }
  },
  created () {
    this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
    .then(response => {
      let originalRole = response.data.role
      if (originalRole === 'TRAINER' && localStorage.roleSwitch === 'TRAINEE') {
        this.role = localStorage.roleSwitch
      } else {
        this.role = originalRole
      }
    })
    .catch(error => {
      console.log(error.response)
      var errorMessage = error.response.data.message
      if (Array.isArray(errorMessage)) {
        var errorMessageArray = ''
        for (var i = 0; i < errorMessage.length; i++) {
          errorMessageArray += errorMessage[i] + ' '
        }
        alert(errorMessageArray)
      } else alert(errorMessage)
    })
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      else if (value.length >= 20) {
          return value.slice(0, 20) + ' ...'
      } else {
          return value
      }
    }
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
