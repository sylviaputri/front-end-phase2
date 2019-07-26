<template>
<div class="px-5">
	<h2 class="font-weight-bold mb-4">Detail Kelas</h2>
  <div class="fadedWhiteBackground px-2 py-2">
    <div class="detailModul mt-3 mx-3">
      <b-row>
        <b-col>
          <b-row class="my-2">
            <b-col sm="2">
              <label class="mt-2">Kelas</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled="true" value="PEL002" class="inputDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled="true" value="Data Visualization with Python" class="inputDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Versi</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="number" disabled="true" value="1" class="inputDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Pelatih</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" value="Nama Pelatih"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Status</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selected">
                <option :value="open">Buka</option>
                <option value="close">Tutup</option>
              </b-form-select>
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
          <b-row class="ml-3">
              <b-col sm="2" class="mt-2">Sesi 1</b-col>
              <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
              <b-col sm="1" class="mt-2">Pukul</b-col>
              <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
              <b-col sm="2" class="mt-2">WIB</b-col>
              <b-col sm="2" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
          </b-row>
          <b-row class="ml-3">
              <b-col sm="2" class="mt-2"> Sesi 2</b-col>
              <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
              <b-col sm="1" class="mt-2">Pukul</b-col>
              <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
              <b-col sm="2" class="mt-2">WIB</b-col>
              <b-col sm="2" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col>
              <label class="mt-2">Materi</label>
            </b-col>
          </b-row>
            <ol>
                <li class="py-2">
                    <b-row>
                        <b-col>
                            <a href="">Materi_computer_science_v1.zip</a>
                        </b-col>
                        <b-col cols="2">
                            <b-button variant="outline-dark" class="py-0 mx-0">Browse...</b-button>
                        </b-col>
                        <b-col cols="2">
                            <b-button variant="outline-dark" class="py-0">Hapus</b-button>
                        </b-col>
                    </b-row>
                </li>
                <li class="py-2">
                    <b-row>
                        <b-col>
                            <a href="">Materi_data_visualization_v1.zip</a>
                        </b-col>
                        <b-col sm="2">
                            <b-button variant="outline-dark" class="py-0">Browse...</b-button>
                        </b-col>
                        <b-col sm="2">
                            <b-button variant="outline-dark" class="py-0">Hapus</b-button>
                        </b-col>
                    </b-row>
                </li>
            </ol>
            <a href="" class="ml-4">+ tambah materi</a>
        </b-col>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">ID Kelas</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" value="001"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Pendaftar</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" value="50"></b-form-input>
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
              <b-form-input type="number" value="10"></b-form-input>
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
              <b-form-input type="number" value="50"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Orang</label>
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
