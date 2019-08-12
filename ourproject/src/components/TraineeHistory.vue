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
          <div v-if="classesHistory === '' || classesHistory.length === 0" class="text-center py-3">
            Tidak ada riwayat
          </div>
          <div v-else-if="classesHistory === null" class="text-center py-3">
            <b-spinner label="Spinning"></b-spinner>
          </div>
          <b-card-group v-else id="cardGroupClassHistory" class="my-3 px-3 py-3">
            <b-card class="classHistory my-1" v-for="classHistory in classesHistory" :key="classHistory[0].id">
              <b-row>
                <b-col sm="9" class="text-justify">
                  <b-card-text class="classHistoryName my-0">{{ classHistory.classroom.name }}</b-card-text>
                  <b-card-text class="classHistoryModuleName font-weight-bold my-0">{{ classHistory.classroom.module.name }} V.{{ classHistory.classroom.module.version }}</b-card-text>
                  <b-card-text class="classHistoryModuleDesc">{{ classHistory.classroom.module.description }}</b-card-text>
                </b-col>
                <b-col sm="3" class="text-center" v-if="classHistory.classroom.module.hasExam">
                  <b-card-text class="my-0">Nilai</b-card-text>
                  <b-card-text class="classHistoryGrade orangeColor font-weight-bold my-0">{{ classHistory.score | scorePrecision }} / 10</b-card-text>
                  <b-button v-b-modal="'modal-send-review-' + classHistory.id" variant="outline-dark" class="btnClassHistoryRatingReview py-1 mt-3">beri rating & review</b-button>
                </b-col>
                <b-col sm="3" class="text-center" v-else>
                  <br/>
                  <br/>
                  <b-button v-b-modal="'modal-send-review-' + classHistory.id" variant="outline-dark" class="btnClassHistoryRatingReview py-1 mt-3">beri rating & review</b-button>
                </b-col>
              </b-row>
              <!-- Pop up for send review and rating -->
              <b-modal :id="'modal-send-review-' + classHistory.id" centered title="Beri Rating & Review">
                <!-- rating review fot module -->
                <p id="sendReviewModuleName" class="font-weight-bold">{{ classHistory.classroom.module.name }} V.{{ classHistory.classroom.module.version }}</p>
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
                <!-- rating review fot trainer -->
                <p id="sendReviewModuleName" class="font-weight-bold">Pelatih : {{ classHistory.classroom.trainer.fullname }}</p>
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
                <!-- pop up footer -->
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                  <b-button size="sm" variant="dark" @click="cancel(); blankRatingReviewInput()" style="width:100px">
                    Batal
                  </b-button>
                  <b-button size="sm" variant="primary" @click="ok(); sendRatingReviewModule(classHistory.classroom.module.id , ratingModule, reviewModule); sendRatingReviewTrainer(classHistory.classroom.trainer.id, ratingTrainer, reviewTrainer)" style="width:100px">
                    Simpan
                  </b-button>
                </template>
              </b-modal>
            </b-card>
            <!-- dummy data -->
            <!-- <b-card class="classHistory my-1">
              <b-row>
                <b-col sm="9" class="text-justify">
                  <b-card-text class="classHistoryName my-0">Kelas Visualisasi Data 1</b-card-text>
                  <b-card-text class="classHistoryModuleName font-weight-bold my-0">Data Visualization with Python V.1</b-card-text>
                  <b-card-text class="classHistoryModuleDesc">Data Visualization allows you to customize, automate and build beautiful and granular depictions of your data. Upgrade your career by learning a bit of Python to build powerful visualizations that harness your data and powers your career. </b-card-text>
                </b-col>
                <b-col sm="3" class="text-center">
                  <b-card-text class="my-0">Nilai</b-card-text>
                  <b-card-text class="classHistoryGrade orangeColor font-weight-bold my-0">9.0 / 10</b-card-text>
                  <b-button v-b-modal="'modal-send-review-1'" variant="outline-dark" class="btnClassHistoryRatingReview py-1 mt-3">beri rating & review</b-button>
                </b-col>
              </b-row>
            </b-card>
            <b-modal id="modal-send-review-1" centered title="Beri Rating & Review">
              <p id="sendReviewModuleName" class="font-weight-bold">Data Visualization with Python V.1</p>
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
              <p id="sendReviewModuleName" class="font-weight-bold">Pelatih : Trainer Mantaap</p>
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
                <b-button size="sm" variant="primary" @click="ok(); sendRatingReviewModule(4, ratingModule, reviewModule); sendRatingReviewTrainer(2, ratingTrainer, reviewTrainer)" style="width:100px">
                  Simpan
                </b-button>
              </template>
            </b-modal>
            <b-card class="classHistory my-1">
              <b-row>
                <b-col sm="9" class="text-justify">
                  <b-card-text class="classHistoryName my-0">Kelas Unsupervised Learning 1</b-card-text>
                  <b-card-text class="classHistoryModuleName font-weight-bold my-0">Machine Learning Dasar V.1</b-card-text>
                  <b-card-text class="classHistoryModuleDesc">Machine learning, bidang ilmu komputer yang memberikan kemampuan sistem komputer untuk belajar dari data, adalah salah satu topik terpanas dalam ilmu komputer.</b-card-text>
                </b-col>
                <b-col sm="3" class="text-center">
                  <br/>
                  <br/>
                  <b-button v-b-modal="'modal-send-review-2'" variant="outline-dark" class="btnClassHistoryRatingReview py-1 mt-3">beri rating & review</b-button>
                </b-col>
              </b-row>
            </b-card>
            <b-modal id="modal-send-review-2" centered title="Beri Rating & Review">
              <p id="sendReviewModuleName" class="font-weight-bold">Machine Learning Dasar V.1</p>
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
              <p id="sendReviewModuleName" class="font-weight-bold">Pelatih : Trainer Mantaap</p>
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
                <b-button size="sm" variant="primary" @click="ok(); sendRatingReviewModule(3, ratingModule, reviewModule); sendRatingReviewTrainer(2, ratingTrainer, reviewTrainer)" style="width:100px">
                  Simpan
                </b-button>
              </template>
            </b-modal> -->
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
      return value.toFixed(1)
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
      this.$axios.post('http://komatikugm.web.id:13370/trainers/_ratings/' + trainerId, {
          comment: ratingTrainer,
          value: reviewTrainer
      }, { withCredentials: true })
      .then(response => {
        (console.log(response))
        this.blankRatingReviewInput()
      })
      .catch(error => console.log(error))
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
