<template>
    <div v-if="classroom == null" class="text-center gradeListPage px-5 pt-3">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div class="gradeListPage px-5 pt-3" v-else>
        <h4 class="classGradeListName">Kelas PEL002</h4>
        <h4 class="classGradeListModuleName font-weight-bold">{{ classroom.classroom.module.name }} V.{{ classroom.classroom.module.version }}</h4>
        <h5 class="classGradeListCategory">{{ classroom.classroom.module.moduleCategory.name }}</h5>
        <b-row class="mt-5" style="width:30%">
            <b-col sm="7" class="font-weight-bold pr-0 pt-1">
                Nilai minimum untuk lulus
            </b-col>
            <b-col sm="3" class="pl-4 pr-0">
                <b-form-input v-model="classroom.classroom.minScore" type="text"></b-form-input>
            </b-col>
            <b-col sm="2" class="font-weight-bold pl-2 pt-1">
                /10
            </b-col>
        </b-row>
        <b-table class="mt-4 fadedWhiteBackground" responsive striped hover :items="results" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="score" slot-scope="data">
            <b-form-input v-model="data.item.score" type="text" style="width:100px"></b-form-input>
          </template>
        </b-table>
        <div class="col-12 d-flex py-3 mt-5">
            <div class="ml-auto">
              <router-link v-if="role === 'ADMIN'" to="/admin/history-all-classes">
                <b-button variant="secondary" class="btnCancelSaveGradeList mr-2">Batal</b-button>
              </router-link>
              <router-link v-else to="/trainer/my-account/my-train-history">
                <b-button variant="secondary" class="btnCancelSaveGradeList mr-2">Batal</b-button>
              </router-link>
                <b-button @click="sendTraineesGrade(classroom.classroom.id)" variant="primary" class="btnSaveGradeList">Simpan</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      classroom: null,
      results: null,
      fields: [
        {
          key: 'no',
          label: 'No.',
          sortable: false
        },
        {
          key: 'user.fullname',
          label: 'Nama Peserta',
          sortable: false
        },
        {
          key: 'user.email',
          label: 'Email',
          sortable: false
        },
        {
          key: 'score',
          label: 'Nilai',
          sortable: false
        }
      ]
    }
  },
  mounted () {
    this.getClassroomDetail()
    this.getClassroomResult()
  },
  methods: {
    getClassroomDetail () {
      this.$axios
      .get('http://komatikugm.web.id:13370/classrooms/' + this.$route.params.classId, {withCredentials: true})
      .then(response => (this.classroom = response.data.data))
      .catch(error => { console.log(error.response) })
    },
    getClassroomResult () {
      this.$axios
      .get('http://komatikugm.web.id:13370/_trainer/classrooms/' + this.$route.params.classId + '/_results', {withCredentials: true})
      .then(response => (this.results = response.data.data))
      .catch(error => { console.log(error.response) })
    },
    sendTraineesGrade (classId) {
      var newResult = []
      var valid = true
      for (var i = 0; i < this.results.length; i++) {
        if (this.results[i].score < 0 || this.results[i].score > 10 || isNaN(parseFloat(this.results[i].score)) || !isFinite(this.results[i].score ||
            this.classroom.classroom.minScore < 0 || this.classroom.classroom.minScore > 10 || isNaN(parseFloat(this.classroom.classroom.minScore))) || !isFinite(this.classroom.classroom.minScore)) {
          valid = false
          break
        }
        var data = {
          id: this.results[i].user.id,
          score: this.results[i].score,
          status: this.results[i].score >= this.classroom.minValue ? 'pass' : 'notPass'
        }
        newResult.push(data)
      }
      if (valid) {
        this.$axios.put('http://komatikugm.web.id:13370/_trainer/classrooms/_setscore', {
              classroomId: classId,
              classroomResultList: newResult,
              minScore: this.classroom.classroom.minScore
          }, { withCredentials: true })
          .then(response => {
            console.log(response)
            if (this.role === 'TRAINER') {
              window.location.href = '/trainer/my-account/my-train-history'
            } else if (this.role === 'ADMIN') {
              window.location.href = '/admin/history-all-classes'
            }
          })
          .catch(error => console.log(error))
      } else {
        alert('Input hanya dapat diisi angka 0 sampai 10')
      }
    }
  },
  created () {
    this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
      .then(response => {
        this.role = response.data.role
        let originalRole = response.data.role
        if (originalRole === 'TRAINER' && localStorage.role === 'TRAINEE') {
            this.role = localStorage.role
        } else {
            this.role = response.data.role
        }
        if (this.role === 'TRAINEE') {
            this.getMyId()
        }
      })
        .catch(error => { console.log(error) })
  }
}
</script>

<style>
div.gradeListPage{
  background:wheat;
  background: url('./../assets/background_images/grade.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  margin-top: 55px !important;
  width: 100%;
  min-height: 100%
}
.btnCancelSaveGradeList, .btnSaveGradeList{
    width: 120px;
    padding: 2px;
}
</style>
