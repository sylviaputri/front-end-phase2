<template>
    <b-card-group deck>
      <b-card class="module mb-3 pointer" v-for="module in modules" :key="module.id">
        <router-link :to="{path: '/trainee/detail-module/' + module.id}">
          <b-card-body style="max-height:100px; min-height:100px">
            <b-card-text class="moduleRating mb-1 float-left font-weight-bold ">{{ module.rating | ratingPrecision }} / 5.0</b-card-text>
            <b-card-text class="moduleCategory mb-1 float-right font-weight-bold ">{{ module.category }}</b-card-text>
            <b-card-text class="moduleName font-weight-bold mb-1">{{ module.name | cutModuleName }} V.{{ module.version }} <font-awesome-icon v-if="module.hasExam" icon="file-signature" size="sm"/></b-card-text>
            <b-card-text class=" moduleDesc mb-1 mr-5" style="height:50px; overflow:hidden">{{ module.desc | cutDescription }}</b-card-text>
          </b-card-body>
          <b-card-img :src="require('./../assets/images/module_ornament.png')" class="moduleOrnament position-absolute"></b-card-img>
          <b-card-footer class="p-0 mt-3 pr-5">
            <b-row>
              <b-col sm="4">
                <b-card-text class="moduleOpenedClass mb-0 grayColor">{{ module.openClassroomCount }} kelas dibuka</b-card-text>
              </b-col>
              <b-col sm="8">
                <b-card-text class="moduleSession mb-0 ml-4 grayColor"><font-awesome-icon icon="hourglass-half" size="sm"/> {{ module.timePerSession }} menit x {{ module.sessionCount }} sesi</b-card-text>
              </b-col>
            </b-row>
          </b-card-footer>
        </router-link>
      </b-card>
    </b-card-group>
</template>

<script>
export default {
  props: ['modules'],
  filters: {
    ratingPrecision (value) {
      return value.toFixed(1)
    },
    cutDescription (value) {
      if (value.length >= 72) {
        return value.slice(0, 72) + ' ...'
      } else {
        return value
      }
    },
    cutModuleName (value) {
      if (value.length >= 28) {
        return value.slice(0, 28) + ' ...'
      } else {
        return value
      }
    }
  }
}
</script>

<style scoped>
div.module{
  max-width: calc(33.3% - 30px);
  min-width: calc(33.3% - 30px);
}
div.module .card-body{
  padding: 5px;
}
div.module .card-footer{
  background: transparent
}
div.module a{
  color: black;
}
div.module .moduleRating{
  color: #D40000;
}
div.module .moduleRating, div.module .moduleCategory, div.module .card-footer{
  font-size: 13px;
}
div.module .moduleName{
  clear: both
}
div.module .moduleOrnament{
  width: 80px;
  height: 80px;
  bottom: 0;
  right: 0;
}
div.module:hover{
  background: rgba(255, 255, 255, 60%) !important
}
div.module a:hover{
  text-decoration: none
}
</style>
