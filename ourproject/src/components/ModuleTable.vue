<template>
    <div>
        <b-table id="mtable" responsive striped hover :items="modules.content" :fields="fields">
          <template slot="no" slot-scope="data">
            {{ data.index + 1 }}.
          </template>
          <template slot="tools" slot-scope="data">
            <router-link :to="{path: '/admin/all-modules/detail-module/' + data.item.id}">
              <b-button size="sm" class="mr-2">Detail</b-button>
            </router-link>
            <b-button size="sm" class="mr-2" v-b-modal="'modal-delete-module'">
              <font-awesome-icon icon="trash"/>
            </b-button>
          </template>
        </b-table>
        <div class="overflow-auto">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="modules.totalPages" use-router align="right" size="sm"></b-pagination-nav>
        </div>
    </div>
</template>

<script>
export default {
  props: ['modules'],
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
          label: 'Nama Modul',
          sortable: false
        },
        {
          key: 'version',
          label: 'Versi',
          sortable: false
        },
        {
          key: 'category',
          label: 'Kategori',
          sortable: false
        },
        {
          key: 'hasExam',
          label: 'Ujian',
          sortable: false
        },
        {
          key: 'timePerSession',
          label: 'Waktu per Sesi (Menit)',
          sortable: false
        },
        {
          key: 'sessionCount',
          label: 'Jumlah Sesi',
          sortable: false
        },
        {
          key: 'openClassroomCount',
          label: 'Kelas Dibuka',
          sortable: false
        },
        {
          key: 'closedClassroomCount',
          label: 'Kelas Ditutup',
          sortable: false
        },
        {
          key: 'tools',
          label: '',
          sortable: false
        }
      ]
      // items: [
      //   { id: '001', name: 'Dickerson', version: 'Macdonald', category: 'Artificial Intelligent', hasExam: 'Ya', timePerSession: 'Waktu', sessionCount: '4', openClassroomCount: '5', closedClassroomCount: '2' },
      //   { id: '002', name: 'Larsen', version: 'Shaw', category: 'Artificial Intelligent', hasExam: 'Ya', timePerSession: 'Waktu', sessionCount: '4', openClassroomCount: '5', closedClassroomCount: '2' },
      //   { id: '003', name: 'Geneva', version: 'Wilson', category: 'Artificial Intelligent', hasExam: 'Ya', timePerSession: 'Waktu', sessionCount: '4', openClassroomCount: '5', closedClassroomCount: '2' },
      //   { id: '004', name: 'Jami', version: 'Carney', category: 'Artificial Intelligent', hasExam: 'Ya', timePerSession: 'Waktu', sessionCount: '4', openClassroomCount: '5', closedClassroomCount: '2' }
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
