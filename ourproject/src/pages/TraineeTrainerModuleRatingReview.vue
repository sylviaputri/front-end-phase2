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
          <div v-if="ratingReviews == ''" class="text-center py-5 m-auto" style="clear:both">
            <h5 class="mt-3">Belum ada review</h5>
          </div>
          <div v-else-if="ratingReviews == null" class="text-center pt-3 m-auto" style="clear:both">
            <b-spinner label="Spinning"></b-spinner>
          </div>
          <b-card v-else class="reviewModule" v-for="ratingReview in ratingReviews" :key="ratingReview.id">
              <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="reviewTraineeImage float-left"></b-img>
              <div class="float-left">
                  <b-card-text class="reviewTraineeName mb-0 ml-4 font-weight-bold">Nama Peserta</b-card-text>
                  <b-card-text class="reviewModuleRating orangeColor ml-4 font-weight-bold">{{ ratingReview.value | ratingPrecision }} / 5.0</b-card-text>
              </div>
              <b-card-text class="reviewModuleDesc ml-4" style="clear:both; padding-left:60px">{{ ratingReview.comment }}</b-card-text>
          </b-card>
        </b-card-group>
        <div class="overflow-auto mt-5">
          <router-link :to="{path: '/' + myRole + '/detail-module/' + $route.params.moduleId}" class="float-left">
            <b-button variant="primary" class="mt-2 ml-2 px-3">Back</b-button>
          </router-link>
          <pagination v-if="ratingReviews != '' || ratingReviews != null" :totalPages="totalPages"></pagination>
        </div>
    </div>
</template>

<script>
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      role: null,
      myRole: '',
      ratingReviews: null,
      moduleRating: 0,
      moduleTotalUserRating: 0,
      totalPages: 0,
      size: 5
    }
  },
  components: {
    'pagination': Pagination
  },
  methods: {
    getContentPage (page) {
      this.ratingReviews = null
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_ratings/' + this.$route.params.moduleId + '?page=' + page + '&size=' + this.size, {withCredentials: true})
        .then(response => {
          this.ratingReviews = response.data.data.content
          this.totalPages = response.data.data.totalPages
        })
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
    },
    getRole () {
      this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
        .then(response => {
            let originalRole = response.data.role
            if (originalRole === 'TRAINER' && localStorage.roleSwitch === 'TRAINEE') {
                this.role = localStorage.roleSwitch
            } else {
                this.role = response.data.role
            }
            this.myRole = this.role.toLowerCase().trim()
        })
        .catch(error => { console.log(error) })
    }
  },
  mounted () {
    this.getRole()
    this.getContentPage(0)
    this.getModuleRating()
    this.getModuleTotalUserRating()
  },
  filters: {
    ratingPrecision: function (value) {
      return value.toFixed(1)
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
