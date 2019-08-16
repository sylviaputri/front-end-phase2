<template>
    <b-card-group id="cardGroupModulRequested" class="my-3 px-2">
        <b-card class="modulRequested my-1" v-for="moduleRequest in modulesRequest" :key="moduleRequest">
          <b-card-text class="modulRequestedTotal float-right"><b>{{ moduleRequest.moduleRequest.moduleRequestLikes.length}} suara</b></b-card-text>
          <b-card-text class="modulRequestedName font-weight-bold mb-3">{{ moduleRequest.moduleRequest.title }}</b-card-text>
          <b-card-text class="modulRequestedRequester mb-2">Permintaan diajukan oleh : {{ moduleRequest.moduleRequest.user.fullname }}</b-card-text>
          <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
              <b-card-text class="modulRequestedTime float-left mb-0">{{moduleRequest.moduleRequest.createdAt | moment("DD-MMMM-YYYY")}}</b-card-text>
              <b-button variant="primary" class="btnDecline float-right" v-b-modal="'modal-add-module'+moduleRequest.moduleRequest.id">Buat Modul</b-button>
              <b-button variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-module'+moduleRequest.moduleRequest.id">Tolak</b-button>
          </b-card-footer>
          <b-modal :id="'modal-add-module'+moduleRequest.moduleRequest.id" class="modal-detail-class" centered>
              <h5 class="pl-5 text-center mb-3"><b>Buat Modul</b></h5>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Nama Modul</b-col>
                  <b-col sm="8"><b-form-input v-model="moduleRequest.moduleRequest.title" type="text"></b-form-input></b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3">
                  <label class="mt-2">Deskripsi</label>
                </b-col>
                <b-col sm="8">
                  <!-- <VueTrix v-model="editorContentDesc" placeholder="Maksimal 300 karakter"/> -->
                  <b-form-textarea rows="8" max-rows="15" class="mb-0" v-model="editorContentDesc"></b-form-textarea>
                </b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Status</b-col>
                  <b-col sm="8">
                    <b-form-select v-model="itemStatusM">
                      <option value="open">Open</option>
                    <option value="close">Close</option>
                    </b-form-select>
                  </b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Kategori</b-col>
                  <b-col sm="8">
                    <b-form-select v-model="itemCategory">
                      <option v-for="category in moduleCategories" :key="category.id" :value="category.id">{{category.name}}</option>
                    </b-form-select>
                  </b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Dengan Ujian</b-col>
                  <b-col sm="8">
                    <b-form-select v-model="itemExam">
                      <option value=true>Ada</option>
                    <option value=false>Tidak</option>
                    </b-form-select>
                  </b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Jumlah Sesi</b-col>
                  <b-col sm="8"><b-form-input type="number" v-model="iSession" min="1"></b-form-input></b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Waktu</b-col>
                  <b-col sm="6"><b-form-input type="number" v-model="iTime" min="1"></b-form-input></b-col>
                  <b-col sm="2 mt-2">Menit / Sesi</b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3">
                  <label class="mt-2">Daftar Materi</label>
                </b-col>
                <b-col sm="8">
                  <VueTrix v-model="editorContentList" placeholder="Maksimal 300 karakter"/>
                </b-col>
              </b-row>
              <div class="redColor float-right">*Lanjutkan dengan minimal membuat 1 kelas untuk dapat membuat modul</div>
              <!-- pop up footer -->
              <template slot="modal-footer" slot-scope="{ cancel, next }">
                  <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                  <b-button size="sm" variant="primary" @click="next()" style="width:100px" v-b-modal="'modal-add-class'+moduleRequest.moduleRequest.id">Lanjut</b-button>
              </template>
          </b-modal>
          <b-modal :id="'modal-add-class'+moduleRequest.moduleRequest.id" class="modal-detail-class" centered>
               <h5 class="pl-5 text-center mb-3"><b>Buat Kelas</b></h5>
                <p class="font-weight-bold pl-5 mb-4" style="font-size:18px">{{ moduleRequest.moduleRequest.title }} V.1<font-awesome-icon icon="file-signature" size="sm"/></p>
                <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3">Nama Kelas</b-col>
                  <b-col><b-form-input type="text" v-model="iClass"></b-form-input></b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3">
                    <b-col sm="3 mt-2">Jumlah Minimal Peserta</b-col>
                    <b-col sm="6"><b-form-input type="number" v-model="iMin" min="1"></b-form-input></b-col>
                    <b-col sm="2 mt-2">Orang</b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3">
                    <b-col sm="3 mt-2">Jumlah Maksimal Peserta</b-col>
                    <b-col sm="6"><b-form-input type="number" v-model="iMax" min="1"></b-form-input></b-col>
                    <b-col sm="2 mt-2">Orang</b-col>
                </b-row>
                <p class="font-weight-bold pl-5 mb-1">{{iTime}} Menit / Sesi</p>
                <b-row class="pl-5 pb-2 pt-3">
                    <b-col sm="10"></b-col>
                    <b-col sm="2" class="text-center">Dengan Ujian</b-col>
                </b-row>
                <b-row class="pl-5" v-for="index in Number(iSession)" :key="index">
                  <b-col sm="2" class="mt-2">Sesi {{ index }}</b-col>
                  <b-col sm="3"><b-form-input type="date" v-model="iSes[index]"></b-form-input></b-col>
                  <b-col sm="1" class="mt-2">Pukul</b-col>
                  <b-col sm="2"><b-form-input type="time" v-model="iTim[index]"></b-form-input></b-col>
                  <b-col sm="2" class="mt-2">WIB</b-col>
                  <b-col sm="2" v-model="iEx[index]" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
                </b-row>
                <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar Materi yang Harus Diajarkan</p>
                <p v-html="editorContentList"></p>
                <b-row class="font-weight-bold pl-5 mb-3">
                    <b-col sm="3 mt-2">Pelatih</b-col>
                    <b-col sm="8"><b-form-input type="text" v-model="iTrainer"></b-form-input></b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3">
                    <b-col sm="3 mt-2">Status</b-col>
                    <b-col sm="8">
                      <b-form-select v-model="itemStatusC">
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                      </b-form-select>
                    </b-col>
                </b-row>
                <!-- pop up footer -->
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Kembali</b-button>
                    <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Buka Kelas</b-button>
                </template>
          </b-modal>
          <b-modal :id="'modal-decline-module'+moduleRequest.moduleRequest.id" centered>
              Apakah Anda yakin akan menolak modul "{{moduleRequest.moduleRequest.title}}"?
              <template slot="modal-footer" slot-scope="{ cancel, ok }">
                  <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                  <b-button size="sm" variant="primary" @click="ok(); rejectClassRequest(moduleRequest.moduleRequest.id)" style="width:100px">Ya</b-button>
              </template>
          </b-modal>
        </b-card>
    </b-card-group>
