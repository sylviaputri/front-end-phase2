<template>
  <div id="adminAllClasses" class="px-5">
      <h2 class="font-weight-bold mb-4">Kelas</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="6">
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="1"></b-col>
                <b-col>
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="all">ujian dan tanpa ujian</option>
                    <option value="0">tanpa ujian</option>
                    <option value="1">ujian</option>
                  </b-form-select>
                </b-col>
                <b-col>
                  <font-awesome-icon icon="sort-alpha-down" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="rating">rating</option>
                    <option value="name">nama modul</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <class-table></class-table>
      <b-modal id="modal-delete-class" centered>
          Apakah Anda yakin akan menghapus kelas ini?
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
              <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import ClassTable from './../components/ClassTable.vue'
export default {
  components: {
    'class-table': ClassTable
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
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
</style>
