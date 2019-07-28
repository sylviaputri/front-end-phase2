<template>
    <div>
        <b-row class="fadedWhiteBackground p-0 ml-1" style="width:100%">
            <b-col class="text-center font-weight-bold" style="color: rgb(10, 135, 192) !important">
                PERINGKAT & ULASAN TENTANG SAYA
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px">
            </b-col>
        </b-row>
        <div class="fadedWhiteBackground mb-3">
            <div class="m-auto text-center">
                <h3 class="orangeColor font-weight-bold mt-3 pt-2">3.5 / 5.0</h3>
                <star-rating v-bind:increment="0.5" v-bind:max-rating="5"  inactive-color="white" active-color="#D43300"
                    v-bind:star-size="25" rating="3.5" read-only="true" border-width="2" border-color="#D43300"
                    glow="3" glow-color="#D43300"></star-rating>
                <p class="mt-2 grayColor" style="font-size:17px">Total 13 orang</p>
            </div>
            <b-card-group deck class="my-3" style="width:100%">
                <b-card class="reviewTrainer" v-for="index in 5" :key="index">
                    <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="reviewTraineeImage float-left"></b-img>
                    <div class="float-left">
                        <b-card-text class="reviewTraineeName mb-0 ml-4 font-weight-bold">Nama Peserta</b-card-text>
                        <b-card-text class="reviewTrainerRating orangeColor ml-4 font-weight-bold">4.5 / 5.0</b-card-text>
                    </div>
                    <b-card-text class="reviewTrainerDesc ml-4" style="clear:both; padding-left:60px">Pelatih dapat menjelaskan materi dengan jelas. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</b-card-text>
                </b-card>
            </b-card-group>
            <div class="overflow-auto">
                <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="lg"></b-pagination-nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    }
  }
}
</script>

<style scoped>
.vue-star-rating{
    margin:auto
}
.vue-star-rating-rating-text{
    display: none
}
.reviewTrainer{
    min-width: 100%;
    background: transparent;
    border: none
}
.reviewTrainer .reviewTraineeImage{
    width: 60px;
    height: 60px;
}
.page-link{
    background: transparent !important;
    color: black;
    font-weight: bold;
    padding: 15px !important;
    border: none
}
.page-item.active{
    background: #0A87C0;
}
</style>
