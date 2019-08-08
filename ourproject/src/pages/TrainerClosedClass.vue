<template>
    <div id="trainerClosedClass" class="px-5">
        <h2 class="font-weight-bold mb-4">Kelas yang Ditutup</h2>
        <!-- searching tools -->
        <!-- <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
            <b-row>
                <b-col cols="4">
                    <b-row>
                        <b-col>
                            <b-input-group>
                                <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                                <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                </b-col>
                <b-col cols="6">
                    <b-row>
                        <b-col class="mr-3">
                            <font-awesome-icon icon="shapes" class="position-absolute" style="top:18px; left:-8px"/>
                            <b-form-select v-model="selectCategory" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                                <option value="all">Semua Kategori</option>
                                <option v-for="category in moduleCategories" :key="category.id" :value="category.id">{{category.name}}</option>
                            </b-form-select>
                        </b-col>
                        <b-col class="mr-3">
                            <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                            <b-form-select v-model="selectExam" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                                <option value="all">ujian dan tanpa ujian</option>
                                <option value="0">tanpa ujian</option>
                                <option value="1">ujian</option>
                            </b-form-select>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div> -->
        <!-- content -->
        <div id="cardClassClosed" class="mx-2 my-3">
            <div v-if="closedClasses == ''" class="text-center py-5">
                <b-img :src="require('./../assets/images/no-data-found.png')" style="width:100px"></b-img>
                <h5 class="mt-3">Tidak ada kelas yang sedang ditutup</h5>
            </div>
            <div v-else-if="closedClasses == null" class="text-center pt-3">
                <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-card-group v-else deck>
                <b-card class="classClosed pointer mb-2" v-for="closedClass in closedClasses" :key="closedClass.id">
                    <b-card-text class="classClosedName mb-1" v-b-modal="'modal-detail-class-'+closedClass.id">{{ closedClass.name }}</b-card-text>
                    <b-card-text class="classClosedModuleName font-weight-bold mb-0" v-b-modal="'modal-detail-class-'+closedClass.id">{{ closedClass.module.name }} V.{{ closedClass.module.version }} <font-awesome-icon v-if="closedClass.module.hasExam" icon="file-signature" size="sm"/></b-card-text>
                    <b-card-text class="classClosedCategory mb-2" v-b-modal="'modal-detail-class-'+closedClass.id">Kategori : {{ closedClass.module.moduleCategory.name }}</b-card-text>
                    <b-button variant="primary" class="float-right py-0" v-b-modal="'modal-delete-class-'+closedClass.id">Hapus kelas</b-button>
                    <!-- Pop up detail class -->
                    <b-modal :id="'modal-detail-class-'+closedClass.id" class="modal-detail-class" centered>
                        <p class="font-weight-bold pl-5 mb-5" style="font-size:18px">{{ closedClass.module.name }} V.{{ closedClass.module.version }} <font-awesome-icon v-if="closedClass.module.hasExam" icon="file-signature" size="sm"/></p>
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
                        <p class="font-weight-bold pl-5 mb-1">{{ closedClass.module.timePerSession }} Menit / Sesi</p>
                        <b-row class="pl-5 pb-2 pt-3">
                            <b-col sm="10"></b-col>
                            <b-col sm="2" class="text-center" v-if="closedClass.module.hasExam">Dengan Ujian</b-col>
                        </b-row>
                        <b-row class="pl-5" v-for="index in closedClass.module.totalSession" :key="index">
                            <b-col sm="2" class="mt-2">Sesi {{ index }}</b-col>
                            <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
                            <b-col sm="1" class="mt-2">Pukul</b-col>
                            <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
                            <b-col sm="2" class="mt-2">WIB</b-col>
                            <b-col sm="2" v-if="closedClass.module.hasExam" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
                        </b-row>
                        <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar materi yang harus diajarkan</p>
                        <p>{{ closedClass.module.materialDescription }}</p>
                        <p class="font-weight-bold pl-5 mb-1">Materi yang telah diunggah</p>
                        <ol class="pl-5 pb-3">
                            <li class="ml-4 pl-2" v-for="material in closedClass.classroomMaterials" :key="material.id">
                            <b-row>
                                <b-col sm="4">
                                <a href="">{{ material.file }}</a>
                                </b-col>
                                <b-col sm="2">
                                <b-button v-b-modal="'modal-delete-file'" variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
                                </b-col>
                            </b-row>
                            <b-modal id="modal-delete-file" centered>
                                Apakah Anda yakin ingin menghapus file {{ material.file }}?
                                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                                <b-button size="sm" variant="primary" @click="ok(); deleteFileMaterial(material.id)" style="width:100px">Ya</b-button>
                                </template>
                            </b-modal>
                            </li>
                        </ol>
                        <div class="pl-5">
                            <b-form-file v-model="fileBrowsed" class="mt-1 float-left" plain style="width: 40%"></b-form-file>
                            <b-button variant="outline-dark" class="p-1">Upload File</b-button>
                        </div>
                        <!-- pop up footer -->
                        <template slot="modal-footer" slot-scope="{ cancel, ok }">
                            <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                            <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Buka kelas</b-button>
                        </template>
                        </b-modal>
                        <!-- Pop up decline class -->
                        <b-modal :id="'modal-decline-class-'+closedClass.id" centered>
                            Apakah Anda yakin akan menolak permintaan kelas ini?
                            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                                <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
                            </template>
                        </b-modal>
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
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        moduleCategories: null,
        selectCategory: 'all',
        selectExam: 'all',
        inputMinMember: 10,
        inputMaxMember: 50,
        moduleDetail: null,
        classDetail: null,
        closedClasses: null,
        fileBrowsed: ''
    }
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    deleteClosedClass (classId) {
        this.$axios
            .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId, {withCredentials: true})
            .then(response => {
                console.log(response)
                this.getClosedClass()
            })
            .catch(error => { console.log(error.response) })
    },
    getClosedClass (){
        this.$axios
            .get('http://komatikugm.web.id:13370/_trainer/classrooms?page=0&size=15&status=close', {withCredentials: true})
            .then(response => (this.closedClasses = response.data.data.content))
            .catch(error => { console.log(error.response) })
    }
  },
  created () {
    this.setLayout('trainer-layout')
  },
  mounted () {
    this.getClosedClass()
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
      .catch(error => { console.log(error.response) })
    this.$axios.get('http://komatikugm.web.id:13370/modules/1', { withCredentials: true })
        .then(response => (this.moduleDetail = response.data.data.module))
        .catch(error => { console.log(error) })
    this.$axios.get('http://komatikugm.web.id:13370/classrooms/1', { withCredentials: true })
        .then(response => (this.classDetail = response.data.data.classroom))
        .catch(error => { console.log(error) })
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
