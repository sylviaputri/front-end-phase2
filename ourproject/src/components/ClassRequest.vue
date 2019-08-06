<template>
  <div>
    <b-card-group id="cardGroupTopClassRequested" class="my-3 px-2">
      <!-- Example -->
      <!-- <b-card class="topClassRequested my-1" v-for="index in 5" :key="index">
      <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">Learn Node.js V.2</b-card-text>
      <b-card-text class="topClassRequestedName mb-0">Kelas : PEL005</b-card-text>
      <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : Nama Pelatih</b-card-text>
      <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh 5 orang</b-card-text>
      <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
          <b-card-text class="topClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
          <b-button v-if="index == 2" variant="secondary" class="btnCancelJoinClassRequest float-right">Batal</b-button>
          <b-button v-else variant="primary" class="btnJoinClassRequest float-right">Bergabung</b-button>
      </b-card-footer>
      </b-card> -->
      <!-- axios (undone) -->
      <b-card class="topClassRequested my-1" v-for="classRequest in classRequests" :key="classRequest">
      <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">Ini Harusnya Nama Modul</b-card-text>
      <b-card-text class="topClassRequestedName mb-0">Kelas : {{ classRequest.className }}</b-card-text>
      <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : {{ classRequest.trainerName }}</b-card-text>
      <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh {{ classRequest.requesterCount }} orang</b-card-text>
      <b-card-footer v-if="role === 'TRAINEE'" class="border-0 p-0 m-0 grayColor" style="background:transparent">
        <b-card-text class="topClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
        <b-button v-if="index == 2" variant="secondary" class="btnCancelJoinClassRequest float-right">Batal</b-button>
        <b-button @click="joinRequestClass(classRequest.classId)" v-else variant="primary" class="btnJoinClassRequest float-right">Bergabung</b-button>
      </b-card-footer>
      <b-card-footer v-else class="border-0 p-0 m-0 grayColor" style="background:transparent">
        <b-card-text class="trainerClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
        <b-button variant="primary" v-b-modal="'modal-open-class-1'" class="btn openClassRequested float-right">Buka Kelas</b-button>
        <b-button variant="secondary" v-b-modal="'modal-decline-class-1'" class="declineClassRequested float-right mr-3">Tolak</b-button>
      </b-card-footer>
      </b-card>
    </b-card-group>
    <!-- Pop up open class -->
    <b-modal id="modal-open-class-1" class="modal-detail-class" centered>
      <p class="font-weight-bold pl-5 mb-5" style="font-size:18px">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></p>
      <b-row class="px-5 mb-3 font-weight-bold pl-5 mb-3">
        <b-col sm="3">Nama Kelas</b-col>
        <b-col><b-form-input type="text"></b-form-input></b-col>
      </b-row>
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
</template>

<script>
export default {
  data () {
    return {
      role: null
    }
  },
  props: ['classRequests'],
  methods: {
    joinRequestClass (classId) {
      this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
          classroomId: classId
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
  },
  created () {
    this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
      .then(response => {
        let originalRole = response.data.role
        if (originalRole === 'TRAINER' && localStorage.role === 'TRAINEE') {
          this.role = localStorage.role
        } else {
          this.role = originalRole
        }
      })
      .catch(error => { console.log(error) })
  }
}
</script>

<style scoped>
div.topClassRequested{
  min-width: 100%;
}
div.topClassRequested .card-body{
  padding: 8px 20px;
}
div.topClassRequested .topClassRequestedModuleName{
  font-size: 17px;
}
div.topClassRequested .topClassRequestedTime{
  font-size: 12px;
}
div.topClassRequested .btnCancelJoinClassRequest, div.topClassRequested .btnJoinClassRequest{
  width: 120px
}
</style>
