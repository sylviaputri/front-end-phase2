<template>
    <div>
        <b-table id="ctable" responsive striped hover :items="classes" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ (data.index + 1)*(page + 1) }}.
          </template>
          <template slot="tools" slot-scope="data">
            <router-link :to="{path: '/admin/all-classes/detail-class/' + data.item.id}">
              <b-button size="sm" class="mr-2">Detail</b-button>
            </router-link>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-class' + data.item.id">
              <font-awesome-icon icon="trash"/>
            </b-button>
            <b-modal :id="'modal-delete-class'+data.item.id" centered>
                Apakah Anda yakin akan menghapus kelas "{{data.item.name}}"?
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                    <b-button size="sm" variant="primary" @click="deleteClass(data.item.id); ok()" style="width:100px">Ya</b-button>
                </template>
            </b-modal>
          </template>
        </b-table>
    </div>
</template>

<script>
export default {
  props: ['classes', 'page'],
  data () {
    return {
      fields: [
        {
          key: 'no',
          label: 'No.',
          sortable: false
        },
        {
          key: 'name',
          label: 'Nama Kelas',
          sortable: false
        },
        {
          key: 'moduleName',
          label: 'Nama Modul',
          sortable: false
        },
        {
          key: 'trainer',
          label: 'Pelatih',
          sortable: false
        },
        {
          key: 'status',
          label: 'Status',
          sortable: false,
          formatter: value => {
            if (value === 'open') {
              return 'Open'
            } else if (value === 'ongoing') {
              return 'Ongoing'
            } else {
              return 'Closed'
            }
          }
        },
        {
          key: 'minMember',
          label: 'Min. Pendaftar',
          sortable: false
        },
        {
          key: 'maxMember',
          label: 'Maks. Pendaftar',
          sortable: false
        },
        {
          key: 'member',
          label: 'Pendaftar',
          sortable: false
        },
        {
          key: 'requestCount',
          label: 'Permintaan',
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
    deleteClass (idClass) {
      this.$axios.delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + idClass, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getContentPage(0)
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
  }
}
</script>

<style>
#ctable{
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
