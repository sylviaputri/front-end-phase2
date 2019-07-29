<template>
  <div id="adminAllTrainersTrainees" class="px-5">
      <h2 class="font-weight-bold mb-4">Daftar Seluruh Pelatih dan Peserta</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="5">
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" placeholder="Ketik nama yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="all">Semua</option>
                    <option value="0">Pelatih</option>
                    <option value="1">Peserta</option>
                  </b-form-select>
                </b-col>
                <b-col cols="2">
                  <font-awesome-icon icon="sort-alpha-down" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="rating">ID</option>
                    <option value="name">Nama</option>
                    <option value="email">Email</option>
                    <option value="telepon">No Telepon</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="2">
              <b-row>
                <b-col>
                  <b-button class="position-absolute btn-info" style="top:4px; width:90%;" v-b-modal="'modal-add-user'">
                    <font-awesome-icon icon="plus"/>
                    Tambah Pengguna
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <user-table></user-table>
      <b-modal id="modal-add-user">
          <h5 class="pl-5 text-center mb-3"><b>Tambah Pengguna</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Status</b-col>
              <b-col sm="8">
                <b-form-select v-model="selected">
                  <option :value="trainer">Pelatih</option>
                  <option value="trainee">Peserta</option>
                </b-form-select>
              </b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Email</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">No. Telepon</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Tambah</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-edit-user">
          <h5 class="pl-5 text-center mb-3"><b>Edit Pengguna</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Status</b-col>
              <b-col sm="8">
                <b-form-select v-model="selected">
                  <option :value="trainer">Pelatih</option>
                  <option value="trainee">Peserta</option>
                </b-form-select>
              </b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Email</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">No. Telepon</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Tambah</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-delete-user">
          Apakah Anda yakin akan menghapus pengguna ini?
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import UserTable from './../components/TrainersTraineesTable.vue'
export default {
  components: {
    'user-table': UserTable
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
