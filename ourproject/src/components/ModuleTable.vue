<template>
    <div>
        <b-table id="mtable" responsive striped hover :items="items" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools">
            <router-link to="/admin/detail-module">
              <b-button size="sm" class="mr-2">Detail</b-button>
            </router-link>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-module'">
              <font-awesome-icon icon="trash"/>
            </b-button>
          </template>
        </b-table>
        <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="sm"></b-pagination-nav>
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
          key: 'id',
          label: 'ID',
          sortable: false
        },
        {
          key: 'module_name',
          label: 'Nama Modul',
          sortable: false
        },
        {
          key: 'version',
          label: 'Versi',
          sortable: false
        },
        {
          key: 'kategory',
          label: 'Kategori',
          sortable: false
        },
        {
          key: 'status',
          label: 'Status',
          sortable: false
        },
        {
          key: 'exam',
          label: 'Ujian',
          sortable: false
        },
        {
          key: 'session_time',
          label: 'Waktu per Sesi',
          sortable: false
        },
        {
          key: 'total_session',
          label: 'Jumlah Sesi',
          sortable: false
        },
        {
          key: 'opened_class',
          label: 'Kelas Dibuka',
          sortable: false
        },
        {
          key: 'closed_class',
          label: 'Kelas Ditutup',
          sortable: false
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ],
      items: [
        { id: '001', module_name: 'Dickerson', version: 'Macdonald', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' },
        { id: '002', module_name: 'Larsen', version: 'Shaw', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' },
        { id: '003', module_name: 'Geneva', version: 'Wilson', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' },
        { id: '004', module_name: 'Jami', version: 'Carney', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' }
      ]
    }
  },
  methods: {
    linkGen (pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
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
