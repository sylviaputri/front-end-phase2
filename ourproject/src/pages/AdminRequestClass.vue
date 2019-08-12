<template>
  <div id="adminRequestClass" class="px-5">
      <h2 class="font-weight-bold mb-4">Permintaan Kelas</h2>
      <div class="tabSort fadedWhiteBackground pt-1 pb-0 px-4 mb-4">
          <b-row>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isPopularActive }">
              POPULER
              <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isPopularActive">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isNewActive }">
              BARU
              <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isNewActive">
            </b-col>
          </b-row>
      </div>
      <div class="fadedWhiteBackground">
        <div>
          <b-input-group class="float-right mr-2 my-2" style="width: 30%">
            <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
            <b-form-input type="text" v-model="searchKeyword" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
          </b-input-group>
        </div>
        <div v-if="allClassesRequest == null" class="text-center my-3 py-2">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="allClassesRequest == ''" class="text-center my-3 py-2"><br><br><br><h5><b>Tidak ada permintaan kelas yang dicari</b></h5><br><br></div>
        <all-classes-request v-else style="clear:both" :classesRequest=allClassesRequest></all-classes-request>
      </div>
      <b-modal id="modal-open-class" class="modal-detail-class" centered>
          <h5 class="pl-5 text-center mb-3"><b>Buat Kelas</b></h5>
          <p class="font-weight-bold pl-5 mb-4" style="font-size:18px">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></p>
          <b-row class="font-weight-bold pl-5 mb-3">
            <b-col sm="3">Nama Kelas</b-col>
            <b-col><b-form-input  type="text"></b-form-input></b-col>
          </b-row>
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
          <p class="font-weight-bold pl-5 mb-1">Materi yang Telah Diunggah</p>
          <ol class="pl-5">
              <li class="ml-4 pl-2 py-2">
                  <b-row>
                      <b-col sm="5">
                          <a href="">Materi_computer_science_v1.zip</a>
                      </b-col>
                      <b-col sm="2">
                          <b-button variant="outline-dark" class="py-0 ml-3">Browse...</b-button>
                      </b-col>
                      <b-col sm="2">
                          <b-button variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
                      </b-col>
                  </b-row>
              </li>
              <li class="ml-4 pl-2 pt-2 pb-4">
                  <b-row>
                      <b-col sm="5">
                          <a href="">Materi_data_visualization_v1.zip</a>
                      </b-col>
                      <b-col sm="2">
                          <b-button variant="outline-dark" class="py-0 ml-3">Browse...</b-button>
                      </b-col>
                      <b-col sm="2">
                          <b-button variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
                      </b-col>
                  </b-row>
              </li>
              <a href="">+ tambah materi</a>
          </ol>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Pelatih</b-col>
              <b-col sm="8"><b-form-input disabled="true" type="text"></b-form-input></b-col>
          </b-row>
          <!-- pop up footer -->
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Buka kelas</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-decline-class" centered>
          Apakah Anda yakin akan menolak kelas ini?
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import AllClassesRequest from './../components/AllClassesRequest.vue'
export default {
  data () {
    return {
      searchKeyword: '',
      isPopularActive: true,
      isNewActive: false,
      allClassesRequest: null
    }
  },
  components: {
    'all-classes-request': AllClassesRequest
  },
  created () {
    this.setLayout('admin-layout')
  },
  methods: {
    changeActiveState: function () {
      this.isPopularActive = !this.isPopularActive
      this.isNewActive = !this.isNewActive
    },
    searchReqClass () {
      let keyName = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        keyName = ''
      }
      this.$axios
        .get('http://komatikugm.web.id:13370/classrooms/_requests?' + keyName + 'page=0&popular=false&size=8', {withCredentials: true})
        .then(response => (this.allClassesRequest = response.data.data.content))
        .catch(error => { console.log(error.response) })
    }
  },
   watch: {
    searchKeyword () {
      this.searchReqClass()
    }
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_requests', {withCredentials: true})
      .then(response => (this.allClassesRequest = response.data.data.content))
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
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
</style>
