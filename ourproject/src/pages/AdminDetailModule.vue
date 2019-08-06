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
            <b-col sm="3">
              <label class="mt-2">Deskripsi</label>
            </b-col>
            <b-col sm="9">
              <b-form-textarea :disabled="editModule==false" placeholder="Maksimal 300 karakter" rows="8" max-rows="15" class="mb-0" v-model="detailModule.description"></b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Daftar Materi</label>
            </b-col>
            <b-col sm="9">
              <b-form-textarea :disabled="editModule==false" placeholder="Maksimal 300 karakter" rows="8" max-rows="15" class="mb-0" v-model="detailModule.materialDescription"></b-form-textarea>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">Status</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selected" :disabled="editModule==false">
                <option :value="active">Aktif</option>
                <option value="not active">Tidak Aktif</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Kategori</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selected" :disabled="editModule==false">
                <option :value="web">Web Programming</option>
                <option value="ai">Artificial Intelligent</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Dengan Ujian</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selected" :disabled="editModule==false">
                <option :value="yes">Ada</option>
                <option value="no">Tidak</option>
              </b-form-select>
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
              <label class="mt-2">Menit / Sesi</label>
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
            <b-button variant="secondary" class="btnCancelModule mr-2" v-if="editModule==true" @click="editModule = false">Batal</b-button>
            <b-button variant="primary" class="btnSaveModule" v-if="editModule==true" @click="editModule = false">Simpan</b-button>
            <b-button variant="primary" class="btnEditModule" v-else @click="editModule = true">Edit</b-button>
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
export default {
  data () {
    return {
      detailModule: null,
      editModule: false
    }
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.$axios
    .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
    .then(response => (this.detailModule = response.data.data.module))
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
</style>
