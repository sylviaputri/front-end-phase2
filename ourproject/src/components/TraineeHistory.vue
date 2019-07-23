<template>
    <div>
        <b-row class="fadedWhiteBackground m-auto" style="width:100%">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(1)" v-bind:class="{ activeTab: activeTab==1 }">
                Lulus
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==1">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveTab(2)" v-bind:class="{ activeTab: activeTab==2 }">
                Tidak Lulus
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="activeTab==2">
            </b-col>
        </b-row>
        <div class="fadedWhiteBackground mt-3">
            <p>dfd</p>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 1
    }
  },
  methods: {
    changeActiveTab (index) {
      this.activeTab = index
    }
  }
}
</script>

<style>
.activeTab{
  color: rgb(10, 135, 192) !important
}
</style>
