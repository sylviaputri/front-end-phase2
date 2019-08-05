<template>
    <div>
        <div id="detailModule1" class="whiteColor">
            <div id="detailModule1Left" class="float-left text-center py-5">
                <div style="height:30%; margin-top:80px">
                    <h2>{{ module.module.name }} V.{{ module.module.version }}</h2>
                </div>
                <h5 class="mt-5">Peringkat & Ulasan</h5>
                <div class="row m-auto fitContent pt-2">
                    <h2 class="mr-4">{{ module.moduleRating | ratingPrecision }} / 5.0</h2>
                    <router-link :to="{path: '/trainee/detail-module/' + module.module.id + '/rating-review-module'}">
                        <b-button id="btnToRatingReview" variant="primary" class="border border-2">Lihat detail</b-button>
                    </router-link>
                </div>
            </div>
            <div id="detailModule1Right" class="float-left text-justify pt-5 pl-3 pr-5">
                <h5 style="margin-top:80px">{{ module.module.description }}</h5>
            </div>
        </div>
        <div id="detailModule2" class="whiteColor">
            <diV style="margin-left:15%;padding-top:120px">
                <h3 class="mb-5">{{ module.module.moduleCategory.name }}</h3>
                <h3 class="mb-5">{{ module.module.timePerSession }} menit / sesi</h3>
                <h3 v-if="module.hasExam">Dengan ujian</h3>
                <h3 v-else>Tanpa ujian</h3>
            </diV>
        </div>
        <div id="detailModule3">
            <div class="row m-auto pt-2">
                <h2 id="detailModule3Material">DAFTAR MATERI</h2>
                <div id="detailModule3MaterialContent" class="text-right pr-3">
                    <h5>{{ module.module.materialDescription }}</h5>
                </div>
            </div>
        </div>
        <div id="detailModule4" class="p-5">
            <h3 class="float-left mb-5">DAFTAR KELAS</h3>
            <b-button v-if="role === 'TRAINER'" variant="primary" id="btnCreateNewClass" class="border border-2 float-right" v-b-modal="'modal-create-class'">BUAT KELAS BARU</b-button>
            <class-list :classRooms=module.module.classrooms class="mt-5" style="clear:both"></class-list>
            <!-- Pop up create class -->
            <b-modal id="modal-create-class" class="modal-detail-class" centered>
                <p class="font-weight-bold pl-5 mb-5" style="font-size:18px">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></p>
                <b-row class="px-5 mb-3 font-weight-bold pl-5 mb-3">
                <b-col sm="3">Nama Kelas</b-col>
                <b-col><b-form-input type="text"></b-form-input></b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                    <b-col sm="7">Jumlah Minimal Peserta</b-col>
                    <b-col sm="3"><b-form-input type="number" min="1"></b-form-input></b-col>
                    <b-col sm="2">orang</b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                    <b-col sm="7">Jumlah Maksimal Peserta</b-col>
                    <b-col sm="3"><b-form-input type="number" min="1"></b-form-input></b-col>
                    <b-col sm="2">orang</b-col>
                </b-row>
                <p class="font-weight-bold pl-5 mb-1">45 Menit / Sesi</p>
                <b-row class="pl-5 pb-2 pt-3">
                    <b-col sm="10"></b-col>
                    <b-col sm="2" class="text-center">Dengan Ujian</b-col>
                </b-row>
                <b-row class="pl-5">
                    <b-col sm="2" class="mt-2">Sesi 1</b-col>
                    <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
                    <b-col sm="1" class="mt-2">Pukul</b-col>
                    <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
                    <b-col sm="2" class="mt-2">WIB</b-col>
                    <b-col sm="2" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
                </b-row>
                <b-row class="pl-5">
                    <b-col sm="2" class="mt-2">Sesi 2</b-col>
                    <b-col sm="3"><b-form-input type="date"></b-form-input></b-col>
                    <b-col sm="1" class="mt-2">Pukul</b-col>
                    <b-col sm="2"><b-form-input type="time"></b-form-input></b-col>
                    <b-col sm="2" class="mt-2">WIB</b-col>
                    <b-col sm="2" class="text-center"><b-form-checkbox></b-form-checkbox></b-col>
                </b-row>
                <p class="font-weight-bold pl-5 mb-1 mt-3">Daftar materi yang harus diajarkan</p>
                <ol class="pl-5">
                    <li class="ml-4 pl-2">Introduction to Matplotlib</li>
                    <li class="ml-4 pl-2">Introduction to Seaborn</li>
                    <li class="ml-4 pl-2">Visualizing World Cup Data With Seaborn</li>
                </ol>
                <p class="font-weight-bold pl-5 mb-1">Materi yang telah diunggah</p>
                <ol class="pl-5">
                    <li class="ml-4 pl-2 py-2">
                        <b-row>
                            <b-col sm="5">
                                <a href="">Materi_computer_science_v1.zip</a>
                            </b-col>
                            <b-col sm="2">
                                <b-button variant="outline-dark" class="py-0 ml-3">Browse...</b-button>
                            </b-col>
                            <b-col sm="2">
                                <b-button variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <li class="ml-4 pl-2 pt-2 pb-4">
                        <b-row>
                            <b-col sm="5">
                                <a href="">Materi_data_visualization_v1.zip</a>
                            </b-col>
                            <b-col sm="2">
                                <b-button variant="outline-dark" class="py-0 ml-3">Browse...</b-button>
                            </b-col>
                            <b-col sm="2">
                                <b-button variant="outline-dark" class="py-0 ml-3">Hapus</b-button>
                            </b-col>
                        </b-row>
                    </li>
                    <a href="">+ tambah materi</a>
                </ol>
                <!-- pop up footer -->
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Batal</b-button>
                    <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Buka kelas</b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
import ClassList from './../components/Classlist.vue'
export default {
  data () {
    return {
      role: null,
      module: null
    }
  },
  components: {
    'class-list': ClassList
  },
  created () {
    window.scrollTo(0, 0)
    this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
        .then(response => (this.role = response.data.role))
        .catch(error => { console.log(error) })
  },
  filters: {
    ratingPrecision: function (value) {
      return value.toFixed(1)
    }
  },
  mounted () {
    this.$axios
    .get('http://komatikugm.web.id:13370/modules/' + this.$route.params.moduleId, {withCredentials: true})
    .then(response => (this.module = response.data.data))
    .catch(error => { console.log(error.response) })
  }
}
</script>

<style>
div#detailModule1 {
    height: 500px;
    background: url('./../assets/background_images/module_1.jpg') no-repeat;
    background-size: cover;
    margin-top: -10px;
}
div#detailModule1 #detailModule1Left, div#detailModule1 #detailModule1Right, div#detailModule3 #detailModule3Left, div#detailModule3 #detailModule3Right {
    width: 50%;
    height: 100%;
}
button#btnToRatingReview{
    height: 40px;
}
div#detailModule2 {
    height: 500px;
    background: url('./../assets/background_images/module_2.jpg') no-repeat;
    background-size: cover;
}
div#detailModule3 {
    min-height: 200px;
    max-height: fit-content;
    background: url('./../assets/background_images/module_3.jpg') no-repeat;
    background-size: cover;
}
div#detailModule3 #detailModule3Material {
    margin-top:5%;
    padding-left:15%;
    width:50%
}
div#detailModule3 #detailModule3MaterialContent{
    width:50%;
    margin-top:5%;
}
div#detailModule4{
    min-height: 200px;
    max-height: fit-content;
    background: url('./../assets/background_images/module_3.jpg') no-repeat;
    background-size: cover;
}
</style>
