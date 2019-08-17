<template>
  <div id="adminAllModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Modul</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col cols="8">
              <b-row>
                <b-col>
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" v-model="searchKeyword" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="3" class="mr-3">
                  <font-awesome-icon icon="shapes" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selectedCategory" @change="getContentPage(0)" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">Semua Kategori</option>
                    <option v-for="category in moduleCategories" :key="category.id" :value="category.name">{{category.name}}</option>
                  </b-form-select>
                </b-col>
                <b-col cols="3" class="mr-3">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="selectedExam"  @change="getContentPage(0)" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">Ujian dan Tanpa Ujian</option>
                    <option value="false">Tanpa Ujian</option>
                    <option value="true">Ujian</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
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
      <div v-if="allModules == null" class="text-center my-3 py-2">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-else-if="allModules.content == ''" class="text-center my-3 py-2"><h5><b>Tidak ada modul yang dicari</b></h5></div>
      <module-table v-else :modules=allModules :page=page></module-table>
      <pagination v-if="(allModules != null || allModules != '') && totalPages > 1" :totalPages="totalPages" :page.sync="page" class="paginationWhiteBackground"></pagination>
      <b-modal id="modal-add-module" class="modal-detail-class" centered>
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
              <!-- <VueTrix v-model="editorContentDesc" placeholder="Maksimal 300 karakter"/> -->
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
          <!-- pop up footer -->
          <template slot="modal-footer" slot-scope="{ cancel, ok}">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px" v-b-modal="'modal-add-class'">Lanjut</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-add-class" class="modal-detail-class" centered>
          <h5 class="pl-5 text-center mb-3"><b>Buat Kelas</b></h5>
          <p class="font-weight-bold pl-5 mb-4" style="font-size:18px">{{ iName }} V.1<font-awesome-icon icon="file-signature" size="sm"/></p>
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
          <!-- pop up footer -->
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" v-b-modal="'modal-add-module'" style="width:100px">Kembali</b-button>
              <b-button size="sm" variant="primary" @click="addModuleClass(); if (vValid==true) { ok(); vValid=false }" style="width:100px">Buka Kelas</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import ModuleTable from './../components/ModuleTable.vue'
import VueTrix from 'vue-trix'
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      VueTrix,
      page: 0,
      totalPages: 0,
      vValid: false,
      searchKeyword: '',
      selectedCategory: 'all',
      selectedExam: 'all',
      moduleCategories: '',
      allModules: null,
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
      trainerList: '',
      itemStatusC: 'open',
      iDate: [],
      iTime: [],
      iDateTime: [],
      iEx: [],
      tempClassSess: []
    }
  },
  components: {
    'module-table': ModuleTable,
    'pagination': Pagination
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    getContentPage (page) {
      this.allModules = null
      this.page = page
      let category = 'category=' + this.selectedCategory + '&'
      if (this.selectedCategory === 'all') {
        category = ''
      }
      let exam = 'hasExam=' + this.selectedExam + '&'
      if (this.selectedExam === 'all') {
        exam = ''
      }
      let keyName = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        keyName = ''
      }
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_search?' + category + exam + keyName + 'page=' + this.page + '&popular=false&size=15', {withCredentials: true})
        .then(response => {
          this.allModules = response.data.data
          this.totalPages = response.data.data.totalPages
          })
        .catch(error => { console.log(error.response) })
    },
    addModuleClass () {
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
  watch: {
    searchKeyword () {
      this.getContentPage(0)
    }
  },
  created () {
    this.setLayout('admin-layout')
    this.$store.commit('SET_SIDEBARMENU', 0)
    window.scrollTo(0, 0)
  },
  mounted () {
    this.getContentPage(0)
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/users?page=0&role=TRAINER', {withCredentials: true})
      .then(response => (this.trainerList = response.data.data.content))
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
button #trix-button--icon-attach{
	display: hidden;
}
</style>
