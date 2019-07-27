<template>
    <div>
        <b-table id="cattable" responsive striped hover :items="items" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools">
            <router-link to="/admin/detail-class">
              <b-button size="sm" class="mr-2">
                <font-awesome-icon icon="edit"/>
              </b-button>
            </router-link>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-category'">
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
          key: 'category_name',
          label: 'Nama Kategori',
          sortable: false
        },
        {
          key: 'active',
          label: 'Jumlah Modul Aktif',
          sortable: false
        },
        {
          key: 'not_active',
          label: 'Jumlah Modul Tidak Aktif',
          sortable: false
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ],
      items: [
        { id: '001', category_name: 'Artificial Intelligent', active: '4', not_active: '2' },
        { id: '002', category_name: 'Artificial Intelligent', active: '4', not_active: '2' },
        { id: '003', category_name: 'Artificial Intelligent', active: '4', not_active: '2' },
        { id: '004', category_name: 'Artificial Intelligent', active: '4', not_active: '2' }
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
#cattable{
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
