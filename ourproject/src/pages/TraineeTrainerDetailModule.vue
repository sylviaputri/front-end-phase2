<template>
    <div v-if="module == null" class="text-center py-5">
        <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-else>
        <div id="detailModule1" class="whiteColor">
            <div id="detailModule1Left" class="float-left text-center py-5">
                <div style="height:30%; margin-top:80px">
                    <h2>{{ module.module.name }} V.{{ module.module.version }}</h2>
                </div>
                <h5 class="mt-5">Peringkat & Ulasan</h5>
                <div class="row m-auto fitContent pt-2">
                    <h2 class="mr-4">{{ module.moduleRating | ratingPrecision }} / 5.0</h2>
                    <router-link :to="{path: '/' + myRole + '/detail-module/' + module.module.id + '/rating-review-module'}">
                        <b-button id="btnToRatingReview" variant="primary" class="border border-2">Lihat detail</b-button>
                    </router-link>
                </div>
            </div>
            <div id="detailModule1Right" class="float-left text-justify pt-5 pl-3 pr-5">
                <h5 style="margin-top:80px" v-html="module.module.description"></h5>
            </div>
        </div>
        <div id="detailModule2" class="whiteColor">
            <diV style="margin-left:15%;padding-top:120px">
                <h3 class="mb-5">{{ module.module.moduleCategory.name }}</h3>
                <h3 class="mb-5">{{ module.module.timePerSession }} menit / sesi</h3>
                <h3 v-if="module.hasExam">Dengan ujian</h3>
                <h3 v-else>Tanpa ujian</h3>
            </diV>
        </div>
        <div id="detailModule3">
            <div class="row m-auto pt-2">
                <h2 id="detailModule3Material">DAFTAR MATERI</h2>
                <div id="detailModule3MaterialContent" class="text-right pr-3">
                    <h5 v-html="module.module.materialDescription"></h5>
                </div>
            </div>
        </div>
        <div id="detailModule4" class="p-5">
            <h3 class="float-left mb-5">DAFTAR KELAS</h3>
            <b-button @click="prepareData(module.module.totalSession)" v-if="role === 'TRAINER'" variant="primary" id="btnCreateNewClass" class="border border-2 float-right" v-b-modal="'modal-create-class'">BUAT KELAS BARU</b-button>
            <class-list :classRooms=module.module.classrooms class="mt-5" style="clear:both"></class-list>
            <!-- Pop up create class -->
            <b-modal id="modal-create-class" class="modal-detail-class" centered>
                <p class="font-weight-bold pl-5 mb-5" style="font-size:18px">{{ module.module.name }} V.{{ module.module.version }}<font-awesome-icon v-if="module.hasExam" icon="file-signature" size="sm"/></p>
                <b-row class="px-5 mb-3 font-weight-bold pl-5 mb-3">
                <b-col sm="3">Nama Kelas</b-col>
                <b-col><b-form-input v-model="className" type="text"></b-form-input></b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                    <b-col sm="7">Jumlah Minimal Peserta</b-col>
                    <b-col sm="3"><b-form-input type="number" v-model="minMember" min="1"></b-form-input></b-col>
                    <b-col sm="2">orang</b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                    <b-col sm="7">Jumlah Maksimal Peserta</b-col>
                    <b-col sm="3"><b-form-input type="number" v-model="maxMember" min="1"></b-form-input></b-col>
                    <b-col sm="2">orang</b-col>
                </b-row>
                <p class="font-weight-bold pl-5 mb-1">{{ module.module.timePerSession }} Menit / Sesi</p>
                <b-row class="pl-5 pb-2 pt-3">
                    <b-col sm="10"></b-col>
                    <b-col sm="2" v-if="module.hasExam" class="text-center">Dengan Ujian</b-col>
                </b-row>
                <b-row class="pl-5" v-for="(item, index) in module.module.totalSession" :key="index">
                    <b-col sm="2" class="mt-2">Sesi {{ index + 1 }}</b-col>
                    <b-col sm="3">
                        <date-picker v-model="arrDate[index]" :config="{format: 'DD/MM/YYYY'}"></date-picker>
                    </b-col>
                    <b-col sm="1" class="mt-2">Pukul</b-col>
                    <b-col sm="2">
                        <date-picker v-model="arrTime[index]" :config="{format: 'HH:mm'}"></date-picker>
                    </b-col>
                    <b-col sm="2" class="mt-2">WIB</b-col>
                    <b-col sm="2" v-if="module.hasExam" class="text-center">
                        <b-form-checkbox @change="changeCheck(index)" :checked="arrExam[index]==true"></b-form-checkbox>
                    </b-col>
                </b-row>
                <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar materi yang harus diajarkan</p>
                <p class="pl-5" v-html="module.module.materialDescription"></p>
                <!-- pop up footer -->
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                    <b-button size="sm" variant="primary" @click="ok(); createClass()" style="width:100px">Buka kelas</b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
import ClassList from './../components/Classlist.vue'
export default {
  data () {
    return {
      role: null,
      module: null,
      minMember: 10,
      maxMember: 50,
      className: '',
      myRole: '',
      arrDate: [],
      arrTime: [],
      arrClass: [],
      arrExam: []
    }
  },
  components: {
    'class-list': ClassList
  },
  created () {
    window.scrollTo(0, 0)
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
  },
  filters: {
    ratingPrecision: function (value) {
      return value.toFixed(1)
    }
  },
  methods: {
      getModuleDetail () {
        this.$axios
        .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
        .then(response => (this.module = response.data.data))
        .catch(error => { console.log(error.response) })
      },
      prepareData (sessionLength) {
        this.arrDate.length = sessionLength
        this.arrTime.length = sessionLength
        this.arrClass.length = sessionLength
        this.arrExam.length = sessionLength
        for (var i = 0; i < sessionLength; i++) {
            this.arrExam[i] = false
        }
      },
      changeCheck (index) {
        if (this.arrExam[index] === true) {
            this.arrExam[index] = false
        } else {
            this.arrExam[index] = true
        }
      },
      createClass () {
        for (var index = 0; index < this.arrDate.length; index++) {
          this.arrDate[index] = this.arrDate[index].match(/(\d{2})\/(\d{2})\/(\d{4})/)
          this.arrTime[index] = this.arrTime[index].match(/(\d{2}):(\d{2})/)
          this.arrDate[index] = new Date(this.arrDate[index][3], this.arrDate[index][2] - 1, this.arrDate[index][1], this.arrTime[index][1], this.arrTime[index][2]).getTime()
          this.arrClass[index] = {
            description: 'Sesi ' + (index + 1),
            exam: this.arrExam[index],
            startTime: this.arrDate[index]
          }
        }
        this.$axios.post('http://komatikugm.web.id:13370/_trainer/classrooms', {
          classroomSessions: this.arrClass,
          maxMember: this.maxMember,
          minMember: this.minMember,
          moduleId: this.module.module.id,
          name: this.className
        }, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.getModuleDetail()
          })
        .catch(error => (console.log(error.response)))
      }
  },
  mounted () {
    this.getModuleDetail()
  }
}
</script>

<style>
div#detailModule1 {
    height: 500px;
    background: url('./../assets/background_images/module_1.jpg') no-repeat;
    background-size: cover;
    margin-top: -10px;
}
div#detailModule1 #detailModule1Left, div#detailModule1 #detailModule1Right, div#detailModule3 #detailModule3Left, div#detailModule3 #detailModule3Right {
    width: 50%;
    height: 100%;
}
button#btnToRatingReview{
    height: 40px;
}
div#detailModule2 {
    height: 500px;
    background: url('./../assets/background_images/module_2.jpg') no-repeat;
    background-size: cover;
}
div#detailModule3 {
    min-height: 200px;
    max-height: fit-content;
    background: url('./../assets/background_images/module_3.jpg') no-repeat;
    background-size: cover;
}
div#detailModule3 #detailModule3Material {
    margin-top:5%;
    padding-left:15%;
    width:50%
}
div#detailModule3 #detailModule3MaterialContent{
    width:50%;
    margin-top:5%;
}
div#detailModule4{
    min-height: 200px;
    max-height: fit-content;
    background: url('./../assets/background_images/module_4.jpg') no-repeat;
    background-size: cover;
}
.modal-dialog{
    max-width: 60%;
}
.modal-header{
    display: none
}
</style>
