<template>
    <div>
        <b-table id="cattable" responsive striped hover :items="allCategories" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools">
            <b-button size="sm" class="mr-2" v-b-modal="'modal-edit-category'">
              <font-awesome-icon icon="edit"/>
            </b-button>
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
  props: ['allCategories'],
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
          label: 'Nama Kategori',
          sortable: false
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ]
      // items: [
      //   { id: '001', name: 'Artificial Intelligent'},
      //   { id: '002', name: 'Artificial Intelligent'},
      //   { id: '003', name: 'Artificial Intelligent'},
      //   { id: '004', name: 'Artificial Intelligent'}
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
