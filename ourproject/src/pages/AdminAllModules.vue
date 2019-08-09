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
                  <b-form-select v-model="selectedCategory" @change="searchModule()" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">Semua Kategori</option>
                    <option v-for="category in moduleCategories" :key="category.id" :value="category.name">{{category.name}}</option>
                  </b-form-select>
                </b-col>
                <b-col cols="3" class="mr-3">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="selectedExam"  @change="searchModule()" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
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
      <module-table :modules=allModules></module-table>
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
              <VueTrix v-model="editorContentDesc" placeholder="Maksimal 300 karakter"/>
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
              <b-button size="sm" variant="primary" @click="next()" style="width:100px" v-b-modal="'modal-add-class'">Lanjut</b-button>
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
  </div>
</template>

<script>
import ModuleTable from './../components/ModuleTable.vue'
import VueTrix from 'vue-trix'
export default {
  data () {
    return {
      VueTrix,
      searchKeyword: '',
      selectedCategory: 'all',
      selectedExam: 'all',
      moduleCategories: '',
      allModules: '',
      editorContentDesc: '',
      editorContentList: '',
      iName: '',
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
  components: {
    'module-table': ModuleTable
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    searchModule () {
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
        .get('http://komatikugm.web.id:13370/modules/_search?' + category + exam + keyName + 'page=0&popular=false&size=15', {withCredentials: true})
        .then(response => (this.allModules = response.data.data))
        .catch(error => { console.log(error.response) })
    },
    addModule (iName, iRole, iEmail, iPhone) {
      this.$axios.post('http://komatikugm.web.id:13370/_admin/users', {
            email: iEmail,
            name: iName,
            phone: iPhone,
            role: iRole
        }, { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    addClass () {
      this.$axios.post('http://komatikugm.web.id:13370/_trainer/classrooms', {
            classroomSessions: [
              {
                description: 'str',
                exam: true,
                startTime: 'dd-MM-yyyy hh:mm:ss'
              }
            ],
            maxMember: 0,
            minMember: 0,
            moduleId: 0,
            name: 'string',
            refClassroomId: 0
        }, { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  },
  watch: {
    searchKeyword () {
      this.searchModule()
    },
    allModules () {
      this.searchModule()
    }
  },
  created () {
    this.setLayout('admin-layout')
    this.$store.commit('SET_SIDEBARMENU', 0)
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_search?page=0&popular=false&size=15', {withCredentials: true})
      .then(response => (this.allModules = response.data.data))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
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
