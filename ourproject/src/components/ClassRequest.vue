<template>
  <div>
    <b-card-group id="cardGroupTopClassRequested" class="my-3 px-2">
      <!-- Example -->
      <!-- <b-card class="topClassRequested my-1" v-for="index in 5" :key="index">
      <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">Learn Node.js V.2</b-card-text>
      <b-card-text class="topClassRequestedName mb-0">Kelas : PEL005</b-card-text>
      <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : Nama Pelatih</b-card-text>
      <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh 5 orang</b-card-text>
      <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
          <b-card-text class="topClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
          <b-button v-if="index == 2" variant="secondary" class="btnCancelJoinClassRequest float-right">Batal</b-button>
          <b-button v-else variant="primary" class="btnJoinClassRequest float-right">Bergabung</b-button>
      </b-card-footer>
      </b-card> -->
      <!-- axios (undone) -->
      <b-card class="topClassRequested my-1" v-for="classRequest in classRequests" :key="classRequest">
      <b-card-text class="topClassRequestedModuleName font-weight-bold mb-3">Ini Harusnya Nama Modul</b-card-text>
      <b-card-text class="topClassRequestedName mb-0">Kelas : {{ classRequest.className }}</b-card-text>
      <b-card-text class="topClassRequestedTrainers mb-2">Pelatih : {{ classRequest.trainerName }}</b-card-text>
      <b-card-text class="topClassRequestedRequester mb-1">Permintaan diajukan oleh {{ classRequest.requesterCount }} orang</b-card-text>
      <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
          <b-card-text class="topClassRequestedTime float-left mb-0">05-10-2019 14.03</b-card-text>
          <b-button v-if="index == 2" variant="secondary" class="btnCancelJoinClassRequest float-right">Batal</b-button>
          <b-button @click="joinRequestClass(classRequest.classId)" v-else variant="primary" class="btnJoinClassRequest float-right">Bergabung</b-button>
      </b-card-footer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  props: ['classRequests'],
  methods: {
    joinRequestClass (classId) {
      this.$axios.post('http://komatikugm.web.id:13370/classrooms/_requests', {
          classroomId: classId
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
  }
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
div.topClassRequested .btnCancelJoinClassRequest, div.topClassRequested .btnJoinClassRequest{
  width: 120px
}
</style>
