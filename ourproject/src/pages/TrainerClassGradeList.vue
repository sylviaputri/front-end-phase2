<template>
    <div class="gradeListPage px-5 pt-3">
        <h4 class="classGradeListName">Kelas PEL002</h4>
        <h4 class="classGradeListModuleName font-weight-bold">{{ classroom.classroom.module.name }} V.{{ classroom.classroom.module.version }}</h4>
        <h5 class="classGradeListCategory">{{ classroom.classroom.module.moduleCategory.name }}</h5>
        <b-row class="mt-5" style="width:30%">
            <b-col sm="7" class="font-weight-bold pr-0 pt-1">
                Nilai minimum untuk lulus
            </b-col>
            <b-col sm="3" class="pl-4 pr-0">
                <b-form-input v-model="classroom.classroom.minValue" type="text"></b-form-input>
            </b-col>
            <b-col sm="2" class="font-weight-bold pl-2 pt-1">
                /10
            </b-col>
        </b-row>
        <b-table class="mt-4" responsive striped hover :items="classroom.classroomResult" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="value">
            <b-form-input type="text" style="width:100px"></b-form-input>
          </template>
        </b-table>
        <div class="col-12 d-flex py-3 mt-3">
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
      fields: [
        {
          key: 'no',
          label: 'No.',
          sortable: false
        },
        {
          key: 'user.name',
          label: 'Nama Peserta',
          sortable: false
        },
        {
          key: 'user.email',
          label: 'Email',
          sortable: false
        },
        {
          key: 'value',
          label: 'Nilai',
          sortable: false
        }
      ]
      // items: [
      //   {id: '001', trainee_name: 'Dickerson', trainee_email: 'Macdonald'},
      //   {id: '001', trainee_name: 'Larsen', trainee_email: 'Shaw'},
      //   {id: '002', trainee_name: 'Geneva', trainee_email: 'Wilson'},
      //   {id: '003', trainee_name: 'Jami', trainee_email: 'Carney'}
      // ]
    }
  },
  mounted () {
    this.$axios
    .get('http://komatikugm.web.id:13370/classrooms/' + this.$route.params.classId, {withCredentials: true})
    .then(response => (this.classroom = response.data.data))
    .catch(error => { console.log(error.response) })
  },
  methods: {
    sendTraineesGrade (classId) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/classrooms/result/' + classId, {
            moduleCategory: {
              minValue: this.classroom.classroom.minValue,
              classroomResult: this.classroom.classroomResult
            }
        }, { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.log(error))
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
