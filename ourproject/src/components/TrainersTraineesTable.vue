<template>
    <div>
        <b-table id="ctable" responsive striped hover :items="items" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools">
            <router-link to="/admin/detail-class">
              <b-button size="sm" class="mr-2">Detail</b-button>
            </router-link>
            <b-button size="sm" class="mr-2">
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
          key: 'name',
          label: 'Nama',
          sortable: false
        },
        {
          key: 'status',
          label: 'Status',
          sortable: false
        },
        {
          key: 'email',
          label: 'Email',
          sortable: false
        },
        {
          key: 'no_tlp',
          label: 'No. Telepon',
          sortable: false
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ],
      items: [
        { id: '001', name: 'Dickerson', status: 'Pelatih', email: 'dickerson@gmail.com', no_tlp: '081234567890' },
        { id: '001', name: 'Larsen', status: 'Peserta', email: 'larsen@gmail.com', no_tlp: '081234567890' },
        { id: '002', name: 'Geneva', status: 'Peserta', email: 'geneva@gmail.com', no_tlp: '081234567890' },
        { id: '003', name: 'Jami', status: 'Peserta', email: 'jami@gmail.com', no_tlp: '081234567890' }
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
