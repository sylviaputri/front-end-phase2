<template>
    <div class="gradeListPage px-5 pt-3">
        <h4 class="classGradeListName">Kelas PEL002</h4>
        <h4 class="classGradeListModuleName font-weight-bold">Data Visualization with Python V.4</h4>
        <h5 class="classGradeListCategory">Data Visualization</h5>
        <h6 class="classGradeListCategory purpleColor font-weight-bold">Berakhir pada : 28 Agustus 2019</h6>
        <b-row class="mt-5" style="width:30%">
            <b-col sm="7" class="font-weight-bold pr-0 pt-1">
                Nilai minimum untuk lulus
            </b-col>
            <b-col sm="3" class="pl-4 pr-0">
                <b-form-input type="text"></b-form-input>
            </b-col>
            <b-col sm="2" class="font-weight-bold pl-2 pt-1">
                /10
            </b-col>
        </b-row>
        <b-table class="mt-4" responsive striped hover :items="items" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="trainee_grade">
            <b-form-input type="text" style="width:100px"></b-form-input>
          </template>
        </b-table>
        <div class="col-12 d-flex py-3 mt-3">
            <div class="ml-auto">
                <b-button variant="secondary" class="btnCancelSaveGradeList mr-2">Batal</b-button>
                <b-button variant="primary" class="btnSaveGradeList">Simpan</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        {
          key: 'no',
          label: 'No.',
          sortable: false
        },
        {
          key: 'trainee_name',
          label: 'Nama Peserta',
          sortable: false
        },
        {
          key: 'trainee_email',
          label: 'Email',
          sortable: false
        },
        {
          key: 'trainee_grade',
          label: 'Nilai',
          sortable: false
        }
      ],
      items: [
        {id: '001', trainee_name: 'Dickerson', trainee_email: 'Macdonald'},
        {id: '001', trainee_name: 'Larsen', trainee_email: 'Shaw'},
        {id: '002', trainee_name: 'Geneva', trainee_email: 'Wilson'},
        {id: '003', trainee_name: 'Jami', trainee_email: 'Carney'}
      ]
    }
  }
}
</script>

<style>
div.gradeListPage{
  background:wheat;
  /* background: url('./../assets/background_images/profile.jpg') no-repeat center center fixed; */
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
