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
            <b-card-group id="cardGroupClassFollowed" class="my-3 px-3 py-3">
                <b-card class="trainerClassHistory my-1" v-for="index in 5" :key="index">
                    <b-card-text class="trainerClassFollowedName my-0">Kelas PEL003</b-card-text>
                    <b-card-text class="trainerClassFollowedModuleName font-weight-bold my-0">Data Visualization with Python V.4</b-card-text>
                    <b-card-text class="trainerClassFollowedCategory mb-0">Data Visualization</b-card-text>
                    <b-row>
                        <b-col sm="10">
                            <b-card-text class="classFollowedNextSession purpleColor font-weight-bold pt-1">Berakhir pada : 28 Agustus 2019</b-card-text>
                        </b-col>
                        <b-col sm="2" class="px-0 text-right">
                            <router-link to="/trainer/my-account/my-train-history/grade-list">
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
      activeTab: 1
    }
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
    }
  }
}
</script>

<style>
.trainerClassHistory{
    min-width: 100%;
}
</style>
