<template>
  <div id="adminAllTrainersTrainees" class="px-5">
      <h2 class="font-weight-bold mb-4">Daftar Seluruh Pelatih dan Peserta</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="5">
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input type="text" v-model="searchKeyword" placeholder="Ketik nama yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col cols="2">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="selectedRole" @change="getContentPage(0)" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">Semua</option>
                    <option value="TRAINER">Pelatih</option>
                    <option value="TRAINEE">Peserta</option>
                  </b-form-select>
                </b-col>
                <b-col cols="2">
                  <font-awesome-icon icon="sort-alpha-down" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selectedSort" @change="getContentPage(0)" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="role">Status</option>
                    <option value="fullname">Nama</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="2">
              <b-row>
                <b-col>
                  <b-button class="position-absolute btn-info" style="top:4px; width:90%;" v-b-modal="'modal-add-user'">
                    <font-awesome-icon icon="plus"/>
                    Tambah Pengguna
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <div v-if="allUsers == null" class="text-center my-3 py-2">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div v-else-if="allUsers.content == ''" class="text-center my-3 py-2"><h5><b>Tidak ada pengguna yang dicari</b></h5></div>
      <user-table v-else :users=allUsers :page=page></user-table>
      <pagination v-if="(allUsers != null || allUsers != '') && totalPages > 1" :totalPages="totalPages" :page.sync="page" class="paginationWhiteBackground"></pagination>
      <b-modal id="modal-add-user" centered>
          <h5 class="pl-5 text-center mb-3"><b>Tambah Pengguna</b></h5>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Nama</b-col>
              <b-col sm="8"><b-form-input type="text" v-model="iName"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Status</b-col>
              <b-col sm="8">
                <b-form-select v-model="iRole">
                  <option value="TRAINER">Pelatih</option>
                  <option value="TRAINEE">Peserta</option>
                </b-form-select>
              </b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">Email</b-col>
              <b-col sm="8"><b-form-input type="email" v-model="iEmail"></b-form-input></b-col>
          </b-row>
          <b-row class="font-weight-bold pl-5 mb-3">
              <b-col sm="3 mt-2">No. Telepon</b-col>
              <b-col sm="8"><b-form-input type="text" v-model="iPhone"></b-form-input></b-col>
          </b-row>
          <template slot="modal-footer" slot-scope="{ cancel, ok }">
              <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
              <b-button size="sm" variant="primary"  style="width:100px"
              @click="addUser(); if (vValid==true) { ok(); vValid=false }">Tambah</b-button>
          </template>
      </b-modal>
  </div>
</template>

<script>
import UserTable from './../components/TrainersTraineesTable.vue'
import Pagination from './../components/Pagination.vue'
export default {
  data () {
    return {
      allUsers: '',
      iName: '',
      iRole: 'TRAINEE',
      iEmail: '',
      iPhone: '',
      searchKeyword: '',
      selectedRole: 'all',
      selectedSort: 'role',
      totalPages: 0,
      page: 0,
      vValid: false
    }
  },
  components: {
    'user-table': UserTable,
    'pagination': Pagination
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    getContentPage (page) {
      this.page = page
      let role = 'role=' + this.selectedRole + '&'
      if (this.selectedRole === 'all') {
        role = ''
      }
      let sort = 'sortBy=' + this.selectedSort + '&'
      let name = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        name = ''
      }
      this.$axios
        .get('http://komatikugm.web.id:13370/users?' + name + 'page=' + this.page + '&' + role + '&size=15&' + sort, {withCredentials: true})
        .then(response => {
          this.allUsers = response.data.data
          this.totalPages = response.data.data.totalPages
        })
        .catch(error => { console.log(error.response) })
    },
    validEmail (iEmail) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(iEmail)
    },
    isNumeric (n) {
      return !isNaN(parseFloat(n)) && isFinite(n)
    },
    addUser () {
      if (this.iName === '' || !this.isNumeric(this.iPhone) || this.iPhone === '' || !this.validEmail(this.iEmail) || this.iEmail === '') {
        if (this.iName === '') {
          alert('Nama harus diisi')
        }
        if (!this.isNumeric(this.iPhone) || this.iPhone === '') {
          alert('Nomor telepon harus diisi dengan benar')
        }
        if (!this.validEmail(this.iEmail) || this.iEmail === '') {
          alert('Email harus diisi dengan benar')
        }
      } else {
        this.$axios.post('http://komatikugm.web.id:13370/_admin/users', {
              email: this.iEmail,
              name: this.iName,
              phone: this.iPhone,
              role: this.iRole
          }, { withCredentials: true })
          .then(response => {
            console.log(response)
            this.iName = ''
            this.iRole = 'TRAINEE'
            this.iEmail = ''
            this.iPhone = ''
            this.getContentPage(0)
            })
          .catch(error => console.log(error))
        this.vValid = true
      }
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
.page-item{
  background-color: white;
}
</style>
