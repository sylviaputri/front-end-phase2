<template>
    <div>
      <!-- tab -->
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
      <!-- content -->
      <div class="fadedWhiteBackground mt-3">
        <div v-if="classesHistory === null" class="text-center py-3">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="classesHistory.length === 0 || classesHistory === ''" class="text-center py-3">
          Tidak ada riwayat
        </div>
        <b-card-group v-else id="cardGroupClassHistory" class="my-3 px-3 py-3">
          <b-card class="classHistory my-1" v-for="classHistory in classesHistory" :key="classHistory.id">
            <b-row>
              <b-col sm="9" class="text-justify">
                <b-card-text class="classHistoryName my-0">{{ classHistory[0].classroom.name }}</b-card-text>
                <b-card-text class="classHistoryModuleName font-weight-bold my-0">{{ classHistory[0].classroom.module.name }} V.{{ classHistory[0].classroom.module.version }}</b-card-text>
                <b-card-text class="classHistoryTrainername my-0">Pelatih : {{ classHistory[0].classroom.trainer.fullname }}</b-card-text>
                <b-card-text class="classHistoryModuleDesc">{{ classHistory[0].classroom.module.description | cutDescription }}</b-card-text>
              </b-col>
              <b-col sm="3" class="text-center" v-if="classHistory[0].classroom.module.hasExam">
                <b-card-text class="my-0">Nilai</b-card-text>
                <b-card-text v-if="classHistory[0].score != null || classHistory[0].score != ''" class="classHistoryGrade orangeColor font-weight-bold my-0">{{ classHistory[0].score | scorePrecision }} / 10</b-card-text>
                <b-card-text v-else class="classHistoryGrade orangeColor font-weight-bold my-0">- / 10</b-card-text>
                <b-button v-b-modal="'modal-send-review-module-' + classHistory[0].id" variant="outline-primary" class="btnClassHistoryRatingReview py-1 mt-2">beri nilai modul</b-button>
                <b-button v-b-modal="'modal-send-review-trainer-' + classHistory[0].id" variant="outline-primary" class="btnClassHistoryRatingReview py-1 mt-2">beri nilai pelatih</b-button>
              </b-col>
              <b-col sm="3" class="text-center" v-else>
                <b-card-text class="mb-0 mt-3">Tidak ada ujian</b-card-text>
                <b-button v-b-modal="'modal-send-review-module-' + classHistory[0].id" variant="outline-primary" class="btnClassHistoryRatingReview py-1 mt-2">beri nilai modul</b-button>
                <b-button v-b-modal="'modal-send-review-trainer-' + classHistory[0].id" variant="outline-primary" class="btnClassHistoryRatingReview py-1 mt-2">beri nilai pelatih</b-button>
              </b-col>
            </b-row>
            <b-modal :id="'modal-send-review-module-' + classHistory[0].id" centered :title="classHistory[0].classroom.module.name">
              <b-row>
                <b-col sm="3">
                  Rating
                </b-col>
                <b-col sm="9">
                  <star-rating @rating-selected ="setRatingModule" v-bind:increment="0.5" v-bind:max-rating="5"
                    inactive-color="grey" active-color="#D43300" v-bind:star-size="25" border-color="#D43300">
                </star-rating>
                </b-col>
              </b-row>
              <b-row class="my-4">
                <b-col sm="3">
                  Review
                </b-col>
                <b-col sm="9">
                  <b-form-textarea v-model="reviewModule" rows="4" max-rows="6"></b-form-textarea>
                </b-col>
              </b-row>
              <template slot="modal-footer" slot-scope="{ cancel, ok }">
                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">
                  Batal
                </b-button>
                <b-button size="sm" variant="primary" @click="ok(); sendRatingReviewModule(classHistory[0].classroom.module.id, ratingModule, reviewModule);" style="width:100px">
                  Simpan
                </b-button>
              </template>
            </b-modal>
            <b-modal :id="'modal-send-review-trainer-' + classHistory[0].id" centered :title="classHistory[0].classroom.trainer.fullname">
              <b-row>
                <b-col sm="3">
                  Rating
                </b-col>
                <b-col sm="9">
                  <star-rating @rating-selected ="setRatingTrainer" v-bind:increment="0.5" v-bind:max-rating="5"
                    inactive-color="grey" active-color="#D43300" v-bind:star-size="25" border-color="#D43300">
                </star-rating>
                </b-col>
              </b-row>
              <b-row class="my-4">
                <b-col sm="3">
                  Review
                </b-col>
                <b-col sm="9">
                  <b-form-textarea v-model="reviewTrainer" rows="4" max-rows="6"></b-form-textarea>
                </b-col>
              </b-row>
              <template slot="modal-footer" slot-scope="{ cancel, ok }">
                <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">
                  Batal
                </b-button>
                <b-button size="sm" variant="primary" @click="ok(); sendRatingReviewTrainer(classHistory[0].classroom.trainer.id, ratingTrainer, reviewTrainer)" style="width:100px">
                  Simpan
                </b-button>
              </template>
            </b-modal>
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
      ratingModule: 0,
      ratingTrainer: 0,
      reviewModule: '',
      reviewTrainer: '',
      classesHistory: null
    }
  },
  filters: {
    scorePrecision (value) {
      if (!value) return ''
      return value.toFixed(2)
    },
    cutDescription (value) {
      if (!value) return ''
      else if (value.length >= 180) {
        return value.slice(0, 180) + ' ...'
      } else {
        return value
      }
    }
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
      if (this.activeTab === 1) {
        this.getHistoryPassed()
      } else {
        this.getHistoryNotPassed()
      }
    },
    blankRatingReviewInput () {
      this.ratingModule = 0
      this.ratingTrainer = 0
      this.reviewModule = ''
      this.reviewTrainer = ''
    },
    setRatingModule (rating) {
      this.ratingModule = rating
    },
    setRatingTrainer (rating) {
      this.ratingTrainer = rating
    },
    sendRatingReviewModule (moduleId, ratingModule, reviewModule) {
      this.$axios.post('http://komatikugm.web.id:13370/modules/_ratings/' + moduleId, {
          comment: reviewModule,
          value: ratingModule
      }, { withCredentials: true })
      .then(response => {
        (console.log(response))
        this.blankRatingReviewInput()
      })
      .catch(error => console.log(error))
    },
    sendRatingReviewTrainer (trainerId, ratingTrainer, reviewTrainer) {
      this.$axios.post('http://komatikugm.web.id:13370/trainers/_ratings/2', {
          value: ratingTrainer,
          comment: reviewTrainer
      }, { withCredentials: true })
      .then(response => {
        (console.log(response))
        this.blankRatingReviewInput()
      })
      .catch(error => console.log(error.response))
    },
    getHistoryPassed () {
      this.$axios.get('http://komatikugm.web.id:13370/classrooms/_history?page=0&passed=true&size=15', { withCredentials: true })
      .then(response => (this.classesHistory = response.data.data.content))
      .catch(error => console.log(error))
    },
    getHistoryNotPassed () {
      this.$axios.get('http://komatikugm.web.id:13370/classrooms/_history?page=0&passed=false&size=15', { withCredentials: true })
      .then(response => (this.classesHistory = response.data.data.content))
      .catch(error => console.log(error))
    }
  },
  mounted () {
    this.getHistoryPassed()
  }
}
</script>

<style scoped>
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
