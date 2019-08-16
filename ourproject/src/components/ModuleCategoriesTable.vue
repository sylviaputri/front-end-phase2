<template>
    <div>
        <b-table id="cattable" responsive striped hover :items="allCategories.content" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ (data.index + 1)*(page + 1) }}.
          </template>
          <template slot="tools" slot-scope="data">
            <b-button size="sm" class="mr-2" @click="saveName(data.item.name)" v-b-modal="'modal-edit-category'+data.item.id">
              <font-awesome-icon icon="edit"/>
            </b-button>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-category'+data.item.id">
              <font-awesome-icon icon="trash"/>
            </b-button>
            <b-modal :id="'modal-edit-category'+data.item.id" centered>
                <h5 class="pl-5 text-center mb-3"><b>Edit Kategori</b></h5>
                <b-row class="font-weight-bold pl-5 mb-3">
                    <b-col sm="3 mt-2">Nama Kategori</b-col>
                    <b-col sm="8"><b-form-input type="text" v-model="tempName"></b-form-input></b-col>
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
                    <b-button size="sm" variant="primary" @click="ok(); deleteCat(data.item.name)" style="width:100px">Ya</b-button>
                </template>
            </b-modal>
          </template>
        </b-table>
    </div>
</template>

<script>
export default {
  props: ['allCategories', 'page'],
  data () {
    return {
      tempName: '',
      fields: [
        {
          key: 'no',
          label: 'No.',
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
    }
  },
  methods: {
    deleteCat (nameCat) {
      this.$axios.delete(
        'http://komatikugm.web.id:13370/_trainer/modules/_categories', {
        data: {
          name: nameCat}
        }, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.$parent.getContentPage(0)
          })
        .catch(error => console.log(error.response))
    },
    editCat (idCat, nameCat) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/_categories', {
          moduleCategory: {
            id: idCat,
            name: nameCat
          },
          newCategoryName: this.tempName
        }, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.$parent.getContentPage(0)
          })
        .catch(error => console.log(error))
    },
    saveName (nameCat) {
      this.tempName = nameCat
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
</style>
