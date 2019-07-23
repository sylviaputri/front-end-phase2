<template>
    <div>
        <b-table id="ctable" responsive striped hover :items="items" :fields="fields">
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
          sortable: false
        },
        {
          key: 'class_name',
          label: 'Nama Kelas',
          sortable: false
        },
        {
          key: 'module_name',
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
          key: 'min_regis',
          label: 'Min. Pendaftar',
          sortable: false
        },
        {
          key: 'max_regis',
          label: 'Maks. Pendaftar',
          sortable: false
        },
        {
          key: 'register',
          label: 'Pendaftar',
          sortable: false
        },
        {
          key: 'request',
          label: 'Permintaan',
          sortable: false
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ],
      items: [
        { id: '001', class_name: 'PEL0009', module_name: 'Dickerson', trainer: 'Shaw', status: 'Sedang berjalan', min_regis: '10', max_regis: '15', register: '5', request: '20' },
        { id: '001', class_name: 'PEL0005', module_name: 'Larsen', trainer: 'Shaw', status: 'Dibuka', min_regis: '10', max_regis: '15', register: '15', request: '20' },
        { id: '002', class_name: 'PEL0001', module_name: 'Geneva', trainer: 'Wilson', status: 'Ditutup', min_regis: '10', max_regis: '15', register: '10', request: '20' },
        { id: '003', class_name: 'PEL0003', module_name: 'Jami', trainer: 'Carney', status: 'Dibuka', min_regis: '10', max_regis: '15', register: '10', request: '20' }
      ]
    }
  }
}
</script>

<style>
#ctable{
  background-color: rgba(255, 255, 255, 85%);
  text-align: center;
}
</style>
