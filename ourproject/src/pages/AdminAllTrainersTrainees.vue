<template>
  <div id="adminAllTrainersTrainees" class="px-5">
      <h2 class="font-weight-bold mb-4">Daftar Seluruh Pelatih dan Peserta</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="5">
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" placeholder="Ketik nama yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="all">Semua</option>
                    <option value="0">Pelatih</option>
                    <option value="1">Peserta</option>
                  </b-form-select>
                </b-col>
                <b-col cols="2">
                  <font-awesome-icon icon="sort-alpha-down" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="rating">ID</option>
                    <option value="name">Nama</option>
                    <option value="email">Email</option>
                    <option value="telepon">No Telepon</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="2">
              <b-row>
                <b-col>
                  <router-link to="/admin/add-module">
                    <b-button class="position-absolute btn-info" style="top:4px; width:90%;">
                      <font-awesome-icon icon="plus"/>
                      Tambah Pengguna
                    </b-button>
                  </router-link>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <user-table></user-table>
  </div>
</template>

<script>
import UserTable from './../components/TrainersTraineesTable.vue'
export default {
  components: {
    'user-table': UserTable
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
