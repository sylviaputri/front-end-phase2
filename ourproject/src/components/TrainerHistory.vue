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
            <div v-if="completedClasses == ''" class="text-center my-3 pt-4">Tidak ada riwayat</div>
            <div v-if="completedClasses == null" class="text-center my-3 pt-4">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-card-group id="cardGroupClassFollowed" class="my-3 px-3 py-3">
                <b-card class="trainerClassHistory my-1" v-for="completedClass in completedClasses" :key="completedClass.id">
                    <b-card-text class="trainerClassFollowedName my-0">{{completedClass.name}}</b-card-text>
                    <b-card-text class="trainerClassFollowedModuleName font-weight-bold my-0">{{completedClass.module.name}} V.{{completedClass.module.version}}</b-card-text>
                    <b-card-text class="trainerClassFollowedCategory mb-0">{{completedClass.module.moduleCategory.name}}</b-card-text>
                    <b-row>
                        <b-col sm="10"></b-col>
                        <b-col sm="2" class="px-0 text-right">
                            <router-link :to="{path: '/trainer/my-account/my-train-history/' + completedClass.id + '/grade-list'}">
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
      completedClasses: null
    }
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
      if (this.activeTab === 1) {
        this.getCompletedClassNotYetGraded()
      } else {
        this.getCompletedClassGraded()
      }
    },
    getCompletedClassNotYetGraded () {
      this.$axios
      .get('http://komatikugm.web.id:13370/_trainer/classrooms?page=0&size=15&status=completed&graded=false', {withCredentials: true})
      .then(response => (this.completedClasses = response.data.data.content))
      .catch(error => { console.log(error.response) })
    },
    getCompletedClassGraded () {
      this.$axios
      .get('http://komatikugm.web.id:13370/_trainer/classrooms?page=0&size=15&status=completed&graded=true', {withCredentials: true})
      .then(response => (this.completedClasses = response.data.data.content))
      .catch(error => { console.log(error.response) })
    }
  },
  mounted () {
    this.getCompletedClassNotYetGraded()
  },
  watch: {
    completedClasses () {
      if (this.activeTab === 1) {
        this.getCompletedClassNotYetGraded()
      } else {
        this.getCompletedClassGraded()
      }
    }
  }
}
</script>

<style scoped>
.trainerClassHistory{
    min-width: 100%;
}
</style>
