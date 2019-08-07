<template>
  <div id="traineeDashboard">
      <div id="introduction" class="mb-4">
          <h2 class="font-weight-bold">Dashboard</h2>
          <b-img :src="require('./../assets/images/brain_dashboard.jpg')" rounded="circle" class="float-left mt-2 mr-4"></b-img>
          <h6 class="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h6>
      </div>
      <br/>
      <!-- 3 Class Followes -->
      <div class="fadedWhiteBackground px-2 py-2">
        <h5 class="float-left lightBlueColor">KELAS YANG SEDANG DIIKUTI</h5>
        <div class="text-right">
          <router-link to="/trainee/my-account/my-class" @click.native="setSidebarMenu(4)" v-if="classSubscribed != null && classSubscribed != ''">
            <b-button variant="outline-dark">lihat keseluruhan <font-awesome-icon icon="angle-double-right" size="xs"/></b-button>
          </router-link>
        </div>
        <div id="cardClassFollowed" class="mx-2 my-3">
          <b-card-group deck v-if="classSubscribed != null && classSubscribed != ''">
            <b-card class="classFollowed pl-3 mb-2 pointer" v-for="classSubscribed in classSubscribed" :key="classSubscribed">
              <b-card-img :src="require('./../assets/images/class_ornament.png')" class="classOrnament position-absolute"></b-card-img>
              <b-card-text class="classFollowedPersent position-absolute font-weight-bold" style="top:0;right:5px">25%</b-card-text>
              <b-card-text class="classFollowedName mb-1">{{ classSubscribed[0].name }}</b-card-text>
              <b-card-text class="classFollowedModuleName font-weight-bold mb-1">{{ classSubscribed[0].module.name }} V.{{ classSubscribed[0].module.version }} <font-awesome-icon v-if="classSubscribed[0].module.hasExam" icon="file-signature" size="sm"/></b-card-text>
              <b-card-text class="classFollowedDesc">{{ classSubscribed[0].module.description }}</b-card-text>
            </b-card>
          </b-card-group>
          <div v-else class="text-center pt-3">Tidak ada kelas yang sedang kamu ikuti</div>
        </div>
      </div>
      <br/>
      <!-- Top Trainers -->
      <div class="fadedWhiteBackground px-2 py-2">
        <h5 class="lightBlueColor">BELAJAR DENGAN PELATIH TERBAIK</h5>
        <b-card-group id="cardGroupTopTrainers" class="my-3 px-2">
          <!-- example -->
          <!-- <div v-for="index in 3" :key="index">
            <b-card class="topTrainers border-0">
              <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="imgTrainer float-left mt-2 mr-4"></b-img>
              <b-img :src="require('./../assets/images/medal.png')" class="imgMedal position-absolute"></b-img>
              <b-card-text class="trainerRating font-weight-bold position-absolute orangeColor">5.0/5.0</b-card-text>
              <b-card-text class="trainerName font-weight-bold mb-1">Nama Trainer</b-card-text>
              <b-card-text class="trainerDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore sed do eiusmod tempor incididunt ut labore et doloresed do eiusmod tempor incididunt ut labore et doloresed do eiusmod tempor incididunt ut labore et dolore gna aliqua</b-card-text>
            </b-card>
            <hr align="center" width="50%" class="mt-2 border-0" v-if="index != 3">
          </div> -->
          <!-- axios -->
          <div v-for="trainer in topTrainer" :key="trainer">
            <b-card class="topTrainers border-0">
              <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="imgTrainer float-left mt-2 mr-4"></b-img>
              <b-img :src="require('./../assets/images/medal.png')" class="imgMedal position-absolute"></b-img>
              <b-card-text class="trainerRating font-weight-bold position-absolute orangeColor">{{ trainer.rating }}/5.0</b-card-text>
              <b-card-text class="trainerName font-weight-bold mb-1">{{ trainer.name }}</b-card-text>
              <b-card-text class="trainerDesc">Saya adalah orang yang memiliki passion di bidang web developer</b-card-text>
            </b-card>
            <hr align="center" width="50%" class="mt-2 border-0" v-if="index != 3">
          </div>
        </b-card-group>
      </div>
      <br/>
      <!-- Top 5 Module -->
      <div class="fadedWhiteBackground px-2 py-2">
        <h5 class="float-left lightBlueColor">MODUL RATING TERTINGGI</h5>
        <div class="text-right">
          <router-link to="/trainee/all-module" @click.native="setSidebarMenu(1)">
            <b-button variant="outline-dark">lihat keseluruhan <font-awesome-icon icon="angle-double-right" size="xs"/></b-button>
          </router-link>
        </div>
        <div id="cardTopModule" class="mx-2 my-3">
          <module-card :modules=topModules></module-card>
        </div>
      </div>
      <br/>
      <!-- Top Module Request -->
      <div class="fadedWhiteBackground px-2 py-2">
        <h5 class="float-left lightBlueColor">PERMINTAAN MODUL</h5>
        <div class="text-right">
          <router-link to="/trainee/request-module" @click.native="setSidebarMenu(2)">
            <b-button variant="outline-dark">lihat keseluruhan <font-awesome-icon icon="angle-double-right" size="xs"/></b-button>
          </router-link>
        </div>
        <module-request :moduleRequests=topModuleRequests></module-request>
      </div>
      <br/>
      <!-- Top Class Request -->
      <div class="fadedWhiteBackground px-2 py-2 mb-5">
        <h5 class="float-left lightBlueColor">PERMINTAAN KELAS</h5>
        <div class="text-right">
          <router-link to="/trainee/request-class" @click.native="setSidebarMenu(3)">
            <b-button variant="outline-dark">lihat keseluruhan <font-awesome-icon icon="angle-double-right" size="xs"/></b-button>
          </router-link>
        </div>
        <class-request :classRequests=topClassRequests></class-request>
      </div>
  </div>
