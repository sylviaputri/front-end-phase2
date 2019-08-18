<template>
  <div>
    <b-card-group id="cardGroupModulRequested" class="my-3 px-2">
      <b-card class="modulRequested my-1" v-for="moduleRequest in moduleRequests" :key="moduleRequest.moduleRequest.id">
        <b-card-text v-if="authRole === 'ADMIN'" class="modulRequestedTotal float-right"><b>{{ moduleRequest.moduleRequest.moduleRequestLikes.length}} suara</b></b-card-text>
        <b-card-text class="modulRequestedName font-weight-bold mb-3">{{ moduleRequest.moduleRequest.title }}</b-card-text>
        <b-card-text class="modulRequestedRequester mb-2">Permintaan diajukan oleh : {{ moduleRequest.moduleRequest.user.fullname }}</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="modulRequestedTime float-left mb-0">{{ moduleRequest.moduleRequest.createdAt | moment("DD-MM-YYYY HH:mm:ss") }}</b-card-text>
            <b-card-text v-if="authRole === 'TRAINEE'" class="modulRequestedTotal float-right"><font-awesome-icon @click="joinModuleRequest(moduleRequest.moduleRequest.id)" v-bind:class="{ lightBlueColor: moduleRequest.hasVote}" icon="thumbs-up" size="lg" class="pointer btnJoinModuleRequest"/> {{ moduleRequest.moduleRequest.moduleRequestLikes.length }}</b-card-text>
            <b-button v-if="authRole === 'ADMIN'" variant="primary" class="btnDecline float-right ml-3" @click="getTitleName(moduleRequest.moduleRequest.title)" v-b-modal="'modal-add-module'+moduleRequest.moduleRequest.id">Buat Modul</b-button>
            <b-button v-if="authRole === 'ADMIN'" variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-module'+moduleRequest.moduleRequest.id" >Tolak</b-button>
        </b-card-footer>
        <b-modal :id="'modal-add-module'+moduleRequest.moduleRequest.id" centered>
            <h5 class="pl-5 text-center mb-3"><b>Buat Modul</b></h5>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Nama Modul</b-col>
                <b-col sm="8"><b-form-input v-model="iName" type="text"></b-form-input></b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3">
                <label class="mt-2">Deskripsi</label>
              </b-col>
              <b-col sm="8">
                <b-form-textarea rows="8" max-rows="15" class="mb-0" v-model="editorContentDesc"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Status</b-col>
                <b-col sm="8">
                  <b-form-select v-model="itemStatusM">
                    <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  </b-form-select>
                </b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Kategori</b-col>
                <b-col sm="8">
                  <b-form-select v-model="itemCategory">
                    <option v-for="category in moduleCategories" :key="category.id" :value="category.name">{{category.name}}</option>
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
                <b-col sm="8"><b-form-input type="number" @change="totalSession(iSession)" v-model="iSession"></b-form-input></b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Waktu</b-col>
                <b-col sm="6"><b-form-input type="number" v-model="iTimer"></b-form-input></b-col>
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
            <template slot="modal-footer" slot-scope="{ cancel, ok}">
                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                <b-button size="sm" variant="primary" @click="ok()" style="width:100px" v-b-modal="'modal-add-class'">Lanjut</b-button>
            </template>
        </b-modal>
        <b-modal id="modal-add-class" centered>
            <h5 class="pl-5 text-center mb-3"><b>Buat Kelas</b></h5>
            <p class="font-weight-bold pl-5 mb-4" style="font-size:18px">{{ iName }} V.1<font-awesome-icon icon="file-signature" size="sm"/></p>
            <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3">Nama Kelas</b-col>
              <b-col><b-form-input type="text" v-model="iClass"></b-form-input></b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Jumlah Minimal Peserta</b-col>
                <b-col sm="6"><b-form-input type="number" v-model="iMin"></b-form-input></b-col>
                <b-col sm="2 mt-2">Orang</b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Jumlah Maksimal Peserta</b-col>
                <b-col sm="6"><b-form-input type="number" v-model="iMax"></b-form-input></b-col>
                <b-col sm="2 mt-2">Orang</b-col>
            </b-row>
            <p class="font-weight-bold pl-5 mb-1">{{iTimer}} Menit / Sesi</p>
            <b-row class="pl-5 pb-2 pt-3">
                <b-col sm="10"></b-col>
                <b-col sm="2" class="text-center">Dengan Ujian</b-col>
            </b-row>
            <b-row class="pl-5" v-for="index in Number(iSession)" :key="index">
              <b-col sm="2" class="mt-2">Sesi {{ index }}</b-col>
              <b-col sm="3"><date-picker v-model="iDate[index-1]" :config="{format: 'DD/MM/YYYY'}"></date-picker></b-col>
              <b-col sm="1" class="mt-2">Pukul</b-col>
              <b-col sm="2"><date-picker v-model="iTime[index-1]" :config="{format: 'HH:mm'}"></date-picker></b-col>
              <b-col sm="2" class="mt-2">WIB</b-col>
              <b-col sm="2" class="text-center"><b-form-checkbox @change="changeCheck(index-1)" :checked="iEx[index-1]==true"></b-form-checkbox></b-col>
            </b-row>
            <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar Materi yang Harus Diajarkan</p>
            <p v-html="editorContentList"></p>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Pelatih</b-col>
                <b-col sm="8">
                  <b-form-select v-model="iTrainer">
                    <option v-for="trainerL in trainerList" :key="trainerL.id" :value="trainerL.email">{{trainerL.fullname}}</option>
                  </b-form-select>
                </b-col>
            </b-row>
            <b-row class="font-weight-bold pl-5 mb-3">
                <b-col sm="3 mt-2">Status</b-col>
                <b-col sm="8">
                  <b-form-select v-model="itemStatusC">
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </b-form-select>
                </b-col>
            </b-row>
            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                <b-button size="sm" variant="dark" @click="cancel()" v-b-modal="'modal-add-module'" style="width:100px">Kembali</b-button>
                <b-button size="sm" variant="primary" @click="addModuleClass(moduleRequest.moduleRequest.id); if (vValid==true) { ok(); vValid=false }" style="width:100px">Buka Kelas</b-button>
            </template>
        </b-modal>
        <b-modal :id="'modal-decline-module'+moduleRequest.moduleRequest.id" centered>
            Apakah Anda yakin akan menolak modul "{{moduleRequest.moduleRequest.title}}"?
            <template slot="modal-footer" slot-scope="{ cancel, ok }">
                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                <b-button size="sm" variant="primary" @click="responseModuleRequest(moduleRequest.moduleRequest.id, 'rejected');ok()" style="width:100px">Ya</b-button>
            </template>
        </b-modal>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  props: ['moduleRequests'],
  data () {
    return {
      authRole: '',
      trainerList: '',
      moduleCategories: '',
      vValid: false,
      editorContentDesc: '',
      editorContentList: '',
      iName: '',
      itemStatusM: 'open',
      itemCategory: 'Backend Development',
      itemExam: true,
      iSession: 1,
      iTimer: '',
      iClass: '',
      iMin: '',
      iMax: '',
      iTrainer: 'trainer@gmail.com',
      itemStatusC: 'open',
      iDate: [],
      iTime: [],
      iDateTime: [],
      iEx: [],
      tempClassSess: []
    }
  },
  methods: {
    joinModuleRequest (moduleId) {
      this.$axios.post('http://komatikugm.web.id:13370/modules/_likes', {
        moduleRequestId: moduleId
      }, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getContentPage(0)
      })
      .catch(error => console.log(error.response))
    },
    getTitleName (titleName) {
      this.iName = titleName
    },
    responseModuleRequest (moduleId, action) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/_requests/' + moduleId + '/_status/' + action, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getContentPage(0)
        })
      .catch(error => console.log(error))
    },
    addModuleClass (reqId) {
      if (this.editorContentDesc === '' || this.editorContentList === '' || this.iName === '' || this.iTimer === '' || this.iTimer < 15 ||
      this.iSession === '' || this.iSession < 1 || this.iClass === '' || this.iMin === '' || Number(this.iMin) < 5 || this.iMax === '' || Number(this.iMax) < Number(this.iMin)) {
        if (this.editorContentDesc === '') {
          alert('Deskripsi modul harus diisi')
        }
        if (this.editorContentList === '') {
          alert('Daftar materi modul harus diisi')
        }
        if (this.iName === '') {
          alert('Nama modul harus diisi')
        }
        if (this.iTimer === '' || this.iTimer < 15) {
          alert('Waktu pertemuan modul harus diisi minimal 15 menit')
        }
        if (this.iSession === '' || this.iSession < 1) {
          alert('Jumlah sesi modul minimal 1 kali')
        }
        if (this.iClass === '') {
          alert('Nama kelas harus diisi')
        }
        if (this.iMin === '' || Number(this.iMin) < 5) {
          alert('Jumlah minimum peserta sebanyak 5 orang')
        }
        if (this.iMax === '' || Number(this.iMax) < Number(this.iMin)) {
          alert('Jumlah maksimal peserta tidak kurang dari ' + this.iMin + ' orang')
        }
      } else {
        for (let index = 0; index < Number(this.iSession); index++) {
          // eslint-disable-next-line
          this.iDate[index] = this.iDate[index].match(/(\d{2})\/(\d{2})\/(\d{4})/)
          this.iTime[index] = this.iTime[index].match(/(\d{2}):(\d{2})/)
          this.iDateTime[index] = new Date(this.iDate[index][3], this.iDate[index][2] - 1, this.iDate[index][1], this.iTime[index][1], this.iTime[index][2]).getTime()
          this.tempClassSess[index] = {
            description: 'Sesi ' + (index + 1),
            exam: this.iEx[index],
            startTime: this.iDateTime[index]
          }
        }
        this.$axios.post('http://komatikugm.web.id:13370/_trainer/_modulesclassrooms', {
            classroom: {
              classroomSessions: this.tempClassSess,
              maxMember: Number(this.iMax),
              minMember: Number(this.iMin),
              name: this.iClass,
              status: this.itemStatusC,
              trainerEmail: this.iTrainer
            },
            module: {
              description: this.editorContentDesc,
              hasExam: this.itemExam,
              materialDescription: this.editorContentList,
              moduleCategory: this.itemCategory,
              name: this.iName,
              status: this.itemStatusM,
              timePerSession: Number(this.iTimer),
              totalSession: Number(this.iSession)
            }
        }, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.getContentPage(0)
          })
        .catch(error => console.log(error))
        this.vValid = true
        this.responseModuleRequest(reqId, 'accepted')
      }
    },
    totalSession (count) {
      this.iDate.length = Number(count)
      this.iTime.length = Number(count)
      this.iDateTime.length = Number(count)
      this.iEx.length = Number(count)
      this.tempClassSess.length = Number(count)
    },
    changeCheck (idx) {
      if (this.iEx[idx] === true) {
        this.iEx[idx] = false
      } else {
        this.iEx[idx] = true
      }
    }
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
      .then(response => (this.authRole = response.data.role))
      .catch(error => { console.log(error) })
    this.$axios
      .get('http://komatikugm.web.id:13370/users?page=0&role=TRAINER', {withCredentials: true})
      .then(response => (this.trainerList = response.data.data))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
      .catch(error => { console.log(error.response) })
  }
}
</script>

<style scoped>
div.modulRequested{
  min-width: 100% !important;
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
  font-size: 20px
}
</style>
