<template>
<div class="px-5">
	<h2 class="font-weight-bold mb-4" v-if="editClass==false">Detail Kelas</h2>
  <h2 class="font-weight-bold mb-4" v-else>Edit Kelas</h2>
  <div class="fadedWhiteBackground px-2 py-2">
    <div class="detailModul mt-3 mx-3">
      <b-row>
        <b-col>
          <b-row class="my-2">
            <b-col sm="2">
              <label class="mt-2">Kelas</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" :disabled="editClass==false" v-model="detailCr.name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled v-model="detailCrModule.name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Versi</label>
            </b-col>
            <b-col sm="6">
              <b-form-input type="number" disabled v-model="detailCrModule.version"></b-form-input>
            </b-col>
            <b-col sm="3">
              <label v-if="detailCrModule.hasExam==true" class="mt-1" style="float: right; color: red"><b>(Terdapat ujian)</b></label>
              <label v-else class="mt-1" style="float: right; color: blue"><b>(Tidak terdapat ujian)</b></label>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Pelatih</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled value="Nama Pelatih" v-model="detailCrTrainer.fullname"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label class="mt-2">Sesi Kelas</label>
            </b-col>
          </b-row>
          <b-row class="pl-3 pb-2">
              <b-col sm="10"></b-col>
              <b-col sm="2">Dengan Ujian</b-col>
          </b-row>
          <b-row class="ml-3 my-2" v-for="(item, index) in detailCr.classroomSessions" :key="index">
            <!-- <p>{{new Date(arrDate[index])}}</p> -->
              <b-col sm="2" class="mt-2">{{ item.description }}</b-col>
              <b-col sm="3">
                  <date-picker :disabled="editClass==false" v-model="arrDate[index]" :config="{format: 'DD/MM/YYYY'}"></date-picker>
                  <!-- <b-form-input type="date" :disabled="editClass==false" v-model="arrDate[index]"></b-form-input> -->
              </b-col>
              <!-- <b-col sm="3" class="mt-2">{{arrDate[index] | moment("DD-MM-YYYY")}}</b-col> -->
              <b-col sm="1" class="mt-2">Pukul</b-col>
              <b-col sm="2">
                <date-picker :disabled="editClass==false" v-model="arrTime[index]" :config="{format: 'HH:mm'}"></date-picker>
                <!-- <b-form-input type="time" :disabled="editClass==false" v-model="item.startTime"></b-form-input> -->
              </b-col>
              <!-- <b-col sm="2" class="mt-2">{{item.startTime | moment("hh:mm:ss")}}</b-col> -->
              <b-col sm="2" class="mt-2">WIB</b-col>
              <b-col sm="2" class="text-center" ><b-form-checkbox @change="changeCheck(index)" :checked="item.exam==true" :disabled="editClass==false"></b-form-checkbox></b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col>
              <label class="mt-2">Materi</label>
            </b-col>
          </b-row>
            <ol>
                <li class="py-2" v-for="material in material" :key="material.id">
                    <b-row>
                        <b-col>
                            <a :href="'http://komatikugm.web.id:13371/'+ material.file" target="_blank">{{ material.file | ellipsis }}</a>
                        </b-col>
                        <b-col cols="2">
                            <b-button variant="outline-dark" class="py-0" @click="deleteFileMaterial(detailCr.id, material.id)" v-if="editClass==true">Hapus</b-button>
                        </b-col>
                    </b-row>
                </li>
            </ol>
            <div class="pl-5" v-if="editClass==true">
              <b-form-file v-model="fileBrowsed" class="mt-1 float-left" plain style="width: 40%"></b-form-file>
              <b-button @click="addFile(detailCr.id)" variant="outline-dark" class="p-1">Upload File</b-button>
            </div>
        </b-col>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">Status</label>
            </b-col>
            <b-col sm="8">
              <b-form-select v-model="selectedStatus" v-if="editClass==true">
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </b-form-select>
              <b-form-input type="text" v-if="editClass==false" disabled :value="selectedStatus=='open' ? 'Open' : 'Closed'"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Pendaftar</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" disabled v-model="detailClass.memberCount"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Orang</label>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Minimal Peserta</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" :disabled="editClass==false" v-model="detailCr.min_member"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Orang</label>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Maksimal Peserta</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" :disabled="editClass==false" v-model="detailCr.max_member"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Orang</label>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div class="col-12 d-flex py-3">
        <div class="mr-auto">
            <router-link to="/admin/all-classes">
                <b-button variant="primary" class="btnBack">Kembali</b-button>
            </router-link>
        </div>
        <div class="ml-auto">
          <b-button variant="dark" class="btnCancelClass mr-2" v-if="editClass==true" @click="editClass = false">Batal</b-button>
          <b-button variant="primary" class="btnSaveClass" v-if="editClass==true" @click="editClassr(detailCr.id,detailCr.max_member,detailCr.min_member,detailCr.name,selectedStatus,detailCrModule.totalSession)">Simpan</b-button>
          <b-button variant="primary" class="btnEditClass" v-if="editClass==false" @click="editClass = true">Edit</b-button>
        </div>
      </div>
    </div>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      detailClass: '',
      detailCr: '',
      detailCrModule: '',
      detailCrTrainer: '',
      editClass: false,
      selectedStatus: '',
      material: null,
      fileBrowsed: '',
      arrIdSession: [],
      arrDate: [],
      arrTime: [],
      tempDate: [],
      tempTime: [],
      arrClass: []
    }
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
  },
  methods: {
    getRefresh (classId) {
        this.$axios
          .get('http://komatikugm.web.id:13370/classrooms/' + classId, {withCredentials: true})
          .then(response => {
            this.detailClass = response.data.data
            this.detailCr = response.data.data.classroom
            this.detailCrModule = response.data.data.classroom.module
            this.detailCrTrainer = response.data.data.classroom.trainer
            this.selectedStatus = response.data.data.classroom.status
            this.material = response.data.data.classroom.classroomMaterials
            this.arrDate.length = response.data.data.classroom.classroomSessions.length
            this.arrTime.length = response.data.data.classroom.classroomSessions.length
            this.tempDate.length = response.data.data.classroom.classroomSessions.length
            this.tempTime.length = response.data.data.classroom.classroomSessions.length
            this.arrClass.length = response.data.data.classroom.classroomSessions.length
            this.arrIdSession.length = response.data.data.classroom.classroomSessions.length
            for (var index = 0; index < response.data.data.classroom.classroomSessions.length; index++) {
              this.changeFormat(index, response.data.data.classroom.classroomSessions[index].startTime)
              this.arrIdSession[index] = response.data.data.classroom.classroomSessions[index].id
            }
          })
          .catch(error => { console.log(error.response) })
    },
    deleteFileMaterial (classId, materialId) {
      this.$axios
          .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials/' + materialId, {withCredentials: true})
          .then(response => {
            console.log(response)
            this.getRefresh(classId)
          })
          .catch(error => { console.log(error.response) })
    },
    addFile (classId) {
      const formData = new FormData()
      formData.append('file', this.fileBrowsed)
      formData.append('id', classId)
      this.$axios
          .post('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials', formData, {withCredentials: true})
          .then(response => {
            console.log(response)
            this.getRefresh(classId)
            })
          .catch(error => { console.log(error.response) })
    },
    editClassr (classId, iMax, iMin, iName, iStatus, ttlSession) {
      if (iName === '' || iMin === '' || Number(iMin) < 5 || iMax === '' || Number(iMax) < Number(iMin)) {
        if (iName === '') {
          alert('Nama kelas tidak boleh kosong')
        }
        if (iMin === '' || Number(iMin) < 5) {
          alert('Jumlah minimal peserta sebanyak 5 orang')
        }
        if (iMax === '' || Number(iMax) < Number(iMin)) {
          alert('Jumlah maksimal peserta tidak kurang dari ' + iMin + ' orang')
        }
      } else {
        for (var index = 0; index < Number(ttlSession); index++) {
          if ((this.arrDate[index] !== this.tempDate[index]) || (this.arrTime[index] !== this.tempTime[index])) {
            if ((this.arrDate[index] !== this.tempDate[index]) && (this.arrTime[index] === this.tempTime[index])) {
              // eslint-disable-next-line
              this.arrDate[index] = this.arrDate[index].match(/(\d{2})\/(\d{2})\/(\d{4})/)
              this.arrDate[index] = new Date(this.arrDate[index][3], this.arrDate[index][2] - 1, this.arrDate[index][1], this.arrTime[index].getHours(), this.arrTime[index].getMinutes()).getTime()
            } else if ((this.arrTime[index] !== this.tempTime[index]) && (this.arrDate[index] === this.tempDate[index])) {
              // eslint-disable-next-line
              this.arrTime[index] = this.arrTime[index].match(/(\d{2}):(\d{2})/)
              this.arrDate[index] = new Date(this.arrDate[index].getFullYear(), this.arrDate[index].getMonth(), this.arrDate[index].getDate(), this.arrTime[index][1], this.arrTime[index][2]).getTime()
            } else {
              this.arrDate[index] = this.arrDate[index].match(/(\d{2})\/(\d{2})\/(\d{4})/)
              this.arrTime[index] = this.arrTime[index].match(/(\d{2}):(\d{2})/)
              this.arrDate[index] = new Date(this.arrDate[index][3], this.arrDate[index][2] - 1, this.arrDate[index][1], this.arrTime[index][1], this.arrTime[index][2]).getTime()
            }
          } else {
            this.arrDate[index] = this.arrDate[index].getTime()
          }
          this.arrClass[index] = {
            description: 'Sesi ' + (index + 1),
            exam: this.detailCr.classroomSessions[index].exam,
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
            trainerEmail: this.detailCrTrainer.email
          }, { withCredentials: true })
          .then(response => {
            console.log(response)
            this.editClass = false
            this.getRefresh(classId)
            })
          .catch(error => {
            console.log(error.response)
            alert(error.response.data.message)
            })
      }
    },
    changeFormat (idx, item) {
      this.arrDate[idx] = new Date(item)
      this.arrTime[idx] = new Date(item)
      this.tempDate[idx] = this.arrDate[idx]
      this.tempTime[idx] = this.arrTime[idx]
    },
    changeCheck (idx) {
      if (this.detailCr.classroomSessions[idx].exam === true) {
        this.detailCr.classroomSessions[idx].exam = false
      } else {
        this.detailCr.classroomSessions[idx].exam = true
      }
    },
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.getRefresh(this.$route.params.classId)
  },
  watch: {
    editClass () {
      if (this.editClass === false) {
        this.getRefresh(this.$route.params.classId)
      }
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
