<template>
    <div>
        <b-table id="cattable" responsive striped hover :items="allCategories.content" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools" slot-scope="data">
            <b-button size="sm" class="mr-2" v-b-modal="'modal-edit-category'+data.item.id">
              <font-awesome-icon icon="edit"/>
            </b-button>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-category'+data.item.id">
              <font-awesome-icon icon="trash"/>
            </b-button>
            <b-modal :id="'modal-edit-category'+data.item.id" centered>
                <h5 class="pl-5 text-center mb-3"><b>Edit Kategori</b></h5>
                <b-row class="font-weight-bold pl-5 mb-3">
                    <b-col sm="3 mt-2">Nama Kategori</b-col>
                    <b-col sm="8"><b-form-input type="text" v-model="data.item.name"></b-form-input></b-col>
                </b-row>
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                    <b-button size="sm" variant="primary" @click="ok(); editCat(data.item.id, data.item.name)" style="width:100px">Simpan</b-button>
                </template>
            </b-modal>
            <b-modal :id="'modal-delete-category'+data.item.id" centered>
                Apakah Anda yakin akan menghapus kategori "{{data.item.name}}"?
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                    <b-button size="sm" variant="primary" @click="ok(); deleteCat(data.item.name);" style="width:100px">Ya</b-button>
                </template>
            </b-modal>
          </template>
        </b-table>
        <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="allCategories.totalPages" use-router align="right" size="sm"></b-pagination-nav>
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
    deleteCat (nameCat) {
      this.$axios.delete('http://komatikugm.web.id:13370/_trainer/modules/_categories', {
            name: nameCat
        }, { withCredentials: true })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    editCat (idCat, nameCat) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/_categories', {
            moduleCategory: {
              id: idCat,
              name: nameCat
            },
            newCategoryName: nameCat
        }, { withCredentials: true })
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
