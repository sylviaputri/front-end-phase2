<template>
    <div>
        <b-row class="fadedWhiteBackground m-auto" style="width:100%">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(1)" v-bind:class="{ activeTab: activeTab==1 }">
                Lulus
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==1">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(2)" v-bind:class="{ activeTab: activeTab==2 }">
                Tidak Lulus
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==2">
            </b-col>
        </b-row>
        <div class="fadedWhiteBackground mt-3">
            <b-card-group id="cardGroupClassHistory" class="my-3 px-3 py-3">
              <b-card class="classHistory my-1" v-for="index in 5" :key="index">
                <b-row>
                  <b-col sm="9" class="text-justify">
                    <b-card-text class="classHistoryName my-0">Kelas PEL003</b-card-text>
                    <b-card-text class="classHistoryModuleName font-weight-bold my-0">Data Visualization with Python V.4</b-card-text>
                    <b-card-text class="classHistoryModuleDesc">Data Visualization allows you to customize, automate and build beautiful and granular depictions of your data. Upgrade your career by learning a bit of Python to build powerful visualizations that harness your data and powers your career. </b-card-text>
                  </b-col>
                  <b-col sm="3" class="text-center">
                    <b-card-text class="my-0">Nilai</b-card-text>
                    <b-card-text class="classHistoryGrade orangeColor font-weight-bold my-0">10 / 10</b-card-text>
                    <b-button variant="outline-dark" class="btnClassHistoryRatingReview py-1 mt-3">beri rating & review</b-button>
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
.activeTab{
  color: rgb(10, 135, 192) !important
}
.classHistory{
  min-width: 100%;
}
.classHistoryGrade{
  font-size: 23px;
}
.btnClassHistoryRatingReview{
  font-size: 13px;
}
</style>
