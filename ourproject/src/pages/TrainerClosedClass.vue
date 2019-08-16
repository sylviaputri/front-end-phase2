<template>
    <div id="trainerClosedClass" class="px-5">
        <h2 class="font-weight-bold mb-4">Kelas yang Ditutup</h2>
        <!-- content -->
        <div id="cardClassClosed" class="mx-2 my-3">
            <div v-if="closedClasses == ''" class="text-center py-5">
                <b-img :src="require('./../assets/images/no-data-found.png')" style="width:100px"></b-img>
                <h5 class="mt-3">Tidak ada kelas yang sedang ditutup</h5>
            </div>
            <div v-else-if="closedClasses == null" class="text-center pt-3">
                <b-spinner label="Spinning"></b-spinner>
            </div>
            <div v-else>
                <b-card-group deck>
                    <b-card class="classClosed pointer mb-2" v-for="closedClass in closedClasses" :key="closedClass.id">
                        <b-card-text class="classClosedName mb-1" v-b-modal="'modal-detail-class'" @click="getDetailClass(closedClass.id)">{{ closedClass.name }}</b-card-text>
                        <b-card-text class="classClosedModuleName font-weight-bold mb-0" v-b-modal="'modal-detail-class'" @click="getDetailClass(closedClass.id)">{{ closedClass.module.name }} V.{{ closedClass.module.version }} <font-awesome-icon v-if="closedClass.module.hasExam" icon="file-signature" size="sm"/></b-card-text>
                        <b-card-text class="classClosedCategory mb-2" v-b-modal="'modal-detail-class'" @click="getDetailClass(closedClass.id)">Kategori : {{ closedClass.module.moduleCategory.name }}</b-card-text>
                        <b-button variant="primary" class="float-right py-0" v-b-modal="'modal-delete-class-'+closedClass.id">Hapus kelas</b-button>
                        <!-- Pop up delete class -->
                        <b-modal :id="'modal-delete-class-'+closedClass.id" centered>
                            Apakah Anda yakin ingin menghapus kelas {{ closedClass.name }}?
                            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                            <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                            <b-button size="sm" variant="primary" @click="ok(); deleteClosedClass(closedClass.id)" style="width:100px">Ya</b-button>
                            </template>
                        </b-modal>
                    </b-card>
                </b-card-group>
                <!-- Pop up detail class -->
                <b-modal id="modal-detail-class" class="modal-detail-class" centered v-if="detailClass != null">
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
                            <a href="">{{ material.file | ellipsis }}</a>
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
                        <b-button size="sm" variant="primary" @click="ok(); editClassr(detailClass.classroom.id, detailClass.classroom.max_member, detailClass.classroom.min_member, detailClass.classroom.name, 'open', detailClass.classroom.module.totalSession)" style="width:100px">Buka kelas</b-button>
                    </template>
                    </b-modal>
                <pagination :totalPages="totalPages" :page.sync="page" class="mt-5 paginationWhiteBackground"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
        moduleCategories: null,
        selectCategory: 'all',
        selectExam: 'all',
        inputMinMember: 10,
        inputMaxMember: 50,
        detailClass: null,
        closedClasses: null,
        fileBrowsed: '',
        totalPages: 0,
        page: 0,
        size: 15,
        arrDate: [],
        arrTime: [],
        material: null,
        arrIdSession: [],
        arrClass: []
    }
  },
  components: {
    'pagination': Pagination
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    getDetailClass (classId) {
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
          .catch(error => { console.log(error.response) })
    },
    changeCheck (idx) {
      if (this.detailClass.classroom.classroomSessions[idx].exam === true) {
        this.detailClass.classroom.classroomSessions[idx].exam = false
      } else {
        this.detailClass.classroom.classroomSessions[idx].exam = true
      }
    },
    deleteClosedClass (classId) {
        this.$axios
            .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId, {withCredentials: true})
            .then(response => {
                console.log(response)
                this.getContentPage(this.page)
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
                this.getContentPage(this.page)
                this.getDetailClass(classId)
            })
            .catch(error => { console.log(error.response) })
    },
    deleteFileMaterial (classId, materialId) {
        this.$axios
            .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials/' + materialId, {withCredentials: true})
            .then(response => {
                console.log(response)
                this.getContentPage(this.page)
                this.getDetailClass(classId)
            })
            .catch(error => { console.log(error.response) })
    },
    getCategories () {
      this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
      .catch(error => { console.log(error.response) })
    },
    getContentPage (page) {
        this.page = page
        this.$axios
        .get('http://komatikugm.web.id:13370/_trainer/classrooms?page=' + this.page + '&size=' + this.size + '&status=closed', {withCredentials: true})
        .then(response => {
            this.closedClasses = response.data.data.content
            this.totalPages = response.data.data.totalPages
        })
        .catch(error => { console.log(error.response) })
    },
    editClassr (classId, iMax, iMin, iName, iStatus, ttlSession) {
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
          this.getContentPage(0)
          })
        .catch(error => (console.log(error.response)))
    }
  },
  created () {
    this.setLayout('trainer-layout')
    window.scrollTo(0, 0)
  },
  filters: {
    ellipsis (value) {
        if (value.length >= 20) {
            return value.slice(0, 20) + ' ...'
        } else {
            return value
        }
    }
  },
  mounted () {
    this.getContentPage(0)
    this.getCategories()
  }
}
</script>

<style>
html {
  background: url('./../assets/background_images/apps_page.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.classClosed{
  max-width: calc(33.3% - 30px);
  min-width: calc(33.3% - 30px);
}
.classClosed:hover {
    background: rgba(255, 255, 255, 60%) !important
}
.classClosed .card-body{
    padding-bottom: 3px;
    padding-right: 3px
}
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
</style>
