<template>
  <div id="traineeTrainerAllModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Modul</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col cols="4">
              <b-row>
                <b-col>
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input v-model="searchKeyword" type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
            </b-col>
            <b-col cols="7">
              <b-row>
                <b-col class="mr-3">
                  <font-awesome-icon icon="shapes" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="optionCategory" @change="getContentPage(0)" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">Semua Kategori</option>
                    <option v-for="category in moduleCategories" :key="category.id" :value="category.name">{{category.name}}</option>
                  </b-form-select>
                </b-col>
                <b-col class="mr-3">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="optionExam" @change="getContentPage(0)" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">ujian dan tanpa ujian</option>
                    <option value="false">tanpa ujian</option>
                    <option value="true">ujian</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <div v-if="modules == ''" class="fadedWhiteBackground text-center py-5">
        <b-img :src="require('./../assets/images/no-data-found.png')" style="width:150px"></b-img>
        <h5 class="mt-3">Tidak ada modul yang ditemukan</h5>
        <h6 v-if="role === 'TRAINEE'">Modul yang anda cari tidak ada? Klik <router-link to="/trainee/request-module" class="blueUnderline pointer">disini</router-link>, untuk melihat daftar permintaan modul</h6>
      </div>
      <div v-else-if="modules == null" class="text-center py-3 fadedWhiteBackground">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-else class="fadedWhiteBackground p-2">
        <module-card :modules="modules" :role="role"></module-card>
        <pagination v-if="modules != null || modules != ''" :totalPages="totalPages" :page.sync="page"></pagination>
      </div>
  </div>
</template>

<script>
import ModuleCard from './../components/ModuleCard.vue'
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      role: null,
      modules: null,
      moduleCategories: null,
      searchKeyword: '',
      optionCategory: 'all',
      optionExam: 'all',
      optionSortBy: 'rating',
      totalPages: 0,
      page: 0,
      size: 15
    }
  },
  components: {
    'module-card': ModuleCard,
    'pagination': Pagination
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.getRole()
    this.getContentPage(this.page)
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    getRole () {
      this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
      .then(response => {
          let originalRole = response.data.role
          if (originalRole === 'TRAINER' && localStorage.roleSwitch === 'TRAINEE') {
              this.role = localStorage.roleSwitch
          } else {
              this.role = response.data.role
          }
      })
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    getContentPage (page) {
      this.modules = null
      this.page = page
      let category = 'category=' + this.optionCategory + '&'
      if (this.optionCategory === 'all') {
        category = ''
      }
      let exam = 'hasExam=' + this.optionExam + '&'
      if (this.optionExam === 'all') {
        exam = ''
      }
      let name = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        name = ''
      }
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_search?' + category + exam + name + 'page=' + this.page + '&popular=true&size=' + this.size, {withCredentials: true})
        .then(response => {
          this.modules = response.data.data.content
          this.totalPages = response.data.data.totalPages
        })
        .catch(error => {
          console.log(error.response)
          var errorMessage = error.response.data.message
          if (Array.isArray(errorMessage)) {
            var errorMessageArray = ''
            for (var i = 0; i < errorMessage.length; i++) {
              errorMessageArray += errorMessage[i] + ' '
            }
            alert(errorMessageArray)
          } else alert(errorMessage)
        })
    }
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
