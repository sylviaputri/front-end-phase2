<template>
    <b-card-group id="cardGroupTopClassRequested" class="my-3 px-2">
        <b-card class="topClassRequested my-1" v-for="classRequest in classesRequest" :key="classRequest">
        <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">{{ classRequest.className }}</b-card-text>
        <b-card-text class="topClassRequestedName mb-0">Kelas : {{ classRequest.classId }}</b-card-text>
        <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : {{ classRequest.trainerName }}</b-card-text>
        <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh {{ classRequest.requesterCount }} orang</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="topClassRequestedTime float-left mb-0">{{classRequest.createdAt | moment("DD-MMMM-YYYY")}}</b-card-text>
            <b-button variant="primary" class="btnDecline float-right"  v-b-modal="'modal-open-class'+classRequest.classId">Buka Kelas</b-button>
            <b-button variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-class'+classRequest.classId">Tolak</b-button>
        </b-card-footer>
        <b-modal :id="'modal-open-class'+classRequest.classId" class="modal-detail-class" centered>
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
        <b-modal :id="'modal-decline-class'+classRequest.classId" centered>
            Apakah Anda yakin akan menolak kelas ini?
            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                <b-button size="sm" variant="primary" @click="ok(); rejectClassRequest(classRequest.classId)" style="width:100px">Ya</b-button>
            </template>
        </b-modal>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
  props: ['classesRequest'],
  methods: {
    rejectClassRequest (classId) {
      this.$axios.delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_requests/_reject', { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getClassRequests()
      })
      .catch(error => console.log(error.response))
    },
    joinRequestClass (classId) {
      this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
          classroomId: classId
      }, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getClassRequests()
        })
      .catch(error => console.log(error.response))
    }
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
.btnAccept, .btnDecline{
  width: 120px;
  margin-right: 5px;
}
</style>
