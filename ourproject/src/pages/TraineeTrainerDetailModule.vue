<template>
    <div>
        <div id="detailModule1" class="whiteColor">
            <div id="detailModule1Left" class="float-left text-center py-5">
                <div style="height:30%; margin-top:80px">
                    <h2>Machine Learning V.3</h2>
                </div>
                <h5 class="mt-5">Peringkat & Ulasan</h5>
                <div class="row m-auto fitContent pt-2">
                    <h2 class="mr-4">4.2 / 5.0</h2>
                    <router-link to="/trainee/detail-module/rating-review-module">
                        <b-button id="btnToRatingReview" variant="primary" class="border border-2">Lihat detail</b-button>
                    </router-link>
                </div>
            </div>
            <div id="detailModule1Right" class="float-left text-justify pt-5 pl-3 pr-5">
                <h5 style="margin-top:80px">Machine learning, bidang ilmu komputer yang memberikan kemampuan sistem komputer untuk belajar dari data, adalah salah satu topik terpanas dalam ilmu komputer. Machine learning mengubah dunia dari penyaringan spam di jejaring sosial ke visi komputer untuk mobil yang dapat menyetir sendiri, aplikasi potensial pembelajaran mesin sangat luas. Kelas ini mencakup algoritma pembelajaran mesin dasar yang akan membantu Anda memajukan karir.</h5>
            </div>
        </div>
        <div id="detailModule2" class="whiteColor">
            <diV style="margin-left:15%;padding-top:120px">
                <h3 class="mb-5">Artificial Intellegent</h3>
                <h3 class="mb-5">45 menit / sesi</h3>
                <h3>Dengan ujian</h3>
            </diV>
        </div>
        <div id="detailModule3">
            <div class="row m-auto pt-2">
                <h2 id="detailModule3Material">DAFTAR MATERI</h2>
                <div id="detailModule3MaterialContent" class="text-right pr-3">
                    <h5 class="mb-5" v-for="index in 5" :key="index">Introduction to Machine Learning</h5>
                </div>
            </div>
        </div>
        <div id="detailModule4" class="p-5">
            <h3>DAFTAR KELAS</h3>
            <b-card-group deck class="mt-4">
                <b-card class="classList mb-3" v-for="index in 5" :key="index">
                    <b-card-header class="p-0" style="background:transparent; border:none">
                        <b-card-text class="classId mb-1 float-left font-weight-bold ">Kelas PEL001</b-card-text>
                        <b-card-text class="classState mb-1 float-right font-weight-bold greenColor">OPEN</b-card-text>
                    </b-card-header>
                    <b-card-body class="p-2" style="clear:both">
                        <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="classImgTrainer float-left"></b-img>
                        <div class="float-left">
                            <b-card-text class="classTrainerName mb-0 ml-4">Nama Pelatih</b-card-text>
                            <b-card-text class="classTrainerRating orangeColor ml-4">4.2 / 5.0</b-card-text>
                        </div>
                        <div class="classTimeline mt-5 pt-3" style="clear:both">
                            <b-card-text>Sesi Kelas</b-card-text>
                            <light-timeline :items='items' class="pl-4">
                                <template slot='content' slot-scope='{ item }'>
                                    {{item.content}} <span style="color:red">{{item.exam}}</span>
                                </template>
                            </light-timeline>
                            <b-progress :max="maxApplier" height="1.5rem">
                                <b-progress-bar :value="applier">
                                    <strong>{{ applier }} pendaftar</strong>
                                </b-progress-bar>
                            </b-progress>
                            <p>Ketentuan jumlah pendaftar= {{ minApplier }} - {{ maxApplier }} orang</p>
                            <b-button variant="outline-dark" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">DAFTAR</b-button>
                        </div>
                    </b-card-body>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      applier: 30,
      minApplier: 10,
      maxApplier: 50,
      items: [
        {
          content: 'Rabu, 12 Agustus 2019, pukul 12.00 WIB'
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
  created () {
    window.scrollTo(0, 0)
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
    margin-top:15%;
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
.classList{
  max-width: calc(50% - 30px);
  min-width: calc(50% - 30px);
}
.classList .classId{
    font-size: 22px;
}
.classList .classState{
    font-size: 14px
}
.classList .classImgTrainer{
    height: 53px;
    width: 53px
}
.classList .classTrainerName, .classList .classTrainerRating{
    font-size: 18px
}
.line-container::after{
    left:0.5rem !important;
    border-left: 2px solid #0A87C0
}
.line-item{
    padding: 5px !important
}
.item-circle{
    border-color: #0A87C0 !important
}
</style>
