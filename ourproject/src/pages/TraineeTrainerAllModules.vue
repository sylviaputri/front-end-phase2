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
                    <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
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
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="all">semua kategori</option>
                    <option value="1">Artificial Intelligent</option>
                    <option value="2">Data Analyze</option>
                  </b-form-select>
                </b-col>
                <b-col class="mr-3">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
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
      <module-card></module-card>
  </div>
</template>

<script>
import ModuleCard from './../components/ModuleCard.vue'
export default {
  components: {
    'module-card': ModuleCard
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
