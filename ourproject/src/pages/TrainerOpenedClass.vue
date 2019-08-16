<template>
    <div id="trainerOpenedClass" class="px-5">
        <h2 class="font-weight-bold mb-4">Kelas yang Dibuka</h2>
        <!-- content -->
        <div id="cardClassOpened" class="mx-2 my-3">
            <div v-if="openedClasses == ''" class="text-center py-5">
                <b-img :src="require('./../assets/images/no-data-found.png')" style="width:100px"></b-img>
                <h5 class="mt-3">Tidak ada kelas yang sedang dibuka</h5>
            </div>
            <div v-else-if="openedClasses == null" class="text-center pt-3">
                <b-spinner label="Spinning"></b-spinner>
            </div>
            <div v-else class="p-3">
                <b-card-group deck>
                    <b-card class="classOpened mb-2 pointer" v-for="openedClass in openedClasses" :key="openedClass.id">
                        <div>
                            <b-card-text  v-b-modal="'modal-detail-class-'+openedClass.id" class="classOpenedPersent position-absolute font-weight-bold purpleColor" style="top:0;right:5px">{{ countPercentage(openedClass.classroomSessions) }}</b-card-text>
                            <b-card-text  v-b-modal="'modal-detail-class-'+openedClass.id" class="classOpenedName mb-1 ">{{ openedClass.name }}</b-card-text>
                            <b-card-text  v-b-modal="'modal-detail-class-'+openedClass.id" class="classOpenedModuleName font-weight-old mb-0">{{ openedClass.module.name }} V.{{ openedClass.module.version }} <font-awesome-icon v-if="openedClass.module.hasExam" icon="file-signature" size="sm"/></b-card-text>
                            <b-card-text  v-b-modal="'modal-detail-class-'+openedClass.id" class="classOpenedCategory mb-2">Kategori : {{ openedClass.module.moduleCategory.name }}</b-card-text>
                            <b-button variant="primary" class="float-right py-0 mt-3" v-b-modal="'modal-close-class-'+openedClass.id">Tutup kelas</b-button>
                            <b-card-text class="classOpenedNextSession purpleColor">Sesi berikutnya : {{ nextSession(openedClass.classroomSessions) }}</b-card-text>
                        </div>
                        <!-- Pop up -->
                        <b-modal :id="'modal-detail-class-'+openedClass.id" class="modal-detail-class" centered>
                            <h5 class="pl-5">{{ openedClass.name }}</h5>
                            <p class="font-weight-bold pl-5" style="font-size:18px">{{ openedClass.module.name }} V.{{ openedClass.module.version }} <font-awesome-icon v-if="openedClass.module.hasExam" icon="file-signature" size="sm"/></p>
                            <p class="font-weight-bold pl-5 mb-1">Jumlah peserta = {{openedClass.classroomResults.length}} orang</p>
                            <p class="font-weight-bold pl-5 mb-1">Jumlah pendaftar = {{openedClass.classroomResults.length + openedClass.classroomRequests.length}} orang</p>
                            <p class="font-weight-bold pl-5 mb-1">{{ openedClass.module.timePerSession }} menit / sesi</p>
                            <light-timeline :items='openedClass.classroomSessions'>
                                <template slot='content' slot-scope='{ item }'>
                                    {{item.startTime | moment("DD MMMM YYYY hh:mm")}} <span v-if="item.exam" style="color:red">(EXAM)</span>
                                </template>
                            </light-timeline>
                            <p class="font-weight-bold pl-5 mb-1">Daftar materi yang harus diajarkan</p>
                            <p class="pl-5" v-html="openedClass.module.materialDescription"></p>
                            <p class="font-weight-bold pl-5 mb-1">Materi yang telah diunggah</p>
                            <ol class="pl-5 pb-3">
                                <li class="ml-4 pl-2" v-for="material in openedClass.classroomMaterials" :key="material.id">
                                <b-row>
                                    <b-col sm="4">
                                    <a href="">{{ material.file | ellipsis }}</a>
                                    </b-col>
                                    <b-col sm="2">
                                    <b-button @click="deleteFileMaterial(openedClass.id, material.id)" variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
                                    </b-col>
                                </b-row>
                                </li>
                            </ol>
                            <div class="pl-5">
                                <b-form-file v-model="fileBrowsed" class="mt-1 float-left" plain style="width: 40%"></b-form-file>
                                <b-button @click="addFile(openedClass.id)" variant="outline-dark" class="p-1">Upload File</b-button>
                            </div>
                            <!-- pop up footer -->
                            <template slot="modal-footer" slot-scope="{ ok }">
                                <b-button size="sm" variant="primary" @click="ok()" style="width:100px">
                                Selesai
                                </b-button>
                            </template>
                        </b-modal>
                        <!-- Pop up decline class -->
                        <b-modal :id="'modal-close-class-'+openedClass.id" centered>
                            Apakah Anda yakin akan menutup kelas "{{openedClass.name}}"?
                            <br/>
                            (Anda bisa membuka kelas "{{openedClass.name}}" lagi di lain waktu)
                            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                                <b-button size="sm" variant="primary" @click="ok(); closeClass(openedClass.id, openedClass.name, openedClass.trainer.email)" style="width:100px">Ya</b-button>
                            </template>
                        </b-modal>
                    </b-card>
                </b-card-group>
                <pagination :totalPages="totalPages" :page.sync="page" class="mt-3 paginationWhiteBackground"></pagination>
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
      openedClasses: null,
      selectCategory: 'all',
      selectExam: 'all',
      fileBrowsed: null,
      totalPages: 0,
      page: 0,
      size: 15
    }
  },
  components: {
    'pagination': Pagination
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
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
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
            })
            .catch(error => { console.log(error.response) })
    },
    deleteFileMaterial (classId, materialId) {
        this.$axios
            .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials/' + materialId, {withCredentials: true})
            .then(response => {
                console.log(response)
                this.getContentPage(this.page)
            })
            .catch(error => { console.log(error.response) })
    },
    closeClass (classId, className, trainerEmail) {
        this.$axios
            .put('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId, {
                name: className,
                status: 'closed',
                trainerEmail: trainerEmail
            }, {withCredentials: true})
            .then(response => {
                console.log(response)
                this.getContentPage(this.page)
            })
            .catch(error => { console.log(error.response) })
    },
    countPercentage (classSessions) {
        var count = 0
        for (var i = 0; i < classSessions.length; i++) {
            if (classSessions[i].startTime < new Date()) {
                count++
            }
        }
        return (count / classSessions.length * 100 + '%')
    },
    nextSession (classSessions) {
        for (var i = 0; i < classSessions.length; i++) {
            if (classSessions[i].startTime > new Date()) {
                return this.$moment(classSessions[i].startTime).format('DD MMMM YYYY hh:mm')
            } else if (i === classSessions.length - 1) {
                return 'sudah selesai'
            }
        }
    },
    getModuleCategories () {
        this.$axios
        .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
        .then(response => (this.moduleCategories = response.data.data.content))
        .catch(error => { console.log(error.response) })
    },
    getContentPage (page) {
        this.page = page
        this.$axios
        .get('http://komatikugm.web.id:13370/_trainer/classrooms?page=' + this.page + '&size=' + this.size + '&status=open', {withCredentials: true})
        .then(response => {
            this.openedClasses = response.data.data.content
            this.totalPages = response.data.data.totalPages
        })
        .catch(error => { console.log(error.response) })
    }
  },
  created () {
    this.setLayout('trainer-layout')
    this.$store.commit('SET_SIDEBARMENU', 0)
    window.scrollTo(0, 0)
  },
  mounted () {
    this.getModuleCategories()
    this.getContentPage(0)
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
.classOpened{
  max-width: calc(33.3% - 30px);
  min-width: calc(33.3% - 30px);
}
.classOpened:hover {
    background: rgba(255, 255, 255, 60%) !important
}
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
/* session */
.line-item{
    color: black
}
.item-circle{
    border-color: #0A87C0 !important
}
.line-container .item-circle{
    background: #0A87C0 !important
}
</style>
