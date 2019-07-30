<template>
  <div id="adminAllModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Modul</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col cols="9">
              <b-row>
                <b-col>
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col class="mr-3">
                  <font-awesome-icon icon="shapes" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="all">semua kategori</option>
                    <option value="1">Artificial Intelligent</option>
                    <option value="2">Data Analyze</option>
                  </b-form-select>
                </b-col>
                <b-col class="mr-3">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="all">ujian dan tanpa ujian</option>
                    <option value="0">tanpa ujian</option>
                    <option value="1">ujian</option>
                  </b-form-select>
                </b-col>
                <b-col>
                  <font-awesome-icon icon="sort-alpha-down" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="rating">rating</option>
                    <option value="name">nama modul</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
              <b-row>
                <b-col>
                  <b-button class="position-absolute btn-info" style="top:4px; width:90%;" v-b-modal="'modal-add-module'" >
                    <font-awesome-icon icon="plus"/>
                    Tambah Modul
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <module-table></module-table>
      <b-modal id="modal-add-module" class="modal-detail-class" centered>
          <h5 class="pl-5 text-center mb-3"><b>Buat Modul</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama Modul</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
            <b-col sm="3">
              <label class="mt-2">Deskripsi</label>
            </b-col>
            <b-col sm="8">
              <b-form-textarea placeholder="Maksimal 300 karakter" rows="8" max-rows="15" class="mb-0"></b-form-textarea>
            </b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Status</b-col>
              <b-col sm="8">
                <b-form-select v-model="selected">
                  <option :value="active">Aktif</option>
                  <option value="not active">Tidak Aktif</option>
                </b-form-select>
              </b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Kategori</b-col>
              <b-col sm="8">
                <b-form-select v-model="selected">
                  <option :value="1">Artificial Intelligent</option>
                  <option value="2">Data Analyze</option>
                </b-form-select>
              </b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Dengan Ujian</b-col>
              <b-col sm="8">
                <b-form-select v-model="selected">
                  <option :value="yes">Ya</option>
                  <option value="no">Tidak</option>
                </b-form-select>
              </b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Jumlah Sesi</b-col>
              <b-col sm="8"><b-form-input type="number" value="4" min="1"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Waktu</b-col>
              <b-col sm="6"><b-form-input type="number" value="90" min="1"></b-form-input></b-col>
              <b-col sm="2 mt-2">Menit / Sesi</b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
            <b-col sm="3">
              <label class="mt-2">Daftar Materi</label>
            </b-col>
            <b-col sm="8">
              <b-form-textarea placeholder="Maksimal 300 karakter" rows="8" max-rows="15" class="mb-0"></b-form-textarea>
            </b-col>
          </b-row>
          <div class="redColor float-right">*Lanjutkan dengan minimal membuat 1 kelas untuk dapat membuat modul</div>
          <!-- pop up footer -->
          <template slot="modal-footer" slot-scope="{ cancel, next }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="next()" style="width:100px" v-b-modal="'modal-add-class'">Lanjut</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-add-class" class="modal-detail-class" centered>
          <h5 class="pl-5 text-center mb-3"><b>Buat Kelas</b></h5>
          <p class="font-weight-bold pl-5 mb-4" style="font-size:18px">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></p>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Jumlah Minimal Peserta</b-col>
              <b-col sm="6"><b-form-input type="number" value="10" min="1"></b-form-input></b-col>
              <b-col sm="2 mt-2">Orang</b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Jumlah Maksimal Peserta</b-col>
              <b-col sm="6"><b-form-input type="number" value="50" min="1"></b-form-input></b-col>
              <b-col sm="2 mt-2">Orang</b-col>
          </b-row>
          <p class="font-weight-bold pl-5 mb-1">45 Menit / Sesi</p>
          <b-row class="pl-5 pb-2 pt-3">
              <b-col sm="10"></b-col>
              <b-col sm="2" class="text-center">Dengan Ujian</b-col>
          </b-row>
          <b-row class="pl-5">
              <b-col sm="2" class="mt-2">Sesi 1</b-col>
              <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
              <b-col sm="1" class="mt-2">Pukul</b-col>
              <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
              <b-col sm="2" class="mt-2">WIB</b-col>
              <b-col sm="2" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
          </b-row>
          <b-row class="pl-5">
              <b-col sm="2" class="mt-2">Sesi 2</b-col>
              <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
              <b-col sm="1" class="mt-2">Pukul</b-col>
              <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
              <b-col sm="2" class="mt-2">WIB</b-col>
              <b-col sm="2" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
          </b-row>
          <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar Materi yang Harus Diajarkan</p>
          <ol class="pl-5">
              <li class="ml-4 pl-2">Introduction to Matplotlib</li>
              <li class="ml-4 pl-2">Introduction to Seaborn</li>
              <li class="ml-4 pl-2">Visualizing World Cup Data With Seaborn</li>
          </ol>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Pelatih</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Status</b-col>
              <b-col sm="8">
                <b-form-select v-model="selected">
                  <option :value="open">Buka</option>
                  <option value="close">Tutup</option>
                </b-form-select>
              </b-col>
          </b-row>
          <!-- pop up footer -->
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Kembali</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Buka Kelas</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-delete-module" centered>
          Apakah Anda yakin akan menghapus modul ini?
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import ModuleTable from './../components/ModuleTable.vue'
export default {
  components: {
    'module-table': ModuleTable
  },
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
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
</style>
