<template>
    <div>
        <b-table id="tttable" responsive striped hover :items="users.content" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ (data.index + 1)*(page + 1) }}.
          </template>
          <template slot="tools" slot-scope="data">
            <b-button size="sm" class="mr-2" v-b-modal="'modal-edit-user'+data.item.id" v-if="data.item.role.value!='ADMIN'">
              <font-awesome-icon icon="edit"/>
            </b-button>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-user'+data.item.id" v-if="data.item.role.value!='ADMIN'">
              <font-awesome-icon icon="trash"/>
            </b-button>
            <b-modal :id="'modal-edit-user'+data.item.id" centered>
              <h5 class="pl-5 text-center mb-3"><b>Edit Pengguna</b></h5>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Nama</b-col>
                  <b-col sm="8"><b-form-input type="text" v-model="data.item.fullname"></b-form-input></b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Status</b-col>
                  <b-col sm="8">
                    <b-form-select v-model="data.item.role.value">
                      <option value="TRAINER">Pelatih</option>
                      <option value="TRAINEE">Peserta</option>
                    </b-form-select>
                  </b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">Email</b-col>
                  <b-col sm="8"><b-form-input type="text" v-model="data.item.email"></b-form-input></b-col>
              </b-row>
              <b-row class="font-weight-bold pl-5 mb-3">
                  <b-col sm="3 mt-2">No. Telepon</b-col>
                  <b-col sm="8"><b-form-input type="text" v-model="data.item.phone"></b-form-input></b-col>
              </b-row>
              <template slot="modal-footer" slot-scope="{ cancel, ok }">
                  <b-button size="sm" variant="dark" @click="$parent.getContentPage(0); cancel()" style="width:100px">Batal</b-button>
                  <b-button size="sm" variant="primary" @click="editUser(data.item.id,data.item.email,data.item.fullname,data.item.phone,data.item.role.value); if (vValid==true) { ok(); vValid=false }" style="width:100px">Simpan</b-button>
              </template>
          </b-modal>
          <b-modal :id="'modal-delete-user'+data.item.id" centered>
              Apakah Anda yakin akan menghapus pengguna "{{data.item.fullname}}"?
              <template slot="modal-footer" slot-scope="{ cancel, ok }">
                  <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                  <b-button size="sm" variant="primary" @click="ok(); deleteUser(data.item.id)" style="width:100px">Ya</b-button>
              </template>
          </b-modal>
          </template>
        </b-table>
    </div>
</template>

<script>
export default {
  props: ['users', 'page'],
  data () {
    return {
      vValid: false,
      fields: [
        {
          key: 'no',
          label: 'No.',
          sortable: false
        },
        {
          key: 'fullname',
          label: 'Nama',
          sortable: false
        },
        {
          key: 'role.value',
          label: 'Status',
          sortable: false,
          formatter: value => {
            if (value === 'TRAINER') {
              return 'Pelatih'
            } else if (value === 'TRAINEE') {
              return 'Peserta'
            } else {
              return 'Admin'
            }
          }
        },
        {
          key: 'email',
          label: 'Email',
          sortable: false
        },
        {
          key: 'phone',
          label: 'No. Telepon',
          sortable: false
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ]
    }
  },
  methods: {
    deleteUser (idUser) {
      this.$axios.delete('http://komatikugm.web.id:13370/_admin/users/' + idUser, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.$parent.getContentPage(0)
          })
        .catch(error => console.log(error))
    },
    editUser (idUser, iEmail, iName, iPhone, iRole) {
      if (iName === '' || !this.$parent.isNumeric(iPhone) || iPhone === '' || !this.$parent.validEmail(iEmail) || iEmail === '') {
          if (iName === '') {
            alert('Nama harus diisi')
          }
          if (!this.$parent.isNumeric(iPhone) || iPhone === '') {
            alert('Nomor telepon harus diisi dengan benar')
          }
          if (!this.$parent.validEmail(iEmail) || iEmail === '') {
            alert('Email harus diisi dengan benar')
          }
      } else {
          this.$axios.put('http://komatikugm.web.id:13370/_admin/users/' + idUser, {
                email: iEmail,
                name: iName,
                phone: iPhone,
                role: iRole
            }, { withCredentials: true })
            .then(response => {
              console.log(response)
              this.$parent.getContentPage(0)
              })
            .catch(error => console.log(error))
            this.vValid = true
      }
    }
  }
}
</script>

<style>
#tttable{
  background-color: rgba(255, 255, 255, 85%);
  text-align: center;
}
.page-link{
  color: black;
  font-weight: bold;
  padding: 15px !important;
  border: none
}
.page-item.active{
  background: #0A87C0;
}
</style>