</template>

<script>
import ModuleRequest from './../components/ModuleRequest'
import ClassRequest from './../components/ClassRequest.vue'
import ModuleCard from './../components/ModuleCard.vue'
export default {
  data () {
    return {
      classSubscribed: null,
      topTrainer: null,
      topModules: null,
      topModuleRequests: null,
      topClassRequests: null
    }
  },
  components: {
    'module-request': ModuleRequest,
    'class-request': ClassRequest,
    'module-card': ModuleCard
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    setSidebarMenu (sidebarIndex) {
      this.$store.commit('SET_SIDEBARMENU', sidebarIndex)
      if (sidebarIndex === 4) {
        this.$store.commit('SET_SIDEBARACCOUNTMENU', 1)
      }
    }
  },
  created () {
    this.setLayout('trainee-layout')
    this.$store.commit('SET_SIDEBARMENU', 0)
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_subscribed?page=0&size=3', {withCredentials: true})
      .then(response => (this.classSubscribed = response.data.data.content))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/trainers/_top?page=0&size=3', {withCredentials: true})
      .then(response => (this.topTrainer = response.data.data.content))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_search?page=0&popular=true&size=6', {withCredentials: true})
      .then(response => (this.topModules = response.data.data.content))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_requests?page=0&popular=true&size=5', {withCredentials: true})
      .then(response => (this.topModuleRequests = response.data.data.content))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_requests?page=0&size=5', {withCredentials: true})
      .then(response => (this.topClassRequests = response.data.data.content))
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
div#traineeDashboard>div{
  width: 90%;
  margin: auto;
}
div#introduction img{
  height: 90px;
}
div.classFollowed{
  max-width: calc(33.3% - 30px);
  min-width: calc(33.3% - 30px);
}
div.classFollowed .classOrnament{
  top: 0;
  left: 0;
  height: 80px;
  width: 80px;
}
div.cardClassFollowed p.classFollowedPersent {
  color: #25975F;
}
#cardGroupTopTrainers>div{
  min-width: 100%;
}
.topTrainers{
  background: transparent;
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
}
div.classFollowed:hover{
  background: rgba(255, 255, 255, 60%) !important
}
</style>
