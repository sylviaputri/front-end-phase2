<template>
  <div id="traineeDashboard">
      <div id="introduction" class="mb-4">
          <h2 class="font-weight-bold">Dashboard</h2>
          <b-img :src="require('./../assets/images/brain_dashboard.jpg')" rounded="circle" class="float-left mt-2 mr-4"></b-img>
          <h6 class="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h6>
      </div>
      <br/>
      <!-- 3 Class Followes -->
      <div id="classFollowed" class="fadedWhiteBackground px-2 py-2">
        <h5 class="float-left lightBlueColor">KELAS YANG SEDANG DIIKUTI</h5>
        <div class="text-right">
          <b-button variant="outline-dark">lihat keseluruhan <font-awesome-icon icon="angle-double-right" size="xs"/></b-button>
        </div>
        <div id="cardClassFollowed" class="mx-2 my-3">
          <b-card-group deck>
            <b-card class="classFollowed pl-5 mb-2">
              <b-card-text class="classFollowedPersent position-absolute font-weight-bold" style="top:0;right:5px">25%</b-card-text>
              <b-card-text class="classFollowedName mb-1">Kelas Pel006</b-card-text>
              <b-card-text class="classFollowedModuleName font-weight-bold mb-1">Data Visualization with Python V.4]</b-card-text>
              <b-card-text class="classFollowedDesc">Upgrade your career by learning a bit of Python to build powerful visualizations that harness ....</b-card-text>
            </b-card>
            <b-card class="classFollowed pl-5 mb-2">
              <b-card-text class="classFollowedPersent position-absolute font-weight-bold" style="top:0;right:5px">25%</b-card-text>
              <b-card-text class="classFollowedName mb-1">Kelas Pel006</b-card-text>
              <b-card-text class="classFollowedModuleName font-weight-bold mb-1">Data Visualization with Python V.4]</b-card-text>
              <b-card-text class="classFollowedDesc">Upgrade your career by learning a bit of Python to build powerful visualizations that harness ....</b-card-text>
            </b-card>
            <b-card class="classFollowed pl-5 mb-2">
              <b-card-text class="classFollowedPersent position-absolute font-weight-bold" style="top:0;right:5px">25%</b-card-text>
              <b-card-text class="classFollowedName mb-1">Kelas Pel006</b-card-text>
              <b-card-text class="classFollowedModuleName font-weight-bold mb-1">Computer Science Basics: Alg... V.1 <font-awesome-icon icon="file-signature" size="s"/></b-card-text>
              <b-card-text class="classFollowedDesc">Upgrade your career by learning a bit of Python to build powerful visualizations that harness ....</b-card-text>
            </b-card>
          </b-card-group>
        </div>
      </div>
      <br/>
      <!-- Top Trainers -->
      <div id="topTrainers" class="fadedWhiteBackground px-2 py-2">
        <h5 class="lightBlueColor">BELAJAR DENGAN PELATIH TERBAIK</h5>
          <b-card-group id="cardGroupTopTrainers" class="my-3 px-2">
            <b-card class="topTrainers">
              <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="imgTrainer float-left mt-2 mr-4"></b-img>
              <b-img :src="require('./../assets/images/medal.png')" class="imgMedal position-absolute"></b-img>
              <b-card-text class="trainerRating font-weight-bold position-absolute">5.0/5.0</b-card-text>
              <b-card-text class="trainerName font-weight-bold mb-1">Nama Trainer</b-card-text>
              <b-card-text class="trainerDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore gna aliqua</b-card-text>
            </b-card>
            <hr align="center" width="50%" class="mt-2">
            <b-card class="topTrainers">
              <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="imgTrainer float-left mt-2 mr-4"></b-img>
              <b-img :src="require('./../assets/images/medal.png')" class="imgMedal position-absolute"></b-img>
              <b-card-text class="trainerRating font-weight-bold position-absolute">5.0/5.0</b-card-text>
              <b-card-text class="trainerName font-weight-bold mb-1">Nama Trainer</b-card-text>
              <b-card-text class="trainerDesc">Lorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore gna aliqua</b-card-text>
            </b-card>
            <hr align="center" width="50%" class="mt-2">
            <b-card class="topTrainers">
              <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="imgTrainer float-left mt-2 mr-4"></b-img>
              <b-img :src="require('./../assets/images/medal.png')" class="imgMedal position-absolute"></b-img>
              <b-card-text class="trainerRating font-weight-bold position-absolute">5.0/5.0</b-card-text>
              <b-card-text class="trainerName font-weight-bold mb-1">Nama Trainer</b-card-text>
              <b-card-text class="trainerDesc">Lorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing eorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore gna aliqua</b-card-text>
            </b-card>
          </b-card-group>
      </div>
      <br/>
      <!-- Top 5 Module -->
      <div id="topModule" class="fadedWhiteBackground px-2 py-2">
        <h5 class="float-left lightBlueColor">MODUL RATING TERTINGGI</h5>
        <div class="text-right">
          <b-button variant="outline-dark">lihat keseluruhan <font-awesome-icon icon="angle-double-right" size="xs"/></b-button>
        </div>
        <div id="cardTopModule" class="mx-2 my-3">
          <b-card-group deck>
            <b-card class="topModule mb-2">
              <b-card-text class="mb-1">Kelas Pel006</b-card-text>
              <b-card-text class="font-weight-bold mb-1">Data Visualization with Python V.4]</b-card-text>
              <b-card-text class="mb-1">Kelas Pel006</b-card-text>
              <b-card-text class="font-weight-bold mb-1">Data Visualization with Python V.4]</b-card-text>
            </b-card>
          </b-card-group>
        </div>
      </div>
      <br/>
      <!-- Top Module Request -->
      <div id="moduleRequested" class="fadedWhiteBackground"></div>
      <br/>
      <!-- Top Class Request -->
      <div id="classRequested" class="fadedWhiteBackground"></div>
  </div>
</template>

<script>
export default {
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    this.setLayout('trainee-layout')
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
div#traineeDashboard>div{
  width: 90%;
  margin: auto;
}
div#introduction img{
  height: 90px;
}
div#classFollowed{
  height: max-content;
}
div.classFollowed{
  background: url('./../assets/images/card_class.png') no-repeat;
  background-size: cover;
  max-width: 374px;
  min-width: 374px;
}
div.cardClassFollowed p.classFollowedPersent {
  color: #25975F;
}
.topTrainers{
  background: transparent;
  border: none;
  min-width: 100%;
}
.topTrainers .imgTrainer{
  height: 100px;
}
.topTrainers .imgMedal{
  height: 50px;
  left: 85px;
  top: 90px
}
.topTrainers .trainerRating{
  right: 20px;
  font-size: 21px;
  color: #D40000;
}
.topTrainers .trainerName{
  font-size: 19px;
}
.topTrainers .trainerDesc{
  font-size: 16px;
  margin-right: 80px;
  margin-left: 130px;
}
#cardGroupTopTrainers hr{
  height: 1px;
  background-color: black;
  border: none;
}
div.topModule{
  background: url('./../assets/images/card_module.png') no-repeat;
  background-size: cover;
  max-width: 374px;
  min-width: 374px;
}
</style>
