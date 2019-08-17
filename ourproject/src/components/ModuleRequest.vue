<template>
  <div>
    <b-card-group id="cardGroupModulRequested" class="my-3 px-2">
      <b-card class="modulRequested my-1" v-for="moduleRequest in moduleRequests" :key="moduleRequest.moduleRequest.id">
        <b-card-text v-if="role === 'ADMIN'" class="modulRequestedTotal float-right"><b>{{ moduleRequest.moduleRequest.moduleRequestLikes.length}} suara</b></b-card-text>
        <b-card-text class="modulRequestedName font-weight-bold mb-3">{{ moduleRequest.moduleRequest.title }}</b-card-text>
        <b-card-text class="modulRequestedRequester mb-2">Permintaan diajukan oleh : {{ moduleRequest.moduleRequest.user.fullname }}</b-card-text>
        <b-card-footer class="border-0 p-0 m-0 grayColor" style="background:transparent">
            <b-card-text class="modulRequestedTime float-left mb-0">{{ moduleRequest.moduleRequest.createdAt | moment("DD-MM-YYYY HH:mm:ss") }}</b-card-text>
            <b-card-text v-if="role === 'TRAINEE'" class="modulRequestedTotal float-right"><font-awesome-icon @click="joinModuleRequest(moduleRequest.moduleRequest.id)" v-bind:class="{ lightBlueColor: moduleRequest.hasVote}" icon="thumbs-up" size="lg" class="pointer btnJoinModuleRequest"/> {{ moduleRequest.moduleRequest.moduleRequestLikes.length }}</b-card-text>
            <b-button v-if="role === 'ADMIN'" variant="primary" class="btnDecline float-right" v-b-modal="'modal-add-module'+moduleRequest.moduleRequest.id">Buat Modul</b-button>
            <b-button v-if="role === 'ADMIN'" variant="dark" class="btnAccept float-right" v-b-modal="'modal-decline-module'+moduleRequest.moduleRequest.id">Tolak</b-button>
        </b-card-footer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  props: ['moduleRequests'],
  data () {
    return {
      role: ''
    }
  },
  methods: {
    joinModuleRequest (moduleId) {
      this.$axios.post('http://komatikugm.web.id:13370/modules/_likes', {
        moduleRequestId: moduleId
      }, { withCredentials: true })
      .then(response => {
        console.log(response)
        this.$parent.getContentPage(0)
      })
      .catch(error => console.log(error.response))
    },
    rejectClassRequest (moduleId) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/_requests/' + moduleId + '/_status/rejected', { withCredentials: true })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    },
    acceptClassRequest (moduleId) {
      this.$axios.put('http://komatikugm.web.id:13370/_trainer/modules/_requests/' + moduleId + '/_status/eccepted', { withCredentials: true })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    }
  },
  created () {
    this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
      .then(response => (this.role = response.data.role))
      .catch(error => { console.log(error) })
    this.$axios
      .get('http://komatikugm.web.id:13370/users?page=0&role=TRAINER', {withCredentials: true})
      .then(response => (this.trainerList = response.data.data))
      .catch(error => { console.log(error.response) })
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
