<template>
    <div>
        <!-- tab -->
        <b-row class="fadedWhiteBackground m-auto" style="width:100%">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(1)" v-bind:class="{ activeTab: activeTab==1 }">
                KELAS PERLU DINILAI
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==1">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(2)" v-bind:class="{ activeTab: activeTab==2 }">
                KELAS SUDAH SELESAI
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==2">
            </b-col>
        </b-row>
        <!-- Content -->
        <div class="fadedWhiteBackground">
          <b-card-group id="cardGroupClassFollowed" class="my-3 px-3 py-3" v-if="activeTab == 1">
            <div v-if="notGradedClasses == ''" class="text-center my-3 pt-4 mx-auto">Tidak ada riwayat</div>
            <div v-else-if="notGradedClasses == null" class="text-center my-3 pt-4">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-card v-else class="trainerClassHistory my-1" v-for="notGradedClass in notGradedClasses" :key="notGradedClass.id">
                <b-card-text class="trainerClassFollowedName my-0">{{notGradedClass.name}}</b-card-text>
                <b-card-text class="trainerClassFollowedModuleName font-weight-bold my-0">{{notGradedClass.module.name}} V.{{notGradedClass.module.version}}</b-card-text>
                <b-card-text class="trainerClassFollowedCategory mb-0">{{notGradedClass.module.moduleCategory.name}}</b-card-text>
                <b-row v-if="notGradedClass.module.hasExam">
                    <b-col sm="10"></b-col>
                    <b-col sm="2" class="px-0 text-right">
                        <router-link :to="{path: '/trainer/my-account/my-train-history/' + notGradedClass.id + '/grade-list'}">
                            <b-button variant="outline-dark" class="btnTrainerClassGradeList py-1 mt-0 mr-2">Input nilai</b-button>
                        </router-link>
                    </b-col>
                </b-row>
            </b-card>
          </b-card-group>
          <b-card-group id="cardGroupClassFollowed" class="my-3 px-3 py-3" v-else>
            <div v-if="gradedClasses == ''" class="text-center my-3 pt-4 mx-auto">Tidak ada riwayat</div>
            <div v-else-if="gradedClasses == null" class="text-center my-3 pt-4">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-card v-else class="trainerClassHistory my-1" v-for="gradedClass in gradedClasses" :key="gradedClass.id">
                <b-card-text class="trainerClassFollowedName my-0">{{gradedClass.name}}</b-card-text>
                <b-card-text class="trainerClassFollowedModuleName font-weight-bold my-0">{{gradedClass.module.name}} V.{{gradedClass.module.version}}</b-card-text>
                <b-card-text class="trainerClassFollowedCategory mb-0">{{gradedClass.module.moduleCategory.name}}</b-card-text>
                <b-row v-if="gradedClass.module.hasExam">
                    <b-col sm="10"></b-col>
                    <b-col sm="2" class="px-0 text-right">
                        <router-link :to="{path: '/trainer/my-account/my-train-history/' + gradedClass.id + '/grade-list'}">
                            <b-button variant="outline-dark" class="btnTrainerClassGradeList py-1 mt-0 mr-2">Daftar nilai</b-button>
                        </router-link>
                    </b-col>
                </b-row>
            </b-card>
          </b-card-group>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 1,
      gradedClasses: [],
      notGradedClasses: []
    }
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
    },
    getGradedClasses () {
      this.$axios
      .get('http://komatikugm.web.id:13370/_trainer/classrooms/_history?marked=true', {withCredentials: true})
      .then(response => {
        this.gradedClasses = response.data.data.content
      })
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
    getNotGradedClasses () {
      this.$axios
      .get('http://komatikugm.web.id:13370/_trainer/classrooms/_history?marked=false', {withCredentials: true})
      .then(response => {
        this.notGradedClasses = response.data.data.content
      })
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
    }
  },
  mounted () {
    this.getNotGradedClasses()
    this.getGradedClasses()
  }
}
</script>

<style scoped>
.trainerClassHistory{
    min-width: 100%;
}
</style>
