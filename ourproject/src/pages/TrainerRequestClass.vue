<template>
  <div id="traineeRequestClass" class="px-5">
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
            <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
          </b-input-group>
          <b-card-group id="cardGroupTrainerClassRequested" class="my-3 px-2" style="clear:both">
            <!-- example -->
            <!-- <b-card class="trainerClassRequested my-1" v-for="index in 5" :key="index">
            <b-card-text class="trainerClassRequestedModuleName font-weight-bold mb-3">Learn Node.js V.2</b-card-text>
            <b-card-text class="trainerClassRequestedName mb-0">Kelas : PEL005</b-card-text>
            <b-card-text class="trainerClassRequestedTrainers mb-2">Pelatih : Nama Pelatih</b-card-text>
            <b-card-text class="trainerClassRequestedRequester mb-1">Permintaan diajukan oleh 5 orang</b-card-text>
            <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
                <b-card-text class="trainerClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
                <b-button variant="primary" v-b-modal="'modal-open-class-1'" class="btn openClassRequested float-right">Buka Kelas</b-button>
                <b-button variant="secondary" v-b-modal="'modal-decline-class-1'" class="declineClassRequested float-right mr-3">Tolak</b-button>
            </b-card-footer>
            </b-card> -->
            <!-- axios -->
            <b-card class="trainerClassRequested my-1" v-for="classRequest in classRequests" :key="classRequest">
            <b-card-text class="trainerClassRequestedModuleName font-weight-bold mb-3">{{ classRequest.className }}</b-card-text>
            <b-card-text class="trainerClassRequestedName mb-0">Kelas : {{ classRequest.classId }}</b-card-text>
            <b-card-text class="trainerClassRequestedTrainers mb-2">Pelatih : {{ classRequest.trainerName }}</b-card-text>
            <b-card-text class="trainerClassRequestedRequester mb-1">Permintaan diajukan oleh {{ classRequest.requesterCount }} orang</b-card-text>
            <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
                <b-card-text class="trainerClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
                <b-button variant="primary" v-b-modal="'modal-open-class-1'" class="btn openClassRequested float-right">Buka Kelas</b-button>
                <b-button variant="secondary" v-b-modal="'modal-decline-class-1'" class="declineClassRequested float-right mr-3">Tolak</b-button>
            </b-card-footer>
            </b-card>
        </b-card-group>
        </div>
        <!-- Pop up open class -->
        <b-modal id="modal-open-class-1" class="modal-detail-class" centered>
            <h5 class="pl-5">Kelas PEL002</h5>
            <p class="font-weight-bold pl-5 mb-4" style="font-size:18px">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></p>
            <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                <b-col sm="7">Jumlah Minimal Peserta</b-col>
                <b-col sm="3"><b-form-input type="number" value="10" min="1"></b-form-input></b-col>
                <b-col sm="2">orang</b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                <b-col sm="7">Jumlah Maksimal Peserta</b-col>
                <b-col sm="3"><b-form-input type="number" value="50" min="1"></b-form-input></b-col>
                <b-col sm="2">orang</b-col>
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
            <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar materi yang harus diajarkan</p>
            <ol class="pl-5">
                <li class="ml-4 pl-2">Introduction to Matplotlib</li>
                <li class="ml-4 pl-2">Introduction to Seaborn</li>
                <li class="ml-4 pl-2">Visualizing World Cup Data With Seaborn</li>
            </ol>
            <p class="font-weight-bold pl-5 mb-1">Materi yang telah diunggah</p>
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
            <!-- pop up footer -->
            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Buka kelas</b-button>
            </template>
        </b-modal>
        <!-- Pop up decline class -->
        <b-modal id="modal-decline-class-1" centered>
            Apakah Anda yakin akan menolak permintaan kelas ini?
            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
            </template>
        </b-modal>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPopularActive: true,
      isNewActive: false,
      classRequests: null
    }
  },
  created () {
    window.scrollTo(0, 0)
  },
  methods: {
    changeActiveState: function () {
      this.isPopularActive = !this.isPopularActive
      this.isNewActive = !this.isNewActive
    }
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_requests', {withCredentials: true})
      .then(response => (this.classRequests = response.data.data.content))
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
.trainerClassRequested{
    min-width: 100%;
}
.declineClassRequested, .openClassRequested{
    width: 120px
}
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
</style>
