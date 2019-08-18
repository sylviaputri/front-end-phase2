<template>
  <div id="adminModuleCategories" class="px-5">
      <h2 class="font-weight-bold mb-4">Kategori Modul</h2>
      <b-button class="btn-info mb-2" style="top:4px; width:20%;" @click="iCatName=''" v-b-modal="'modal-add-category'">
        <font-awesome-icon icon="plus"/>
        Tambah Kategori
      </b-button>
      <div v-if="allModuleCategories == null" class="text-center my-3 py-2">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-else-if="allModuleCategories.content == ''" class="text-center my-3 py-2"><h5><b>Tidak ada Kategori</b></h5></div>
      <category-table v-else :allCategories=allModuleCategories :page=page></category-table>
      <pagination v-if="(allModuleCategories != null || allModuleCategories != '') && totalPages > 1" :totalPages="totalPages" :page.sync="page" class="paginationWhiteBackground"></pagination>
      <b-modal id="modal-add-category" centered>
          <h5 class="pl-5 text-center mb-3"><b>Tambah Kategori</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama Kategori</b-col>
              <b-col sm="8"><b-form-input type="text" v-model="iCatName"></b-form-input></b-col>
          </b-row>
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" style="width:100px"
              @click="addCatModule(iCatName); if (vValid==true) { ok(); vValid=false }">Tambah</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import CategoriesTable from './../components/ModuleCategoriesTable.vue'
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      allModuleCategories: '',
      iCatName: '',
      totalPages: 0,
      page: 0,
      totalItem: 0,
      vValid: false
    }
  },
  components: {
    'category-table': CategoriesTable,
    'pagination': Pagination
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    isTheSame (n) {
      for (let index = 0; index < this.totalItem; index++) {
        if (n === this.allModuleCategories.content[index].name) {
           return true
        }
      }
      return false
    },
    getContentPage (page) {
      this.page = page
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_categories?page=' + this.page + '&popular=false&size=15', {withCredentials: true})
        .then(response => {
          this.allModuleCategories = response.data.data
          this.totalPages = response.data.data.totalPages
          this.totalItem = response.data.data.content.length
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
    addCatModule (iCatName) {
      if (iCatName === '' || this.isTheSame(iCatName)) {
        if (iCatName === '') {
          alert('Nama kategori harus diisi')
        } else {
          alert('Kategori sudah terdaftar')
        }
      } else {
        this.$axios.post('http://komatikugm.web.id:13370/_trainer/modules/_categories', {
            name: iCatName
        }, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.getContentPage(0)
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
        this.vValid = true
      }
    }
  },
  created () {
    this.setLayout('admin-layout')
  },
  mounted () {
    this.getContentPage(0)
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
