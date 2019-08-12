<template>
    <div>
        <b-table id="ctable" responsive striped hover :items="classes.content" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
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
                    <b-button size="sm" variant="primary" @click="ok(); deleteClass(data.item.id)" style="width:100px">Ya</b-button>
                </template>
            </b-modal>
          </template>
        </b-table>
        <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="classes.totalPages" use-router align="right" size="sm"></b-pagination-nav>
        </div>
    </div>
</template>

<script>
export default {
  props: ['classes'],
  data () {
    return {
      fields: [
        {
          key: 'no',
          label: 'No.',
          sortable: false
        },
        {
          key: 'id',
          label: 'ID',
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
            } else {
              return 'Close'
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
      this.$axios.delete('http://komatikugm.web.id:13370/classroom/' + idClass, { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
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
