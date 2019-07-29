<template>
    <div id="trainerOpenedClass" class="px-5">
        <h2 class="font-weight-bold mb-4">Kelas yang Dibuka</h2>
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
        <div id="cardClassOpened" class="mx-2 my-3">
            <b-card-group deck>
                <b-card class="classOpened mb-2 pointer" v-for="index in 3" :key="index" v-b-modal="'modal-detail-class-1'">
                    <b-card-text class="classOpenedPersent position-absolute font-weight-bold purpleColor" style="top:0;right:5px">25%</b-card-text>
                    <b-card-text class="classOpenedName mb-1">Kelas Pel006</b-card-text>
                    <b-card-text class="classOpenedModuleName font-weight-bold mb-0">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></b-card-text>
                    <b-card-text class="classOpenedCategory mb-2">Data Visualization</b-card-text>
                    <b-card-text class="classOpenedNextSession purpleColor">Sesi berikutnya : 28 Agustus 2019</b-card-text>
                </b-card>
            </b-card-group>
            <!-- Pop up -->
            <b-modal id="modal-detail-class-1" class="modal-detail-class">
                <h5 class="pl-5">Kelas PEL002</h5>
                <p class="font-weight-bold pl-5" style="font-size:18px">Data Visualization with Python V.4 <font-awesome-icon icon="file-signature" size="sm"/></p>
                <p class="font-weight-bold pl-5 mb-1">Jumlah peserta = 35 orang</p>
                <p class="font-weight-bold pl-5 mb-1">Jumlah pendaftar = 42 orang</p>
                <p class="font-weight-bold pl-5 mb-1">45 menit / sesi</p>
                <light-timeline :items='items'>
                    <template slot='content' slot-scope='{ item }'>
                        {{item.content}} <span style="color:red">{{item.exam}}</span>
                    </template>
                </light-timeline>
                <p class="font-weight-bold pl-5 mb-1">Daftar materi yang harus diajarkan</p>
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
                    <b-button size="sm" variant="dark" @click="cancel()" style="width:100px">
                    Batal
                    </b-button>
                    <b-button size="sm" variant="primary" @click="ok()" style="width:100px">
                    Simpan
                    </b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          content: 'Kamis, 25 Juli 2019, pukul 12.00 WIB'
        },
        {
          content: 'Rabu, 12 Agustus 2019, pukul 10.00 WIB'
        },
        {
          content: 'Rabu, 19 Agustus 2019, pukul 10.00 WIB'
        },
        {
          content: `Jumat, 30 Agustus 2019, pukul 13.30 WIB`,
          exam: '(EXAM)'
        }
      ]
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
.classOpened{
  max-width: calc(33.3% - 30px);
  min-width: calc(33.3% - 30px);
}
.classOpened:hover {
    background: rgba(255, 255, 255, 60%) !important
}
.modal-header{
    display: none;
}
.modal-dialog{
    max-width: 60%;
}
/* session */
.line-item{
    color: black
}
.item-circle{
    border-color: #5F00BF !important
}
.line-item:first-child .item-circle{
    background: #5F00BF !important
}
</style>
