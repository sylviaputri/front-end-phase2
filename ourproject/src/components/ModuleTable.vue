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
            <b-button size="sm" class="mr-2">
              <font-awesome-icon icon="trash"/>
            </b-button>
          </template>
        </b-table>
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
          sortable: true
        },
        {
          key: 'module_name',
          label: 'Nama Modul',
          sortable: true
        },
        {
          key: 'version',
          label: 'Versi',
          sortable: true
        },
        {
          key: 'kategory',
          label: 'Kategori',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'exam',
          label: 'Ujian',
          sortable: true
        },
        {
          key: 'session_time',
          label: 'Waktu per Sesi',
          sortable: true
        },
        {
          key: 'total_session',
          label: 'Jumlah Sesi',
          sortable: true
        },
        {
          key: 'opened_class',
          label: 'Kelas Dibuka',
          sortable: true
        },
        {
          key: 'closed_class',
          label: 'Kelas Ditutup',
          sortable: true
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ],
      items: [
        { id: '001', module_name: 'Dickerson', version: 'Macdonald', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' },
        { id: '001', module_name: 'Larsen', version: 'Shaw', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' },
        { id: '002', module_name: 'Geneva', version: 'Wilson', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' },
        { id: '003', module_name: 'Jami', version: 'Carney', kategory: 'Artificial Intelligent', status: 'Aktif', exam: 'Ya', session_time: 'Waktu', total_session: '4', opened_class: '5', closed_class: '2' }
      ]
    }
  }
}
</script>

<style>
#mtable{
  background-color: rgba(255, 255, 255, 85%);
  text-align: center;
}
</style>
