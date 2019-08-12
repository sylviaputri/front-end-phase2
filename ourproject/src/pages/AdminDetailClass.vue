<template>
<div class="px-5">
	<h2 class="font-weight-bold mb-4" v-if="editClass==false">Detail Kelas</h2>
  <h2 class="font-weight-bold mb-4" v-else>Edit Kelas</h2>
  <div class="fadedWhiteBackground px-2 py-2">
    <div class="detailModul mt-3 mx-3">
      <b-row>
        <b-col>
          <b-row class="my-2">
            <b-col sm="2">
              <label class="mt-2">Kelas</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" :disabled="editClass==false" v-model="detailClass.classroom.name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Modul</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled class="inputDisabled" v-model="detailClass.classroom.module.name"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Versi</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="number" disabled value="1" class="inputDisabled" v-model="detailClass.classroom.module.version"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Pelatih</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" :disabled="editClass==false" value="Nama Pelatih" v-model="detailClass.classroom.trainer.fullname"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="2">
              <label class="mt-2">Status</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="selected" :disabled="editClass==false">
                <option :value="open">Buka</option>
                <option value="close">Tutup</option>
              </b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label class="mt-2">Sesi Kelas</label>
            </b-col>
          </b-row>
          <b-row class="pl-3 pb-2">
              <b-col sm="10"></b-col>
              <b-col sm="2">Dengan Ujian</b-col>
          </b-row>
          <b-row class="ml-3 my-2" v-for="(item, index) in detailClass.classroom.classroomSessions" :key="index">
              <b-col sm="2" class="mt-2">{{ item.description }}</b-col>
              <b-col sm="3"><b-form-input type="date" :disabled="editClass==false" v-model="item.startTime"></b-form-input></b-col>
              <b-col sm="1" class="mt-2">Pukul</b-col>
              <b-col sm="2"><b-form-input type="time" :disabled="editClass==false" v-model="item.startTime"></b-form-input></b-col>
              <b-col sm="2" class="mt-2">WIB</b-col>
              <b-col sm="2" class="text-center" v-if="item.exam==true"><b-form-checkbox :checked=true :disabled="editClass==false"></b-form-checkbox></b-col>
              <b-col sm="2" class="text-center" v-if="item.exam==false"><b-form-checkbox :disabled="editClass==false"></b-form-checkbox></b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col>
              <label class="mt-2">Materi</label>
            </b-col>
          </b-row>
            <ol>
                <li class="py-2" v-for="material in detailClass.classroom.classroomMaterials" :key="material.id">
                    <b-row>
                        <b-col>
                            <a href="">{{ material.file | ellipsis }}</a>
                        </b-col>
                        <b-col cols="2">
                            <b-button variant="outline-dark" class="py-0" v-b-modal="'modal-delete-file-' + material.id" v-if="editClass==true">Hapus</b-button>
                        </b-col>
                    </b-row>
                    <b-modal :id="'modal-delete-file-' + material.id" centered>
                      Apakah Anda yakin ingin menghapus file {{ material.file }}?
                      <template slot="modal-footer" slot-scope="{ cancel, ok }">
                        <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                        <b-button size="sm" variant="primary" @click="ok(); deleteFileMaterial(detailClass.classroom.id, material.id)" style="width:100px">Ya</b-button>
                      </template>
                    </b-modal>
                </li>
            </ol>
            <a href="" class="ml-4" v-if="editClass==true">+ tambah materi</a>
        </b-col>
        <b-col>
          <b-row class="my-2">
            <b-col sm="3">
              <label class="mt-2">ID Kelas</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="text" disabled v-model="detailClass.classroom.id" class="inputDisabled"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Pendaftar</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" :disabled="editClass==false" v-model="detailClass.classroom.module.version"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Orang</label>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Minimal Peserta</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" :disabled="editClass==false" v-model="detailClass.classroom.min_member"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Orang</label>
            </b-col>
          </b-row>
          <b-row class="my-5">
            <b-col sm="3">
              <label class="mt-2">Jumlah Maksimal Peserta</label>
            </b-col>
            <b-col sm="7">
              <b-form-input type="number" :disabled="editClass==false" v-model="detailClass.classroom.max_member"></b-form-input>
            </b-col>
            <b-col sm="2">
              <label class="mt-2">Orang</label>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div class="col-12 d-flex py-3">
        <div class="mr-auto">
            <router-link to="/admin/all-classes">
                <b-button variant="primary" class="btnBack">Kembali</b-button>
            </router-link>
        </div>
        <div class="ml-auto">
          <b-button variant="secondary" class="btnCancelClass mr-2" v-if="editClass==true" @click="editClass = false">Batal</b-button>
          <b-button variant="primary" class="btnSaveClass" v-if="editClass==true" @click="editClass = false">Simpan</b-button>
          <b-button variant="primary" class="btnEditClass" v-if="editClass==false" @click="editClass = true">Edit</b-button>
        </div>
      </div>
    </div>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      detailClass: null,
      editClass: false
    }
  },
  methods: {
    deleteFileMaterial (classId, materialId) {
      this.$axios
          .delete('http://komatikugm.web.id:13370/_trainer/classrooms/' + classId + '/_materials/' + materialId, {withCredentials: true})
          .then(response => console.log(response))
          .catch(error => { console.log(error.response) })
    },
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.$axios
    .get('http://komatikugm.web.id:13370/classrooms/' + this.$route.params.classId, {withCredentials: true})
    .then(response => (this.detailClass = response.data.data))
    .catch(error => { console.log(error.response) })
  }
}
</script>

<style>
html{
  background: url('./../assets/background_images/apps_page.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
