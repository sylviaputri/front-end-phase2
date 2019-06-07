<template>
  <div id="traineeDashboard">
      <div id="introduction" class="mb-4">
          <h2 class="font-weight-bold">Dashboard</h2>
          <b-img :src="require('./../assets/images/brain_dashboard.jpg')" rounded="circle" class="float-left mt-2 mr-4"></b-img>
          <h6 class="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h6>
      </div>
      <br/>
      <!-- Class Followes -->
      <div id="classFollowed" class="fadedWhiteBackground px-2 py-2">
        <h5 class="float-left lightBlueColor">KELAS YANG SEDANG DIIKUTI</h5>
        <div class="text-right">
          <b-button variant="outline-dark">lihat keseluruhan <font-awesome-icon icon="angle-double-right" size="xs"/></b-button>
        </div>
        <div id="cardClassFollowed" class="mx-2 my-3">
          <b-card-group deck>
            <b-card class="classFollowed pl-5">
              <b-card-text class="classFollowedPersent position-absolute font-weight-bold" style="top:0;right:5px">25%</b-card-text>
              <b-card-text class="classFollowedName mb-1">Kelas Pel006</b-card-text>
              <b-card-text class="classFollowedModuleName font-weight-bold mb-1">Data Visualization with Python V.4]</b-card-text>
              <b-card-text class="classFollowedDesc">Upgrade your career by learning a bit of Python to build powerful visualizations that harness ....</b-card-text>
            </b-card>
            
            <b-card class="classFollowed pl-5">
              <b-card-text class="classFollowedPersent position-absolute font-weight-bold" style="top:0;right:5px">25%</b-card-text>
              <b-card-text class="classFollowedName mb-1">Kelas Pel006</b-card-text>
              <b-card-text class="classFollowedModuleName font-weight-bold mb-1">Data Visualization with Python V.4]</b-card-text>
              <b-card-text class="classFollowedDesc">Upgrade your career by learning a bit of Python to build powerful visualizations that harness ....</b-card-text>
            </b-card>

            <b-card class="classFollowed pl-5">
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
      <div id="topTrainers" class="fadedWhiteBackground">
        <h5 class="lightBlueColor">BELAJAR DENGAN PELATIH TERBAIK</h5>
        <b-list-group>
          <b-list-group-item>
            Cras justo odio
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Dapibus ac facilisis in
            <b-badge variant="primary" pill>2</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Morbi leo risus
            <b-badge variant="primary" pill>1</b-badge>
          </b-list-group-item>
        </b-list-group>
      </div>
      <br/>
      <div id="topModule" class="fadedWhiteBackground"></div>
      <br/>
      <div id="moduleRequested" class="fadedWhiteBackground"></div>
      <br/>
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
  max-width: 33%;
}
div.cardClassFollowed p.classFollowedPersent {
  color: #25975F;
}
.cardClassFollowed .classFollowedName{
}
.cardClassFollowed .classFollowedModuleName{
}
.cardClassFollowed .classFollowedDesc{
}
</style>
