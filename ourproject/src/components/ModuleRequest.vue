<template>
    <b-card-group id="cardGroupModulRequested" class="my-3 px-2">
        <b-card class="modulRequested my-1" v-for="index in 5" :key="index">
        <b-card-text class="modulRequestedName font-weight-bold mb-3">JavaScript Errors and Debugging</b-card-text>
        <b-card-text class="modulRequestedRequester mb-2">Permintaan diajukan oleh : Nama Peminta</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="modulRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
            <b-card-text class="modulRequestedTotal float-right"><font-awesome-icon icon="thumbs-up" size="lg" class="pointer btnJoinModuleRequest"/> 135</b-card-text>
        </b-card-footer>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
}
</script>

<style>
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
  font-size: 20px
}
</style>
