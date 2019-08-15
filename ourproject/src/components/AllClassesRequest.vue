<template>
    <b-card-group id="cardGroupTopClassRequested" class="my-3 px-2">
        <b-card class="topClassRequested my-1" v-for="classRequest in classesRequest" :key="classRequest">
        <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">{{ classRequest.className }}</b-card-text>
        <b-card-text class="topClassRequestedName mb-0">Kelas : {{ classRequest.classId }}</b-card-text>
        <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : {{ classRequest.trainerName }}</b-card-text>
        <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh {{ classRequest.requesterCount }} orang</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="topClassRequestedTime float-left mb-0">{{classRequest.createdAt | moment("DD-MMMM-YYYY")}}</b-card-text>
            <b-button variant="primary" class="btnDecline float-right"  v-b-modal="'modal-open-class'+classRequest.classId">Buka Kelas</b-button>
            <b-button variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-class'+classRequest.classId">Tolak</b-button>
        </b-card-footer>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
  props: ['classesRequest']
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
