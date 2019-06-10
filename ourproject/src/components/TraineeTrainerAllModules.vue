<template>
  <div id="traineeTrainerAllModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Modul</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4">
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
      <b-card-group deck class="mb-5">
        <b-card class="module mt-3 pointer" v-for="index in 10" :key="index">
          <b-card-text class="moduleRating mb-1 float-left font-weight-bold ">5.0/5.0</b-card-text>
          <b-card-text class="moduleCategory mb-1 float-right font-weight-bold ">Artificial Intelligent</b-card-text>
          <b-card-text class="moduleName font-weight-bold mb-1">Machine Learning V.3 <font-awesome-icon icon="file-signature" size="sm"/></b-card-text>
          <b-card-text class=" moduleDesc mb-1 mr-5">Learn the basics of Machine Learning in this introductory course. Machine learning is transforming the world ...</b-card-text>
          <b-card-img :src="require('./../assets/images/module_ornament.png')" class="moduleOrnament position-absolute"></b-card-img>
          <b-card-footer class="moduleFooter p-0 mt-3 pr-5">
            <b-card-text class="moduleOpenedClass float-left mb-0 grayColor">2 kelas dibuka</b-card-text>
            <b-card-text class="moduleSession float-left mb-0 ml-4 grayColor"><font-awesome-icon icon="hourglass-half" size="sm"/> 45 menit x 3 sesi</b-card-text>
          </b-card-footer>
        </b-card>
      </b-card-group>
  </div>
</template>

<script>
export default {
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
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
div.module{
  max-width: calc(33.3% - 30px);
  min-width: calc(33.3% - 30px);
}
div.module:hover{
  background: rgba(255, 255, 255, 90%)
}
div.module .card-body{
  padding: 5px;
}
div.module .moduleRating{
  color: #D40000;
}
div.module .moduleRating, div.module .moduleCategory, div.module .card-footer{
  font-size: 13px;
}
div.module .moduleName{
  clear: both
}
div.module .moduleFooter{
  z-index: 2;
}
div.module .moduleOrnament{
  width: 80px;
  height: 80px;
  bottom: 0;
  right: 0;
}
.searchingTools .searchingIcon>div{
  border: none;
  background: transparent;
}
</style>