</template>

<script>
import VueTrix from 'vue-trix'
export default {
  props: ['modulesRequest'],
  data () {
    return {
      VueTrix,
      moduleCategories: '',
      editorContentDesc: '',
      editorContentList: '',
      itemStatusM: 'open',
      itemCategory: 1,
      itemExam: true,
      iSession: '',
      iTime: '',
      iClass: '',
      iMin: '',
      iMax: '',
      iTrainer: '',
      itemStatusC: 'open',
      iSes: {},
      iTim: {},
      iEx: {}
    }
  },
  methods: {
    rejectClassRequest (moduleId) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/_requests/' + moduleId + '/_status/rejected', { withCredentials: true })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    },
    acceptClassRequest (moduleId) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/_requests/' + moduleId + '/_status/eccepted', { withCredentials: true })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/users?page=0&size=15', {withCredentials: true})
      .then(response => (this.iTrainer = response.data.data))
      .catch(error => { console.log(error.response) })
  }
}
</script>

<style scoped>
div.modulRequested{
  min-width: 100%;
}
div.modulRequested .card-body{
  padding: 8px 20px;
}
div.modulRequested .modulRequestedName{
  font-size: 17px;
}
div.modulRequested .modulRequestedTime{
  font-size: 12px;
}
div.modulRequested .modulRequestedTotal{
  font-size: 20px;
  margin-right: 5px;
  color: rgb(10, 135, 192);
}
.btnAccept, .btnDecline{
  width: 120px;
  margin-right: 5px;
}
</style>
