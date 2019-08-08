<template>
  <div>
    <b-card-group id="cardGroupModulRequested" class="my-3 px-2">
      <b-card class="modulRequested my-1" v-for="moduleRequest in moduleRequests" :key="moduleRequest.moduleRequest.id">
        <b-card-text class="modulRequestedName font-weight-bold mb-3">{{ moduleRequest.moduleRequest.title }}</b-card-text>
        <b-card-text class="modulRequestedRequester mb-2">Permintaan diajukan oleh : {{ moduleRequest.moduleRequest.user.fullname }}</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="modulRequestedTime float-left mb-0">{{ moduleRequest.moduleRequest.createdAt | moment("DD-MM-YYYY hh:mm:ss") }}</b-card-text>
            <b-card-text class="modulRequestedTotal float-right"><font-awesome-icon @click="joinModuleRequest(moduleRequest.moduleRequest.id)" v-bind:class="{ lightBlueColor: moduleRequest.hasVote}" icon="thumbs-up" size="lg" class="pointer btnJoinModuleRequest"/> {{ moduleRequest.moduleRequest.moduleRequestLikes.length }}</b-card-text>
        </b-card-footer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  props: ['moduleRequests'],
  methods: {
    joinModuleRequest (moduleId) {
      this.$axios.post('http://komatikugm.web.id:13370/modules/_likes', {
        moduleRequestId: moduleId
      }, { withCredentials: true })
      .then(response => {
        console.log(response)
        window.location.reload()
      })
      .catch(error => console.log(error))
    }
  }
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
  font-size: 20px
}
</style>
