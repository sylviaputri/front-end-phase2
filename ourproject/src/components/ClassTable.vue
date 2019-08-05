<template>
    <div>
        <b-table id="ctable" responsive striped hover :items="classes" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools">
            <router-link to="/admin/all-classes/detail-class">
              <b-button size="sm" class="mr-2">Detail</b-button>
            </router-link>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-class'">
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
          sortable: false
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
      // items: [
      //   { id: '001', name: 'PEL0009', moduleName: 'Dickerson', trainer: 'Shaw', status: 'Sedang berjalan', minMember: '10', maxMember: '15', member: '5', requestCount: '20' },
      //   { id: '002', name: 'PEL0005', moduleName: 'Larsen', trainer: 'Shaw', status: 'Dibuka', minMember: '10', maxMember: '15', member: '15', requestCount: '20' },
      //   { id: '003', name: 'PEL0001', moduleName: 'Geneva', trainer: 'Wilson', status: 'Ditutup', minMember: '10', maxMember: '15', member: '10', requestCount: '20' },
      //   { id: '004', name: 'PEL0003', moduleName: 'Jami', trainer: 'Carney', status: 'Dibuka', minMember: '10', maxMember: '15', member: '10',requestCount: '20' }
      // ]
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
