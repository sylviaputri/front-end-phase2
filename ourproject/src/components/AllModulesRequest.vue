<template>
    <b-card-group id="cardGroupModulRequested" class="my-3 px-2">
        <!-- example -->
        <!-- <b-card class="modulRequested my-1" v-for="index in 5" :key="index">
        <b-card-text class="modulRequestedTotal float-right"><b>135 suara</b></b-card-text>
        <b-card-text class="modulRequestedName font-weight-bold mb-3">JavaScript Errors and Debugging</b-card-text>
        <b-card-text class="modulRequestedRequester mb-2">Permintaan diajukan oleh : Nama Peminta</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="modulRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
            <b-button variant="primary" class="btnDecline float-right">Buat Modul</b-button>
            <b-button variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-module'">Tolak</b-button>
        </b-card-footer>
        </b-card> -->
        <!-- axios -->
        <b-card class="modulRequested my-1" v-for="moduleRequest in modulesRequest" :key="moduleRequest">
        <b-card-text class="modulRequestedTotal float-right"><b>{{ moduleRequest.moduleRequestLikes.length }} suara</b></b-card-text>
        <b-card-text class="modulRequestedName font-weight-bold mb-3">{{ moduleRequest.title }}</b-card-text>
        <b-card-text class="modulRequestedRequester mb-2">Permintaan diajukan oleh : {{ moduleRequest.user.fullname }}</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="modulRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
            <b-button variant="primary" class="btnDecline float-right" v-b-modal="'modal-add-module'">Buat Modul</b-button>
            <b-button variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-module'">Tolak</b-button>
        </b-card-footer>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
  props: ['modulesRequest']
}
</script>

<style scoped>
div.modulRequested{
  min-width: 100%;
}
div.modulRequested .card-body{
  padding: 8px 20px;
}
div.modulRequested .modulRequestedName{
  font-size: 17px;
}
div.modulRequested .modulRequestedTime{
  font-size: 12px;
}
div.modulRequested .modulRequestedTotal{
  font-size: 20px;
  margin-right: 5px;
  color: rgb(10, 135, 192);
}
.btnAccept, .btnDecline{
  width: 120px;
  margin-right: 5px;
}
</style>
