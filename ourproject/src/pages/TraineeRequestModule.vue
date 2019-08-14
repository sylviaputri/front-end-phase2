<template>
  <div id="traineeRequestModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Permintaan Modul</h2>
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
        <div v-if="searchKeyword!=''" class="px-3" style="clear:both">
          <h5>Hasil pencarian "<strong>{{ searchKeyword }}</strong>"</h5>
          <p>Permintaan modul yang anda cari tidak ada? Klik <span v-b-modal="'modalCreateModuleRequest'" @click="getModuleCategories()" class="blueUnderline pointer">disini</span>, untuk membuat permintaan modul baru</p>
        </div>
        <div v-if="moduleRequests == ''" class="text-center py-5" style="clear:both">
          <b-img :src="require('./../assets/images/no-data-found.png')" style="width:100px"></b-img>
          <h5 class="mt-3">Tidak ada permintaan modul yang ditemukan</h5>
        </div>
        <div v-else-if="moduleRequests == null" class="text-center pt-3" style="clear:both">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else>
          <module-request style="clear:both" :moduleRequests=moduleRequests></module-request>
          <pagination :totalPages="totalPages" :page.sync="page"></pagination>
        </div>
      </div>
      <b-modal id="modalCreateModuleRequest" centered title="Buat permintaan modul">
        <b-row>
          <b-col sm="3">Judul modul</b-col>
          <b-col>
            <b-form-input v-model="requestedModulName" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="3">Kategori</b-col>
          <b-col>
            <b-form-select size="sm" v-model="selectedCategory">
              <option v-for="category in moduleCategories" :key="category.id" :value="category.name">{{category.name}}</option>
            </b-form-select>
          </b-col>
        </b-row>
        <template slot="modal-footer" slot-scope="{ cancel, ok }">
          <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">
            Batal
          </b-button>
          <b-button size="sm" variant="primary" @click="ok(); sendModuleRequest()" style="width:100px">
            Simpan
          </b-button>
        </template>
      </b-modal>
  </div>
</template>

<script>
import ModuleRequest from './../components/ModuleRequest.vue'
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      isPopularActive: true,
      isNewActive: false,
      moduleRequests: null,
      searchKeyword: '',
      moduleCategories: null,
      requestedModulName: '',
      selectedCategory: null,
      totalPages: 0,
      page: 0,
      size: 5
    }
  },
  components: {
    'module-request': ModuleRequest,
    'pagination': Pagination
  },
  created () {
    window.scrollTo(0, 0)
  },
  methods: {
    changeActiveState () {
      this.isPopularActive = !this.isPopularActive
      this.isNewActive = !this.isNewActive
      this.page = 0
      this.getContentPage(0)
    },
    getModuleCategories () {
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
        .then(response => (this.moduleCategories = response.data.data.content))
        .catch(error => { console.log(error.response) })
    },
    inputValid () {
      return this.requestedModulName !== '' && this.selectedCategory !== null
    },
    sendModuleRequest () {
      if (this.inputValid()) {
        this.$axios
          .post('http://komatikugm.web.id:13370/modules/_requests', {
            category: this.selectedCategory,
            title: this.requestedModulName
          }, {withCredentials: true})
          .then(response => console.log(response))
          .catch(error => { console.log(error.response) })
        this.getContentPage(0)
      } else {
        alert('Data harus diinput dengan benar')
      }
    },
    getContentPage (page) {
      this.moduleRequests = null
      let searchName = 'name=' + this.searchKeyword + '&'
      this.page = page
      if (this.searchKeyword === '') {
        searchName = ''
      }
      if (this.isPopularActive) {
        this.$axios
          .get('http://komatikugm.web.id:13370/modules/_requests?' + searchName + '&page=' + this.page + '&popular=true&size=' + this.size, {withCredentials: true})
          .then(response => {
            this.moduleRequests = response.data.data.content
            this.totalPages = response.data.data.totalPages
          })
          .catch(error => { console.log(error.response) })
      } else {
        this.$axios
          .get('http://komatikugm.web.id:13370/modules/_requests?' + searchName + '&page=' + this.page + '&false=true&size=' + this.size, {withCredentials: true})
          .then(response => {
            this.moduleRequests = response.data.data.content
            this.totalPages = response.data.data.totalPages
          })
          .catch(error => { console.log(error.response) })
      }
    }
  },
  mounted () {
    this.getContentPage(this.page)
  },
  watch: {
    searchKeyword () {
      this.getContentPage(0)
    }
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
</style>
