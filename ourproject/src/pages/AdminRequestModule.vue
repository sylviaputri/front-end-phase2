<template>
  <div id="adminRequestModules" class="px-5">
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
        <div v-if="allModulesRequest == null" class="text-center my-3 py-2">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="allModulesRequest == ''" class="text-center my-3 py-2"><br><br><br><h5><b>Tidak ada permintaan modul yang dicari</b></h5><br><br></div>
        <all-modules-request v-else style="clear:both" :moduleRequests=allModulesRequest></all-modules-request>
      </div>
      <pagination v-if="(allModulesRequest != null || allModulesRequest != '') && totalPages > 1" :totalPages="totalPages" :page.sync="page" class="paginationWhiteBackground"></pagination>
  </div>
</template>

<script>
import AllModulesRequest from './../components/ModuleRequest.vue'
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      isPopularActive: true,
      isNewActive: false,
      searchKeyword: '',
      moduleCategories: null,
      allModulesRequest: null,
      page: 0,
      totalPages: 0
    }
  },
  components: {
    'all-modules-request': AllModulesRequest,
    'pagination': Pagination
  },
  methods: {
    changeActiveState: function () {
      this.isPopularActive = !this.isPopularActive
      this.isNewActive = !this.isNewActive
      this.getContentPage(0)
    },
    getContentPage (page) {
      this.allModulesRequest = null
      this.page = page
      let keyName = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        keyName = ''
      }
      if (this.isPopularActive) {
        this.$axios
          .get('http://komatikugm.web.id:13370/modules/_requests?' + keyName + 'page=' + this.page + '&popular=true&size=7', {withCredentials: true})
          .then(response => {
            this.allModulesRequest = response.data.data.content
            this.totalPages = response.data.data.totalPages
            })
          .catch(error => { console.log(error.response) })
      } else {
        this.$axios
          .get('http://komatikugm.web.id:13370/modules/_requests?' + keyName + 'page=' + this.page + '&popular=false&size=7', {withCredentials: true})
          .then(response => {
            this.allModulesRequest = response.data.data.content
            this.totalPages = response.data.data.totalPages
            })
          .catch(error => { console.log(error.response) })
      }
    }
  },
  watch: {
    searchKeyword () {
      this.getContentPage(0)
    }
  },
  mounted () {
    this.getContentPage(0)
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
</style>
