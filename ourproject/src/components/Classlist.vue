<template>
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
                    <!-- <router-link to="/admin/all-classes/detail-class/">
                        <b-button variant="outline-dark" class="float-right py-1 mt-3" style="min-width:150px;font-size:13px">EDIT</b-button>
                    </router-link> -->
                </div>
            </b-card-body>
        </b-card>
    </b-card-group>
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
    }
}
</script>

<style scoped>
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
