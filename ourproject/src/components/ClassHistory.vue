<template>
    <b-card-group id="cardGroupClassHistory" class="my-3 px-2">
        <b-card class="classHistory my-1" v-for="index in 5" :key="index">
        <b-card-text class="classHistoryName mb-2">Kelas : PEL005</b-card-text>
        <b-card-text class="classHistoryModuleName font-weight-bold mb-2">Learn Node.js V.2</b-card-text>
        <b-card-text class="classHistoryCategory mb-2">Web Programming</b-card-text>
        <b-card-text class="classHistoryTrainers mb-2">Pelatih : Nama Pelatih</b-card-text>
        <b-card-text class="classLastSession purpleColor"><b>Sesi berikutnya : 28 Agustus 2019</b></b-card-text>
        <b-button variant="primary" class="btnInputGrade float-right transparent">Lihat Nilai</b-button>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
}
</script>

<style>
div.classHistory{
  min-width: 100%;
}
div.classHistory .card-body{
  padding: 8px 20px;
}
div.classHistory .classHistoryModuleName{
  font-size: 17px;
}
div.classHistory .btnInputGrade{
  width: 120px;
}
</style>
