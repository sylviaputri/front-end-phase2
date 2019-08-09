<template>
<div class="px-5">
	<h2 class="font-weight-bold mb-4" v-if="editModule==false">Detail Modul</h2>
  <h2 class="font-weight-bold mb-4" v-else>Edit Modul</h2>
	<div class="fadedWhiteBackground px-2 py-2">
    <div class="detailModul mt-3 mx-3" >
      <b-row>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">ID Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled="true" v-model="detailModule.id" class="inputDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Nama Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" :disabled="editModule==false" v-model="detailModule.name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label class="mt-2">Deskripsi</label>
              <VueTrix v-model="editorContentDesc" v-if="editModule==true" placeholder="Maksimal 300 karakter"/>
              <p v-else v-html="detailModule.description"></p>
              <!-- <b-form-textarea disabled v-if="editModule==false" rows="8" max-rows="15" class="mb-0" v-model="detailModule.description"></b-form-textarea> -->
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col>
              <label class="mt-2">Daftar Materi</label>
              <VueTrix v-model="editorContentList" v-if="editModule==true" placeholder="Maksimal 300 karakter"/>
              <p v-else v-html="detailModule.materialDescription"></p>
              <!-- <b-form-textarea disabled v-if="editModule==false" rows="8" max-rows="15" class="mb-0" v-model="detailModule.materialDescription"></b-form-textarea> -->
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">Status</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selectedStatus" v-if="editModule==true">
                <option value="open">Open</option>
                <option value="close">Close</option>
              </b-form-select>
              <b-form-input type="text" v-else disabled :value="selectedStatus ? 'Open' : 'Close'"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Kategori</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selectedCategory" v-if="editModule==true">
                <option v-for="category in moduleCategories" :key="category.id" :value="category.id">{{category.name}}</option>
              </b-form-select>
              <b-form-input type="text" v-else disabled v-model="detailModule.moduleCategory.name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Dengan Ujian</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selectedExam" v-if="editModule==true">
                <option value=true>Ada</option>
                <option value=false>Tidak</option>
              </b-form-select>
              <b-form-input type="text" v-else disabled :value="selectedExam ? 'Ada' : 'Tidak'"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Sesi</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="number" :disabled="editModule==false" v-model="detailModule.classrooms[0].classroomSessions.length"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Waktu</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" :disabled="editModule==false" v-model="detailModule.timePerSession"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2" style="font-weight: normal;">Menit / Sesi</label>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div class="col-12 d-flex py-3">
        <div class="mr-auto">
            <router-link to="/admin/all-modules">
                <b-button variant="primary" class="btnBack" v-if="editModule==false">Kembali</b-button>
            </router-link>
        </div>
        <div class="ml-auto">
            <b-button variant="secondary" class="btnCancelModule mr-2" v-if="editModule==true" @click="changeEditToDetail(detailModule.description,detailModule.materialDescription)">Batal</b-button>
            <b-button variant="primary" class="btnSaveModule" v-if="editModule==true" @click="editDetail (detailModule.id,detailModule.name,editorContentDesc,editorContentList,selectedStatus,detailModule.moduleCategory.name,selectedExam,detailModule.timePerSession)">Simpan</b-button>
            <b-button variant="primary" class="btnEditModule" v-else @click="changeDetailToEdit(detailModule.description,detailModule.materialDescription)">Edit</b-button>
            <router-link :to="{path: '/admin/all-modules/detail-module/' + detailModule.id + '/class-list'}">
                <b-button variant="primary" class="btnClass" v-if="editModule==false">Lihat Daftar Kelas</b-button>
            </router-link>
        </div>
      </div>
    </div>
	</div>
</div>
</template>

<script>
import VueTrix from 'vue-trix'
export default {
  data () {
    return {
      VueTrix,
      moduleCategories: '',
      detailModule: '',
      editModule: false,
      editorContentDesc: '',
      editorContentList: '',
      selectedCategory: '',
      selectedExam: '',
      selectedStatus: ''
    }
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    changeEditToDetail (desc, list) {
      this.editModule = false
      this.editorContentDesc = desc
      this.editorContentList = list
    },
    changeDetailToEdit (desc, list) {
      this.editModule = true
      this.editorContentDesc = desc
      this.editorContentList = list
    },
    editDetail (idModule, nameModule, descModule, listMaterial, staModule, catModule, exaModule, timeModule) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/' + idModule, {
            description: descModule,
            hasExam: exaModule,
            materialDescription: listMaterial,
            moduleCategory: catModule,
            name: nameModule,
            status: staModule,
            timePerSession: timeModule
        }, { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.log(error))
      this.editModule = false
      this.detailModule.description = descModule
      this.detailModule.materialDescription = listMaterial
    }
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
      .then(response => {
        this.detailModule = response.data.data.module
        this.editorContentDesc = response.data.data.module.description
        this.selectedCategory = response.data.data.module.moduleCategory.id
        this.selectedExam = response.data.data.module.hasExam
        this.selectedStatus = response.data.data.module.status
      })
    .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
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
label{
  font-weight: bold;
}
</style>
