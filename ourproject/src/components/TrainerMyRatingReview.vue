<template>
    <div>
        <b-row class="fadedWhiteBackground p-0 ml-1" style="width:100%">
            <b-col class="text-center font-weight-bold" style="color: rgb(10, 135, 192) !important">
                PERINGKAT & ULASAN TENTANG SAYA
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px">
            </b-col>
        </b-row>
        <div v-if="ratingReviews == '' || ratingReviews == null" class="fadedWhiteBackground mb-3">
            <div v-if="ratingReviews == ''" class="text-center py-5">Belum ada user yang memberikan rating</div>
            <div v-else-if="ratingReviews == null" class="text-center py-3">
                <b-spinner label="Spinning"></b-spinner>
            </div>
        </div>
        <div v-else class="fadedWhiteBackground mb-3">
            <div class="m-auto text-center">
                <h3 class="orangeColor font-weight-bold mt-3 pt-2">{{ ratingSummary | ratingPrecision}} / 5.0</h3>
                <p class="mt-2 grayColor" style="font-size:17px">Total {{ ratingReviews.length }} orang</p>
            </div>
            <b-card-group deck class="my-3" style="width:100%">
                <b-card class="reviewTrainer" v-for="ratingReview in ratingReviews" :key="ratingReview.id">
                    <b-card-text class="reviewTraineeName mb-0 ml-4 font-weight-bold">{{ ratingReview.user.fullname }}</b-card-text>
                    <b-card-text class="reviewTrainerRating orangeColor ml-4 font-weight-bold mb-1">{{ ratingReview.value | ratingPrecision }} / 5.0</b-card-text>
                    <b-card-text class="reviewTrainerDesc ml-4">{{ ratingReview.comment }}</b-card-text>
                </b-card>
            </b-card-group>
            <div class="overflow-auto">
                <b-pagination-nav :link-gen="linkGen" :number-of-pages="1" use-router align="right" size="lg"></b-pagination-nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        myId: null,
        ratingReviews: null,
        ratingSummary: 0
    }
  },
  filters: {
    ratingPrecision: function (value) {
      return value.toFixed(1)
    }
  },
  methods: {
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    calcRatingSummary () {
        var total = 0
        for (var i = 0; i < this.ratingReviews.length; i++) {
            total += this.ratingReviews[i].value
        }
        return total / this.ratingReviews.length
    }
  },
  mounted () {
      this.$axios
      .get('http://komatikugm.web.id:13370/users/_profile', {withCredentials: true})
      .then(response => {
          this.myId = response.data.data.id
          this.$axios
            .get('http://komatikugm.web.id:13370/trainers/_ratings/' + this.myId + '?page=0&size=15', {withCredentials: true})
            .then(response => {
                this.ratingReviews = response.data.data.content
                this.ratingSummary = this.calcRatingSummary()
            })
            .catch(error => { console.log(error.response) })
        })
      .catch(error => { console.log(error.response) })
  }
}
</script>

<style>
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
