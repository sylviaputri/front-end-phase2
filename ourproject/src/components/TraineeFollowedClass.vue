<template>
    <div>
        <!-- tab -->
        <b-row class="fadedWhiteBackground m-auto" style="width:100%">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(1)" v-bind:class="{ activeTab: activeTab==1 }">
                Kelas yang sedang diikuti
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==1">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(2)" v-bind:class="{ activeTab: activeTab==2 }">
                Kelas yang dibatalkan
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==2">
            </b-col>
        </b-row>
        <!-- content -->
        <div class="fadedWhiteBackground mt-3">
            <b-card-group id="cardGroupClassFollowed" class="my-3 px-3 py-3">
                <b-card class="classFollowed my-1" v-for="index in 5" :key="index">
                    <b-row>
                    <b-col sm="10" class="text-justify">
                        <b-card-text class="classFollowedName my-0">Kelas PEL003</b-card-text>
                        <b-card-text class="classFollowedModuleName font-weight-bold my-0">Data Visualization with Python V.4</b-card-text>
                        <b-card-text class="classFollowedModuleDesc">Data Visualization allows you to customize, automate and build beautiful and granular depictions of your data. Upgrade your career by learning a bit of Python to build powerful visualizations that harness your data and powers your career. </b-card-text>
                        <b-card-text class="classFollowedNextSession purpleColor font-weight-bold">Sesi berikutnya : 28 Agustus 2019</b-card-text>
                    </b-col>
                    <b-col sm="2" class="text-center">
                        <b-button v-b-toggle="'detail-1'" variant="outline-dark" class="btnClassFollowedDetail py-1 mt-3">lihat detail</b-button>
                        <b-card-text class="classFollowedPercentage purpleColor font-weight-bold mt-3">25%</b-card-text>
                    </b-col>
                    </b-row>
                    <b-collapse id="detail-1" class="mt-2">
                        <p>Pelatih</p>
                    </b-collapse>
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
.classFollowed{
    min-width: 100%;
}
.classFollowedPercentage{
    font-size: 30px
}
</style>
