<template>
  <div id="traineeDashboard">
      <div id="introduction" class="mb-4">
          <h2 class="font-weight-bold">Dashboard</h2>
          <b-img :src="require('./../assets/images/brain_dashboard.jpg')" rounded="circle" class="float-left mt-2 mr-4"></b-img>
          <h6 class="mt-4" style="font-size: 20px">Kelas pelatihan khusus bagi karyawan. Akses kapanpun dan dimanapun. Pengguna boleh mendaftar di kelas manapun sesuai keinginan. Jika kelas penuh, pengguna dapat mengirimkan permintaan kelas. Jika modul yang dicari tidak tersedia, pengguna juga dapat mengirimkan permintaan modul. Semangat belajar!!</h6>
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
          <div v-if="classSubscribed == ''" class="text-center pt-3">
            Tidak ada kelas yang sedang kamu ikuti
          </div>
          <div v-else-if="classSubscribed === null" class="text-center pt-3">
            <b-spinner label="Spinning"></b-spinner>
          </div>
          <b-card-group deck v-else>
            <b-card class="classFollowed pl-3 mb-2" v-for="classSubscribed in classSubscribed" :key="classSubscribed[0].id">
              <b-card-img :src="require('./../assets/images/class_ornament.png')" class="classOrnament position-absolute"></b-card-img>
              <b-card-text class="classFollowedPersent position-absolute font-weight-bold" style="top:0;right:5px">{{ countPercentage(classSubscribed[0].classroomSessions) }}</b-card-text>
              <b-card-text class="classFollowedName mb-1">{{ classSubscribed[0].name | cutClassName }}</b-card-text>
              <b-card-text class="classFollowedModuleName font-weight-bold mb-1">{{ classSubscribed[0].module.name | cutModuleName }} V.{{ classSubscribed[0].module.version }} <font-awesome-icon v-if="classSubscribed[0].module.hasExam" icon="file-signature" size="sm"/></b-card-text>
              <b-card-text class="classFollowedDesc">{{ classSubscribed[0].module.description | cutDescription }}</b-card-text>
            </b-card>
          </b-card-group>
        </div>
      </div>
      <br/>
      <!-- Top Trainers -->
      <div class="fadedWhiteBackground px-2 py-2">
        <h5 class="lightBlueColor">BELAJAR DENGAN PELATIH TERBAIK</h5>
        <div v-if="topTrainer == null" class="text-center">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="topTrainer == ''" class="text-center">
          <p>Belum ada trainer yang terdaftar</p>
        </div>
        <b-card-group v-else id="cardGroupTopTrainers" class="my-3 px-2">
          <div v-for="trainer in topTrainer" :key="trainer.name">
            <b-card class="topTrainers border-0">
              <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="imgTrainer float-left mt-2 mr-4"></b-img>
              <b-img :src="require('./../assets/images/medal.png')" class="imgMedal position-absolute"></b-img>
              <b-card-text class="trainerRating font-weight-bold position-absolute orangeColor">{{ trainer.rating | ratingPrecision }}/5.0</b-card-text>
              <b-card-text class="trainerName font-weight-bold mb-1 mt-4 ml-3">{{ trainer.name }}</b-card-text>
            </b-card>
            <hr align="center" width="50%" class="mt-2 border-0">
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
          <module-card :modules="topModules" role="TRAINEE"></module-card>
        </div>
        <div v-if="topModules == null" class="text-center">
          <b-spinner label="Spinning"></b-spinner>
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
        <div v-if="topModuleRequests == null" class="text-center">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="topModuleRequests == ''" class="text-center">
          <p>Belum ada permintaan modul</p>
        </div>
        <module-request v-else :moduleRequests=topModuleRequests></module-request>
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
        <div v-if="topClassRequests == null" class="text-center">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="topClassRequests == ''" class="text-center">
          <p>Belum ada permintaan kelas</p>
        </div>
        <class-request v-else :classRequests=topClassRequests></class-request>
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
  filters: {
    ratingPrecision: function (value) {
      if (!value) return ''
      return value.toFixed(1)
    },
    cutDescription (value) {
      if (!value) return ''
      else if (value.length >= 72) {
        return value.slice(0, 72) + ' ...'
      } else {
        return value
      }
    },
    cutModuleName (value) {
      if (!value) return ''
      else if (value.length >= 28) {
        return value.slice(0, 28) + ' ...'
      } else {
        return value
      }
    },
    cutClassName (value) {
      if (!value) return ''
      else if (value.length >= 30) {
        return value.slice(0, 30) + ' ...'
      } else {
        return value
      }
    }
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
    },
    getClassSubscribed () {
      this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_subscribed?page=0&size=3', {withCredentials: true})
      .then(response => (this.classSubscribed = response.data.data.content))
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    getTopTrainer () {
      this.$axios
      .get('http://komatikugm.web.id:13370/trainers/_top?page=0&size=3', {withCredentials: true})
      .then(response => (this.topTrainer = response.data.data.content))
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    getTopModules () {
      this.$axios
      .get('http://komatikugm.web.id:13370/modules/_search?page=0&popular=true&size=6', {withCredentials: true})
      .then(response => (this.topModules = response.data.data.content))
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    getModuleRequests () {
      this.$axios
      .get('http://komatikugm.web.id:13370/modules/_requests?page=0&popular=true&size=3', {withCredentials: true})
      .then(response => (this.topModuleRequests = response.data.data.content))
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    getClassRequests () {
      this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/_requests?page=0&size=3', {withCredentials: true})
      .then(response => (this.topClassRequests = response.data.data.content))
      .catch(error => {
        console.log(error.response)
        var errorMessage = error.response.data.message
        if (Array.isArray(errorMessage)) {
          var errorMessageArray = ''
          for (var i = 0; i < errorMessage.length; i++) {
            errorMessageArray += errorMessage[i] + ' '
          }
          alert(errorMessageArray)
        } else alert(errorMessage)
      })
    },
    getContentPage (page) {
      this.getClassRequests()
      this.getModuleRequests()
    },
    countPercentage (classSessions) {
      var count = 0
      for (var i = 0; i < classSessions.length; i++) {
          if (classSessions[i].startTime < new Date()) {
              count++
          }
      }
      return (count / classSessions.length * 100 + '%')
    }
  },
  created () {
    this.setLayout('trainee-layout')
    this.$store.commit('SET_SIDEBARMENU', 0)
  },
  mounted () {
    this.getClassSubscribed()
    this.getTopTrainer()
    this.getTopModules()
    this.getModuleRequests()
    this.getClassRequests()
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
  height: 90px;
}
.topTrainers .imgMedal{
  height: 40px;
  left: 75px;
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
</style>
