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
                  <router-link to="/admin/add-module">
                    <b-button class="position-absolute btn-info mb-2" style="top:4px; width:90%;">
                      <font-awesome-icon icon="plus"/>
                      Tambah Kategori
                    </b-button>
                  </router-link>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <category-table></category-table>
  </div>
</template>

<script>
import CategoriesTable from './../components/ModuleCategoriesTable.vue'
export default {
  components: {
    'category-table': CategoriesTable
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    window.scrollTo(0, 0)
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
.searchingTools .searchingIcon>div{
  border: none;
  background: transparent;
}
</style>
