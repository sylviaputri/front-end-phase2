<template>
    <b-card-group id="cardGroupTopClassRequested" class="my-3 px-2">
        <b-card class="topClassRequested my-1" v-for="index in 5" :key="index">
        <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">Learn Node.js V.2</b-card-text>
        <b-card-text class="topClassRequestedName mb-0">Kelas : PEL005</b-card-text>
        <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : Nama Pelatih</b-card-text>
        <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh 5 orang</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="topClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
            <b-button variant="primary" class="btnDecline float-right">Buka Kelas</b-button>
            <b-button variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-class'">Tolak</b-button>
        </b-card-footer>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
}
</script>

<style scoped>
div.topClassRequested{
  min-width: 100%;
}
div.topClassRequested .card-body{
  padding: 8px 20px;
}
div.topClassRequested .topClassRequestedModuleName{
  font-size: 17px;
}
div.topClassRequested .topClassRequestedTime{
  font-size: 12px;
}
.btnAccept, .btnDecline{
  width: 120px;
  margin-right: 5px;
}
</style>
