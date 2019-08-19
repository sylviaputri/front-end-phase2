<template>
    <div class="sideMenuAccount fadedWhiteBackground">
        <div class="pt-3" style="text-align: center">
          <b-img v-if="profileImage != null" :src="'http://komatikugm.web.id:13371/photos/' + profileImage" rounded="circle" class="myImg"></b-img>
          <b-img v-else :src="require('./../assets/images/user.png')" rounded="circle" class="myImg"></b-img>
          <h5 class="py-2">{{ myName }}</h5>
        </div>
        <nav class="menuAccountOption py-2 pl-3" v-if="role === 'TRAINEE'">
            <router-link to="/trainee/my-account/profile" v-bind:class="{ activeMenu: isActive(0) }" @click.native="setSidebarAccountMenu(0)" class="my-3">Profil</router-link>
            <router-link to="/trainee/my-account/my-class" v-bind:class="{ activeMenu: isActive(1) }" @click.native="setSidebarAccountMenu(1)" class="my-3">Kelas yang sedang diikuti</router-link>
            <router-link to="/trainee/my-account/request-module" v-bind:class="{ activeMenu: isActive(2) }" @click.native="setSidebarAccountMenu(2)" class="my-3">Permintaan modul</router-link>
            <router-link to="/trainee/my-account/request-class" v-bind:class="{ activeMenu: isActive(3) }" @click.native="setSidebarAccountMenu(3)" class="my-3">Permintaan kelas</router-link>
            <router-link to="/trainee/my-account/my-history" v-bind:class="{ activeMenu: isActive(4) }" @click.native="setSidebarAccountMenu(4)" class="my-3">Riwayat</router-link>
        </nav>
        <nav class="menuAccountOption py-2 pl-3" v-if="role === 'TRAINER'">
            <router-link to="/trainer/my-account/profile" v-bind:class="{ activeMenu: isActive(0) }" @click.native="setSidebarAccountMenu(0)" class="my-3">Profil</router-link>
            <router-link to="/trainer/my-account/my-rating-review" v-bind:class="{ activeMenu: isActive(1) }" @click.native="setSidebarAccountMenu(1)" class="my-3">Rating & review tentang saya</router-link>
            <router-link to="/trainer/my-account/my-train-history" v-bind:class="{ activeMenu: isActive(2) }" @click.native="setSidebarAccountMenu(2)" class="my-3">Riwayat</router-link>
        </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {
      role: null,
      myName: null,
      profileImage: null
    }
  },
  methods: {
    setSidebarAccountMenu (sidebarIndex) {
      this.$store.commit('SET_SIDEBARACCOUNTMENU', sidebarIndex)
    },
    getSidebarAccountMenu () {
      return this.$store.getters.sidebarAccountMenu
    },
    isActive (sidebarIndex) {
      if (sidebarIndex === this.getSidebarAccountMenu()) {
        return true
      }
      return false
    }
  },
  created () {
    this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true })
      .then(response => {
        let originalRole = response.data.role
        if (originalRole === 'TRAINER' && localStorage.roleSwitch === 'TRAINEE') {
          this.role = localStorage.roleSwitch
        } else {
          this.role = response.data.role
        }
      })
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
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/users/_profile', {withCredentials: true})
      .then(response => {
        this.myName = response.data.data.fullname
        this.profileImage = response.data.data.photo
      })
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
</script>

<style>
div.sideMenuAccount{
    width: 20%;
}
.myImg{
    width: 125px;
    height: 125px
}
nav.menuAccountOption>p{
    font-display: 17px
}
nav.menuAccountOption>p:hover{
    color: #0A87C0
}
nav.menuAccountOption>p.activeMenu{
    color: #0A87C0;
    font-weight: bold
}
nav.menuAccountOption>a{
    color: black;
    display: block
}
nav.menuAccountOption>a:hover{
    color: #0A87C0;
    text-decoration: none
}
nav.menuAccountOption>a.activeMenu{
    color: #0A87C0;
    font-weight: bold
}
</style>
