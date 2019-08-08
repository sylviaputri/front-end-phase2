<template>
    <div>
        <b-table id="tttable" responsive striped hover :items="users.content" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools" slot-scope="data">
            <b-button size="sm" class="mr-2" v-b-modal="'modal-edit-user'" v-if="data.item.role.value!='ADMIN'">
              <font-awesome-icon icon="edit"/>
            </b-button>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-user'" v-if="data.item.role.value!='ADMIN'">
              <font-awesome-icon icon="trash"/>
            </b-button>
          </template>
        </b-table>
        <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="users.totalPages" use-router align="right" size="sm"></b-pagination-nav>
        </div>
    </div>
</template>

<script>
export default {
  props: ['users'],
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
          key: 'fullname',
          label: 'Nama',
          sortable: false
        },
        {
          key: 'role.value',
          label: 'Status',
          sortable: false
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
      // items: [
      //   { id: '001', name: 'Dickerson', status: 'Pelatih', email: 'dickerson@gmail.com', phone: '081234567890' },
      //   { id: '002', name: 'Larsen', status: 'Peserta', email: 'larsen@gmail.com', phone: '081234567890' },
      //   { id: '003', name: 'Geneva', status: 'Peserta', email: 'geneva@gmail.com', phone: '081234567890' },
      //   { id: '004', name: 'Jami', status: 'Peserta', email: 'jami@gmail.com', phone: '081234567890' }
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
