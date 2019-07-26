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
        <div class="fadedWhiteBackground mt-3" v-if="activeTab==1">
            <b-card-group id="cardGroupClassFollowed" class="my-3 px-3 py-3">
                <b-card class="classFollowed my-1" v-for="index in 5" :key="index">
                    <b-row>
                    <b-col sm="10" class="text-justify">
                        <b-card-text class="classFollowedName my-0">Kelas PEL003</b-card-text>
                        <b-card-text class="classFollowedModuleName font-weight-bold my-0">Data Visualization with Python V.4</b-card-text>
                        <b-card-text class="classFollowedModuleDesc">Data Visualization allows you to customize, automate and build beautiful and granular depictions of your data. Upgrade your career by learning a bit of Python to build powerful visualizations that harness your data and powers your career. </b-card-text>
                    </b-col>
                    <b-col sm="2" class="text-center px-0">
                        <b-card-text class="classFollowedPercentage purpleColor font-weight-bold mt-5">25%</b-card-text>
                    </b-col>
                    </b-row>
                    <b-row class="mt-2">
                        <b-col sm="10">
                            <b-card-text class="classFollowedNextSession purpleColor font-weight-bold pt-3">Sesi berikutnya : 28 Agustus 2019</b-card-text>
                        </b-col>
                        <b-col sm="2" class="px-0">
                            <b-button v-b-toggle="'detail-1'" variant="outline-dark" class="btnClassFollowedDetail py-1 mt-3">
                                <span class="when-closed">lihat detail <font-awesome-icon icon="angle-double-right" size="xs" rotation="90"/></span>
                                <span class="when-opened">sembunyikan <font-awesome-icon icon="angle-double-right" size="xs" rotation="270"/></span>
                            </b-button>
                        </b-col>
                    </b-row>
                    <!-- detail -->
                    <b-collapse id="detail-1" class="mt-4">
                        <!-- trainer -->
                        <p class="font-weight-bold">Pelatih</p>
                        <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="classFollowedImgTrainer float-left mb-3"></b-img>
                        <div class="float-left">
                            <b-card-text class="classFollowedTrainerName mb-0 ml-4">Nama Pelatih</b-card-text>
                            <b-card-text class="classFollowedTrainerRating orangeColor ml-4">4.2 / 5.0</b-card-text>
                        </div>
                        <!-- session -->
                        <p class="font-weight-bold" style="clear:both">Sesi Kelas</p>
                        <p class="classFollowedPerSession ml-5">45 menit/sesi</p>
                        <light-timeline :items='items'>
                            <template slot='content' slot-scope='{ item }'>
                                {{item.content}} <span style="color:red">{{item.exam}}</span>
                            </template>
                        </light-timeline>
                        <!-- material -->
                        <p class="font-weight-bold">Materi</p>
                        <a href="" class="ml-5">Materi_data_vis_python_v4.zip</a>
                    </b-collapse>
                </b-card>
            </b-card-group>
        </div>
        <div class="fadedWhiteBackground mt-3" v-if="activeTab==2">
            <b-card-group id="cardGroupClassFollowedCanceled" class="my-3 px-3 py-3">
                <b-card class="classFollowedCanceled my-1" v-for="index in 5" :key="index">
                    <b-card-text class="classFollowedCanceledName my-0">Kelas PEL003</b-card-text>
                        <b-card-text class="classFollowedCanceledModuleName font-weight-bold my-0">Data Visualization with Python V.4</b-card-text>
                        <b-card-text class="classFollowedCanceledModuleDesc">Data Visualization allows you to customize, automate and build beautiful and granular depictions of your data. Upgrade your career by learning a bit of Python to build powerful visualizations that harness your data and powers your career. </b-card-text>
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
      items: [
        {
          content: 'Kamis, 25 Juli 2019, pukul 12.00 WIB'
        },
        {
          content: 'Rabu, 12 Agustus 2019, pukul 10.00 WIB'
        },
        {
          content: 'Rabu, 19 Agustus 2019, pukul 10.00 WIB'
        },
        {
          content: `Jumat, 30 Agustus 2019, pukul 13.30 WIB`,
          exam: '(EXAM)'
        }
      ]
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
.classFollowed, .classFollowedCanceled{
    min-width: 100%;
}
.classFollowedPercentage{
    font-size: 30px
}
.classFollowedImgTrainer{
    width: 60px
}
.collapsed > .when-opened, :not(.collapsed) > .when-closed {
  display: none;
}
.line-item{
    color: black
}
.item-circle{
    border-color: #5F00BF !important
}
.line-item:first-child .item-circle{
    background: #5F00BF !important
}
</style>
