<template>
  <div id="adminModuleCategories" class="px-5">
      <h2 class="font-weight-bold mb-4">Kategori Modul</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="6">
                  <b-input-group class="mb-2">
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" placeholder="Ketik kategori yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="2">
              <b-row>
                <b-col>
                  <b-button class="position-absolute btn-info mb-2" style="top:4px; width:90%;" v-b-modal="'modal-add-category'">
                    <font-awesome-icon icon="plus"/>
                    Tambah Kategori
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <category-table :allCategories=allModuleCategories></category-table>
      <b-modal id="modal-add-category" centered>
          <h5 class="pl-5 text-center mb-3"><b>Tambah Kategori</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama Kategori</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Tambah</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-edit-category" centered>
          <h5 class="pl-5 text-center mb-3"><b>Edit Kategori</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama Kategori</b-col>
              <b-col sm="8"><b-form-input type="text"></b-form-input></b-col>
          </b-row>
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Simpan</b-button>
          </template>
      </b-modal>
      <b-modal id="modal-delete-category" centered>
          Apakah Anda yakin akan menghapus kategori ini?
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import CategoriesTable from './../components/ModuleCategoriesTable.vue'
export default {
  data () {
    return {
      allModuleCategories: null
    }
  },
  components: {
    'category-table': CategoriesTable
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
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
