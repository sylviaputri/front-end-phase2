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
            <div v-if="classSubscribed == ''" class="text-center py-5">Tidak ada kelas yang sedang kamu ikuti</div>
            <div v-else-if="classSubscribed == null" class="text-center py-3">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-card-group v-else id="cardGroupClassFollowed" class="my-3 px-3 py-3">
                <b-card class="classFollowed my-1" v-for="classSubscribed in classSubscribed" :key="classSubscribed[0].id">
                    <b-row>
                    <b-col sm="10" class="text-justify">
                        <b-card-text class="classFollowedName my-0">{{ classSubscribed[0].name }}</b-card-text>
                        <b-card-text class="classFollowedModuleName font-weight-bold my-0">{{ classSubscribed[0].module.name }} V.{{ classSubscribed[0].module.version }}</b-card-text>
                        <b-card-text class="classFollowedModuleDesc">{{ classSubscribed[0].module.description }}</b-card-text>
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
                            <b-button v-b-toggle="'detail-'+classSubscribed[0].id" variant="outline-dark" class="btnClassFollowedDetail py-1 mt-3">
                                <span class="when-closed">lihat detail <font-awesome-icon icon="angle-double-right" size="xs" rotation="90"/></span>
                                <span class="when-opened">sembunyikan <font-awesome-icon icon="angle-double-right" size="xs" rotation="270"/></span>
                            </b-button>
                        </b-col>
                    </b-row>
                    <!-- detail -->
                    <b-collapse :id="'detail-'+classSubscribed[0].id" class="mt-4">
                        <!-- trainer -->
                        <p class="font-weight-bold">Pelatih</p>
                        <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="classFollowedImgTrainer float-left mb-3"></b-img>
                        <div class="float-left">
                            <b-card-text class="classFollowedTrainerName mb-0 ml-4">{{ classSubscribed[0].trainer.fullname }}</b-card-text>
                            <b-card-text class="classFollowedTrainerRating orangeColor ml-4">4.2 / 5.0</b-card-text>
                        </div>
                        <!-- session -->
                        <p class="font-weight-bold" style="clear:both">Sesi Kelas</p>
                        <p class="classFollowedPerSession ml-5">{{ classSubscribed[0].module.timePerSession }} menit/sesi</p>
                        <light-timeline :items='classSubscribed[0].classroomSessions'>
                            <template slot='content' slot-scope='{ item }'>
                                {{item.startTime | moment("DD MMMM YYYY hh:mm:ss")}} <span v-if="item.exam" style="color:red">(EXAM)</span>
                            </template>
                        </light-timeline>
                        <!-- material -->
                        <p class="font-weight-bold">Materi</p>
                        <ol class="ml-4">
                            <li v-for="material in classSubscribed[0].classroomMaterials" :key="material.id"><a href="">{{ material.file }}</a></li>
                        </ol>
                    </b-collapse>
                </b-card>
            </b-card-group>
        </div>
        <div class="fadedWhiteBackground mt-3" v-if="activeTab==2">
            <div v-if="classSubscribedRejected == ''" class="text-center py-5">Tidak ada kelas yang dibatalkan</div>
            <div v-else-if="classSubscribedRejected == null" class="text-center py-3">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-card-group v-else id="cardGroupClassFollowedCanceled" class="my-3 px-3 py-3">
                <b-card class="classFollowedCanceled my-1" v-for="classSubscribedRejected in classSubscribedRejected" :key="classSubscribedRejected[0].id">
                    <b-card-text class="classFollowedCanceledName my-0">{{ classSubscribedRejected[0].name }}</b-card-text>
                        <b-card-text class="classFollowedCanceledModuleName font-weight-bold my-0">{{ classSubscribedRejected[0].module.name }} V.{{ classSubscribedRejected[0].module.version }}</b-card-text>
                        <b-card-text class="classFollowedCanceledModuleDesc">{{ classSubscribedRejected[0].module.description }}</b-card-text>
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
      classSubscribed: null,
      classSubscribedRejected: null
    }
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
    },
    getClassSubscribed () {
      this.$axios
        .get('http://komatikugm.web.id:13370/classrooms/_subscribed?page=0&size=15', {withCredentials: true})
        .then(response => (this.classSubscribed = response.data.data.content))
        .catch(error => { console.log(error.response) })
    },
    getClassSubscribedRejected () {
        this.$axios
            .get('http://komatikugm.web.id:13370/classrooms/_subscribed?page=0&size=15&status=rejected', {withCredentials: true})
            .then(response => (this.classSubscribedRejected = response.data.data.content))
            .catch(error => { console.log(error.response) })
    }
  },
  mounted () {
    this.getClassSubscribed()
    this.getClassSubscribedRejected()
  },
  watch: {
      classSubscribed () {
        this.getClassSubscribed()
      },
      classSubscribedRejected () {
          this.getClassSubscribedRejected()
      }
  }
}
</script>

<style scoped>
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
