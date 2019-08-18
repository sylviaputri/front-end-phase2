<template>
    <div>
        <b-row class="fadedWhiteBackground m-auto" style="width:100%">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(1)" v-bind:class="{ activeTab: activeTab==1 }">
                Permintaan yang Sedang Berjalan
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==1">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(2)" v-bind:class="{ activeTab: activeTab==2 }">
                Permintaan Ditolak
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==2">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(3)" v-bind:class="{ activeTab: activeTab==3 }">
                Permintaan Diterima
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==3">
            </b-col>
        </b-row>
        <div class="fadedWhiteBackground mt-3">
          <div v-if="moduleRequests == ''" class="text-center pt-5">Tidak ada modul yang sedang kamu ajukan</div>
          <div v-if="moduleRequests == null" class="text-center pt-3">
            <b-spinner label="Spinning"></b-spinner>
          </div>
          <module-request class="p-3" :moduleRequests=moduleRequests></module-request>
        </div>
    </div>
</template>

<script>
import ModuleRequest from './ModuleRequest.vue'
export default {
  data () {
    return {
      activeTab: 1,
      moduleRequests: null
    }
  },
  components: {
    'module-request': ModuleRequest
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
      this.getModuleRequests()
    },
    getModuleRequests () {
      if (this.activeTab === 1) {
        this.$axios
        .get('http://komatikugm.web.id:13370/modules/_requests/_users?page=0&popular=false&size=15&status=waiting', {withCredentials: true})
        .then(response => (this.moduleRequests = response.data.data.content))
        .catch(error => {
          console.log(error.response)
          var errorMessage = error.response.data.message
          if (Array.isArray(errorMessage)) {
            var errorMessageArray = ''
            for (var i = 0; i < errorMessage.length; i++) {
              errorMessageArray += errorMessage[i] + ' '
            }
            alert(errorMessageArray)
          } else alert(errorMessage)
        })
      } else if (this.activeTab === 2) {
        this.$axios
        .get('http://komatikugm.web.id:13370/modules/_requests/_users?page=0&popular=false&size=15&status=rejected', {withCredentials: true})
        .then(response => (this.moduleRequests = response.data.data.content))
        .catch(error => {
          console.log(error.response)
          var errorMessage = error.response.data.message
          if (Array.isArray(errorMessage)) {
            var errorMessageArray = ''
            for (var i = 0; i < errorMessage.length; i++) {
              errorMessageArray += errorMessage[i] + ' '
            }
            alert(errorMessageArray)
          } else alert(errorMessage)
        })
      } else {
        this.$axios
        .get('http://komatikugm.web.id:13370/modules/_requests/_users?page=0&popular=false&size=15&status=accepted', {withCredentials: true})
        .then(response => (this.moduleRequests = response.data.data.content))
        .catch(error => {
          console.log(error.response)
          var errorMessage = error.response.data.message
          if (Array.isArray(errorMessage)) {
            var errorMessageArray = ''
            for (var i = 0; i < errorMessage.length; i++) {
              errorMessageArray += errorMessage[i] + ' '
            }
            alert(errorMessageArray)
          } else alert(errorMessage)
        })
      }
    }
  },
  mounted () {
    this.getModuleRequests()
  }
}
</script>
