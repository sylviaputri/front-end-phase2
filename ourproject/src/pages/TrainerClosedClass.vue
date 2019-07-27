<template>
    <div id="trainerClosedClass" class="px-5">
        <h2 class="font-weight-bold mb-4">Kelas yang Ditutup</h2>
        <!-- searching tools -->
        <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
            <b-row>
                <b-col cols="4">
                    <b-row>
                        <b-col>
                            <b-input-group>
                                <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                                <b-form-input type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                </b-col>
                <b-col cols="6">
                    <b-row>
                        <b-col class="mr-3">
                            <font-awesome-icon icon="shapes" class="position-absolute" style="top:18px; left:-8px"/>
                            <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                                <option :value="all">semua kategori</option>
                                <option value="1">Artificial Intelligent</option>
                                <option value="2">Data Analyze</option>
                            </b-form-select>
                        </b-col>
                        <b-col class="mr-3">
                            <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                            <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                                <option :value="all">ujian dan tanpa ujian</option>
                                <option value="0">tanpa ujian</option>
                                <option value="1">ujian</option>
                            </b-form-select>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
        <!-- content -->
        <div id="cardClassClosed" class="mx-2 my-3">
            <b-card-group deck>
                <b-card class="classClosed pointer mb-2" v-for="index in 5" :key="index">
                    <b-card-text class="classClosedName mb-1" v-b-modal="'modal-detail-class-1'">Kelas Pel006</b-card-text>
                    <b-card-text class="classClosedModuleName font-weight-bold mb-0" v-b-modal="'modal-detail-class-1'">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></b-card-text>
                    <b-card-text class="classClosedCategory mb-2" v-b-modal="'modal-detail-class-1'">Data Visualization</b-card-text>
                    <b-button variant="primary" class="float-right py-0" v-b-modal="'modal-delete-class-1'">Hapus kelas</b-button>
                </b-card>
            </b-card-group>
            <!-- Pop up detail class -->
            <b-modal id="modal-detail-class-1" class="modal-detail-class">
                <h5 class="pl-5">Kelas PEL002</h5>
                <p class="font-weight-bold pl-5 mb-4" style="font-size:18px">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></p>
                <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                    <b-col sm="7">Jumlah minimal peserta</b-col>
                    <b-col sm="3"><b-form-input type="number" value="10" min="1"></b-form-input></b-col>
                    <b-col sm="2">orang</b-col>
                </b-row>
                <b-row class="font-weight-bold pl-5 mb-3" style="width:500px">
                    <b-col sm="7">Jumlah maksimal peserta</b-col>
                    <b-col sm="3"><b-form-input type="number" value="50" min="1"></b-form-input></b-col>
                    <b-col sm="2">orang</b-col>
                </b-row>
                <p class="font-weight-bold pl-5 mb-1">45 menit / sesi</p>
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
            <!-- Pop up delete class -->
            <b-modal id="modal-delete-class-1">
                Apakah Anda yakin akan menghapus kelas ini?
                <template slot="modal-footer" slot-scope="{ cancel, ok }">
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">Tidak</b-button>
                    <b-button size="sm" variant="primary" @click="ok()" style="width:100px">Ya</b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  },
  created () {
    this.setLayout('trainer-layout')
  }
}
</script>

<style>
html {
  background: url('./../assets/background_images/apps_page.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.classClosed{
  max-width: calc(33.3% - 30px);
  min-width: calc(33.3% - 30px);
}
.classClosed:hover {
    background: rgba(255, 255, 255, 60%) !important
}
.classClosed .card-body{
    padding-bottom: 3px;
    padding-right: 3px
}
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
</style>
