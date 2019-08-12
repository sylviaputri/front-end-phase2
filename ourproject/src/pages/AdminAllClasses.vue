<template>
  <div id="adminAllClasses" class="px-5">
      <h2 class="font-weight-bold mb-4">Kelas</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="4">
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" v-model="searchKeyword" placeholder="Ketik kelas yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="1"></b-col>
                <b-col cols="2">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="selectedExam"  @change="searchClass()" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">Ujian dan Tanpa Ujian</option>
                    <option value="false">Tanpa Ujian</option>
                    <option value="true">Ujian</option>
                  </b-form-select>
                </b-col>
                <b-col>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <div v-if="allClasses.content == null" class="text-center my-3 py-2">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-else-if="allClasses.content == ''" class="text-center my-3 py-2"><h5><b>Tidak ada kelas yang dicari</b></h5></div>
      <class-table v-else :classes=allClasses></class-table>
  </div>
</template>

<script>
import ClassTable from './../components/ClassTable.vue'
export default {
  data () {
    return {
      allClasses: '',
      searchKeyword: '',
      selectedExam: 'all'
    }
  },
  components: {
    'class-table': ClassTable
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    searchClass () {
      let exam = 'hasExam=' + this.selectedExam + '&'
      if (this.selectedExam === 'all') {
        exam = ''
      }
      let keyName = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        keyName = ''
      }
      this.$axios
        .get('http://komatikugm.web.id:13370/classrooms?' + exam + keyName + '&page=0&popular=false&size=5', {withCredentials: true})
        .then(response => (this.allClasses = response.data.data))
        .catch(error => { console.log(error.response) })
    }
  },
  watch: {
    searchKeyword () {
      this.searchClass()
    }
  },
  created () {
    this.setLayout('admin-layout')
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/classrooms?page=0&popular=false&size=5', {withCredentials: true})
      .then(response => (this.allClasses = response.data.data))
      .catch(error => { console.log(error.response) })
  }
}
</script>

<style>
html{
  background: url('./../assets/background_images/apps_page.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
</style>
