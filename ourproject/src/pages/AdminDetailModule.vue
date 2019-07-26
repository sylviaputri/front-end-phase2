<template>
<div class="px-5">
	<h2 class="font-weight-bold mb-4">Detail Modul</h2>
	<div class="fadedWhiteBackground px-2 py-2">
    <div class="detailModul mt-3 mx-3">
      <b-row>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">ID Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled="true" value="001" class="inputDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Nama Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" value="Machine Learning"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col sm="3">
              <label class="mt-2">Deskripsi</label>
            </b-col>
            <b-col sm="9">
              <b-form-textarea placeholder="Maksimal 300 karakter" rows="8" max-rows="15" class="mb-0"></b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Daftar Materi</label>
            </b-col>
            <b-col sm="9">
              <b-form-textarea placeholder="Maksimal 300 karakter" rows="8" max-rows="15" class="mb-0"></b-form-textarea>
            </b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">Status</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selected">
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
              <b-form-select v-model="selected">
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
              <b-form-select v-model="selected">
                <option :value="yes">Ya</option>
                <option value="no">Tidak</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Sesi</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="number" value="4"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Waktu</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" value="90"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Menit / Sesi</label>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div class="col-12 d-flex py-3">
        <div class="ml-auto">
          <b-button variant="secondary" class="btnCancelModule mr-2">Batal</b-button>
          <b-button variant="primary" class="btnSaveModule">Simpan</b-button>
          <b-button variant="primary" class="btnEditModule">Edit</b-button>
        </div>
      </div>
    </div>
	</div>
</div>
</template>

<script>
export default {
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    window.scrollTo(0, 0)
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
