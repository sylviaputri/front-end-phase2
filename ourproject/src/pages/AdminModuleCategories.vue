<template>
  <div id="adminModuleCategories" class="px-5">
      <h2 class="font-weight-bold mb-4">Kategori Modul</h2>
      <b-button class="btn-info mb-2" style="top:4px; width:20%;" v-b-modal="'modal-add-category'">
        <font-awesome-icon icon="plus"/>
        Tambah Kategori
      </b-button>
      <category-table :allCategories=allModuleCategories></category-table>
      <b-modal id="modal-add-category" centered>
          <h5 class="pl-5 text-center mb-3"><b>Tambah Kategori</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama Kategori</b-col>
              <b-col sm="8"><b-form-input type="text" v-model="iCatName"></b-form-input></b-col>
          </b-row>
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="ok(); addCatModule(iCatName); getRefresh()" style="width:100px">Tambah</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import CategoriesTable from './../components/ModuleCategoriesTable.vue'
export default {
  data () {
    return {
      allModuleCategories: '',
      iCatName: ''
    }
  },
  components: {
    'category-table': CategoriesTable
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    addCatModule (iCatName) {
      this.$axios.post('http://komatikugm.web.id:13370/_trainer/modules/_categories', {
            name: iCatName
        }, { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  },
  watch: {
    allModuleCategories () {
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_categories?page=0&size=5', {withCredentials: true})
        .then(response => (this.allModuleCategories = response.data.data))
        .catch(error => { console.log(error.response) })
    }
  },
  created () {
    this.setLayout('admin-layout')
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories?page=0&size=5', {withCredentials: true})
      .then(response => (this.allModuleCategories = response.data.data))
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
