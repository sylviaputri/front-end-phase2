<template>
    <div class="sideMenuAccount fadedWhiteBackground">
        <div class="pt-3" style="text-align: center">
            <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="myImg"></b-img>
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
      myName: null
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
      .catch(error => { console.log(error) })
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/users/_profile', {withCredentials: true})
      .then(response => (this.myName = response.data.data.fullname))
      .catch(error => { console.log(error.response) })
  }
}
</script>

<style>
div.sideMenuAccount{
    width: 20%;
}
.myImg{
    width: 40%;
    height: 40%;
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
