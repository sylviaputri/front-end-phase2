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
                  <b-form-select v-model="selectedExam"  @change="getContentPage(0)" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
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
      <div v-if="allClasses == null" class="text-center my-3 py-2">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-else-if="allClasses == ''" class="text-center my-3 py-2"><h5><b>Tidak ada kelas yang dicari</b></h5></div>
      <class-table v-else :classes=allClasses :page=page></class-table>
      <pagination v-if="(allClasses != null || allClasses != '') && totalPages > 1" :totalPages="totalPages" :page.sync="page" class="paginationWhiteBackground"></pagination>
  </div>
</template>

<script>
import ClassTable from './../components/ClassTable.vue'
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      allClasses: null,
      searchKeyword: '',
      selectedExam: 'all',
      page: 0,
      totalPages: 0
    }
  },
  components: {
    'class-table': ClassTable,
    'pagination': Pagination
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    getContentPage (page) {
      this.page = page
      let exam = 'hasExam=' + this.selectedExam + '&'
      if (this.selectedExam === 'all') {
        exam = ''
      }
      let keyName = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        keyName = ''
      }
      this.$axios
        .get('http://komatikugm.web.id:13370/classrooms?' + exam + keyName + '&page=' + this.page + '&popular=false&size=15', {withCredentials: true})
        .then(response => {
          this.allClasses = response.data.data.content
          this.totalPages = response.data.data.totalPages
          })
        .catch(error => {
          console.log(error.response)
          var errorMessage = error.response.data.message
          if (Array.isArray(errorMessage)) {
            var errorMessageArray = ''
            for (var i = 0; i < errorMessage.length; i++) {
              errorMessageArray += errorMessage[i] + ' '
            }
            alert(errorMessageArray)
          } else alert(errorMessage)
        })
    }
  },
  watch: {
    searchKeyword () {
      this.getContentPage(0)
    }
  },
  created () {
    this.setLayout('admin-layout')
  },
  mounted () {
    this.getContentPage(0)
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
