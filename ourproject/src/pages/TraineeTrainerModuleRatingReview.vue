<template>
    <div id="reviewAndRating" class="px-4">
        <h4 class="font-weight-bold">PERINGKAT & ULASAN</h4>
        <div class="m-auto text-center">
            <h3 class="orangeColor font-weight-bold mt-3">3.5 / 5.0</h3>
            <star-rating v-bind:increment="0.5" v-bind:max-rating="5"  inactive-color="white" active-color="#D43300"
                v-bind:star-size="25" rating="3.5" read-only="true" border-width="2" border-color="#D43300"
                glow="3" glow-color="#D43300"></star-rating>
            <p class="mt-2 grayColor" style="font-size:17px">Total 13 orang</p>
        </div>
        <b-card-group deck class="my-3" style="width:100%">
            <b-card class="reviewModule" v-for="index in 5" :key="index">
                <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="reviewTraineeImage float-left"></b-img>
                <div class="float-left">
                    <b-card-text class="reviewTraineeName mb-0 ml-4 font-weight-bold">Nama Peserta</b-card-text>
                    <b-card-text class="reviewModuleRating orangeColor ml-4 font-weight-bold">4.5 / 5.0</b-card-text>
                </div>
                <b-card-text class="reviewModuleDesc ml-4" style="clear:both; padding-left:60px">Materi yang diberikan sangat bermanfaat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b-card-text>
            </b-card>
        </b-card-group>
        <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="lg"></b-pagination-nav>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    }
  }
}
</script>

<style>
div#reviewAndRating{
  background: url('./../assets/background_images/rating_review.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  margin-top: 55px !important;
  width: 100%;
  height: 100%;
}
.vue-star-rating{
    margin:auto
}
.vue-star-rating-rating-text{
    display: none
}
.reviewModule{
    min-width: 100%;
    background: transparent;
    border: none
}
.reviewModule .reviewTraineeImage{
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
