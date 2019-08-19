<template>
    <b-card-group id="cardGroupClassHistory" class="my-3 px-2">
        <span v-for="index in classesHistory" :key="index">
          <b-card class="classHistory my-1" v-if="index.status=='closed'">
              <b-card-text class="classHistoryName mb-2">Kelas : {{index.name}}</b-card-text>
              <b-card-text class="classHistoryModuleName font-weight-bold mb-2"><b>{{index.module.name}}</b></b-card-text>
              <!-- <b-card-text class="classHistoryCategory mb-2">{{index}}</b-card-text> -->
              <b-card-text class="classHistoryTrainers mb-2">Pelatih : {{index.trainer.fullname}}</b-card-text>
              <b-card-text class="classLastSession purpleColor"><b>Berakhir pada : {{index.classroomSessions[(index.classroomSessions.length) - 1].startTime | moment("DD MMMM YYYY HH:mm")}}</b></b-card-text>
              <router-link :to="{path: '/admin/history-all-classes/' + index.id + '/grade-list'}">
                  <b-button variant="outline-dark" class="btnInputGrade float-right transparent">Daftar Nilai</b-button>
              </router-link>
          </b-card>
        </span>
    </b-card-group>
</template>

<script>
export default {
  props: ['classesHistory']
}
</script>

<style scoped>
span{
  min-width: 100% !important;
}
div.classHistory{
  min-width: 100%;
}
div.classHistory .card-body{
  padding: 8px 20px;
  width: 100%;
}
div.classHistory .classHistoryModuleName{
  font-size: 17px;
}
div.classHistory .btnInputGrade{
  width: 120px;
}
</style>
