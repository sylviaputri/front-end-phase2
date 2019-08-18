<template>
    <div>
      <b-table id="mtable" responsive striped hover :items="modules.content" :fields="fields">
        <template slot="no" slot-scope="data">
          {{ (data.index + 1)*(page + 1) }}.
        </template>
        <template slot="tools" slot-scope="data">
          <router-link :to="{path: '/admin/all-modules/detail-module/' + data.item.id}">
            <b-button size="sm" class="mr-2">Detail</b-button>
          </router-link>
          <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-module'+data.item.id">
            <font-awesome-icon icon="trash"/>
          </b-button>
          <b-modal :id="'modal-delete-module'+data.item.id" centered>
              Apakah Anda yakin akan menghapus modul "{{data.item.name}}"?
              <template slot="modal-footer" slot-scope="{ cancel, ok }">
                  <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                  <b-button size="sm" variant="primary" @click="ok(); deleteModule(data.item.id)" style="width:100px">Ya</b-button>
              </template>
          </b-modal>
        </template>
      </b-table>
    </div>
</template>

<script>
export default {
  props: ['modules', 'page'],
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
          label: 'Nama Modul',
          sortable: false
        },
        {
          key: 'version',
          label: 'Versi',
          sortable: false
        },
        {
          key: 'category',
          label: 'Kategori',
          sortable: false
        },
        {
          key: 'hasExam',
          label: 'Ujian',
          sortable: false,
          formatter: value => {
            if (value === true) {
              return 'Ada'
            } else {
              return 'Tidak Ada'
            }
          }
        },
        {
          key: 'timePerSession',
          label: 'Waktu per Sesi',
          sortable: false,
          formatter: value => {
            return value + ' Menit'
          }
        },
        {
          key: 'sessionCount',
          label: 'Jumlah Sesi',
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
    deleteModule (idModule) {
      this.$axios.delete('http://komatikugm.web.id:13370/_trainer/modules/' + idModule, { withCredentials: true })
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
#mtable{
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
