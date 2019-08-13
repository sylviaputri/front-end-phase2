<template>
    <div id="reviewAndRating" class="px-4">
        <h4 class="font-weight-bold">PERINGKAT & ULASAN</h4>
        <div class="m-auto text-center">
            <h3 class="orangeColor font-weight-bold mt-3">{{ moduleRating | ratingPrecision }} / 5.0</h3>
            <star-rating v-bind:increment="0.5" v-bind:max-rating="5"  inactive-color="white" active-color="#D43300"
                v-bind:star-size="25" :rating="moduleRating" read-only="true" border-width="2" border-color="#D43300"
                glow=3 glow-color="#D43300"></star-rating>
            <p class="mt-2 grayColor" style="font-size:17px">Total {{ moduleTotalUserRating }} orang</p>
        </div>
        <b-card-group deck class="my-3" style="width:100%">
            <b-card class="reviewModule" v-for="ratingReview in ratingReviews" :key="ratingReview.id">
                <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="reviewTraineeImage float-left"></b-img>
                <div class="float-left">
                    <b-card-text class="reviewTraineeName mb-0 ml-4 font-weight-bold">Nama Peserta</b-card-text>
                    <b-card-text class="reviewModuleRating orangeColor ml-4 font-weight-bold">{{ ratingReview.value | ratingPrecision }} / 5.0</b-card-text>
                </div>
                <b-card-text class="reviewModuleDesc ml-4" style="clear:both; padding-left:60px">{{ ratingReview.comment }}</b-card-text>
            </b-card>
        </b-card-group>
        <div class="overflow-auto mt-5">
          <router-link :to="{path: '/trainee/detail-module/' + $route.params.moduleId}" class="float-left">
            <b-button variant="primary" class="mt-2 ml-2 px-3">Back</b-button>
          </router-link>
          <b-pagination-nav v-model="currentPage" :link-gen="linkGen" :number-of-pages="totalPages" use-router align="right" size="lg"></b-pagination-nav>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        ratingReviews: null,
        moduleRating: 0,
        moduleTotalUserRating: 0,
        currentPage: 1,
        totalPages: 0
    }
  },
  methods: {
    linkGen (pageNum) {
    },
    getTotalPages () {
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_ratings/' + this.$route.params.moduleId + '?page=0&size=5', {withCredentials: true})
        .then(response => (this.totalPages = response.data.data.totalPages))
        .catch(error => { console.log(error.response) })
    },
    getRatingReviews (page) {
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_ratings/' + this.$route.params.moduleId + '?page=' + page + '&size=5', {withCredentials: true})
        .then(response => (this.ratingReviews = response.data.data.content))
        .catch(error => { console.log(error.response) })
    },
    getModuleRating () {
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
        .then(response => (this.moduleRating = response.data.data.moduleRating))
        .catch(error => { console.log(error.response) })
    },
    getModuleTotalUserRating () {
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
        .then(response => (this.moduleTotalUserRating = response.data.data.module.moduleRatings.length))
        .catch(error => { console.log(error.response) })
    }
  },
  mounted () {
    this.getRatingReviews(0)
    this.getTotalPages()
    this.getModuleRating()
    this.getModuleTotalUserRating()
  },
  filters: {
    ratingPrecision: function (value) {
      return value.toFixed(1)
    }
  },
  watch: {
    currentPage () {
      this.getRatingReviews(this.currentPage - 1)
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
  min-width: 100%;
  min-height: 100%
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
