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
              <label class="mt-2">Nama Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" :disabled="editModule==false" v-model="detailModule.name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Versi</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled v-model="detailModule.version"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label class="mt-2">Deskripsi</label>
              <!-- <VueTrix v-model="editorContentDesc" v-if="editModule==true" placeholder="Maksimal 300 karakter"/> -->
              <p v-if="editModule==false" v-html="detailModule.description"></p>
              <b-form-textarea v-if="editModule==true" rows="8" max-rows="15" class="mb-0" v-model="editorContentDesc"></b-form-textarea>
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
                <option value="closed">Closed</option>
              </b-form-select>
              <b-form-input type="text" v-else disabled :value="selectedStatus=='open' ? 'Open' : 'Closed'"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Kategori</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selectedCategory" v-if="editModule==true">
                <option v-for="category in moduleCategories" :key="category.name" :value="category.name">{{category.name}}</option>
              </b-form-select>
              <b-form-input type="text" v-else disabled v-model="selectedCategory"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Dengan Ujian</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selectedExam" v-if="editModule==true">
                <option value=true>Ya</option>
                <option value=false>Tidak</option>
              </b-form-select>
              <b-form-input type="text" v-else disabled :value="selectedExam==true ? 'Ada' : 'Tidak'"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Sesi</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="number" disabled v-model="detailModule.totalSession"></b-form-input>
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
            <b-button variant="dark" class="btnCancelModule mr-2" v-if="editModule==true" @click="changeEditToDetail(detailModule.description,detailModule.materialDescription)">Batal</b-button>
            <b-button variant="primary" class="btnSaveModule" v-if="editModule==true" @click="editDetail ()">Simpan</b-button>
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
    getData () {
      this.$axios
      .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
        .then(response => {
          this.detailModule = response.data.data.module
          this.editorContentDesc = response.data.data.module.description
          this.editorContentList = response.data.data.module.materialDescription
          this.selectedCategory = response.data.data.module.moduleCategory.name
          this.selectedExam = response.data.data.module.hasExam
          this.selectedStatus = response.data.data.module.status
        })
      .catch(error => { console.log(error.response) })
    },
    editDetail () {
      if (this.detailModule.name === '' || this.editorContentDesc === '' || this.editorContentList === '') {
        if (this.detailModule.name === '') {
          alert('Nama modul tidak boleh kosong')
        }
        if (this.editorContentDesc === '') {
          alert('Deskripsi modul tidak boleh kosong')
        }
        if (this.editorContentList === '') {
          alert('Daftar materi tidak boleh kosong')
        }
        if (this.detailModule.timePerSession === 0 || this.detailModule.timePerSession === '') {
          alert('Waktu pertemuan harus diisi dengan benar')
        }
      } else {
        this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/' + this.detailModule.id, {
              description: this.editorContentDesc,
              hasExam: this.selectedExam,
              materialDescription: this.editorContentList,
              moduleCategory: this.selectedCategory,
              name: this.detailModule.name,
              status: this.selectedStatus,
              timePerSession: this.detailModule.timePerSession
          }, { withCredentials: true })
          .then(response => {
            console.log(response)
            this.editModule = false
            this.getData()
            })
          .catch(error => console.log(error))
      }
    }
  },
  isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  },
  mounted () {
    this.getData()
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
