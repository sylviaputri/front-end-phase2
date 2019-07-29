<template>
    <div id="trainerApp">
        <header>
            <Slide>
                <router-link to="/trainer/opened-class" v-bind:class="{ active: isActive(0) }" @click.native="setSidebarMenu(0)" class="pointer">Kelas yang dibuka</router-link>
                <router-link to="/trainer/closed-class" v-bind:class="{ active: isActive(1) }" @click.native="setSidebarMenu(1)" class="pointer">Kelas yang ditutup</router-link>
                <router-link to="/trainer/all-module" v-bind:class="{ active: isActive(2) }" @click.native="setSidebarMenu(2)" class="pointer">Semua Modul</router-link>
                <router-link to="/trainer/request-class" v-bind:class="{ active: isActive(3) }" @click.native="setSidebarMenu(3)" class="pointer">Pemintaan Kelas</router-link>
                <router-link to="/trainer/my-account" v-bind:class="{ active: isActive(4) }" @click.native="setSidebarMenu(4)" class="pointer">Akun Saya</router-link>
                <router-link to="/" id="btnLogout" class="pointer">Keluar</router-link>
            </Slide>
            <div bg-variant="light" text-variant="black" class="text-center font-weight-bold" id="headerLogo">
                LOGOQUE
            </div>
            <div class="roleSwitcher">
                <b-dropdown right variant="primary" text="Pelatih" class="m-2 mt-3">
                    <b-dropdown-item href="/trainee/home">Ganti akun sebagai peserta</b-dropdown-item>
                </b-dropdown>
            </div>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
  components: {
    Slide
  },
  methods: {
    setSidebarMenu (sidebarIndex) {
      this.$store.commit('SET_SIDEBARMENU', sidebarIndex)
      if (sidebarIndex === 4) {
        this.$store.commit('SET_SIDEBARACCOUNTMENU', 0)
      }
    },
    getSidebarMenu () {
      return this.$store.getters.sidebarMenu
    },
    isActive (sidebarIndex) {
      if (sidebarIndex === this.getSidebarMenu()) {
        return true
      }
      return false
    }
  }
}
</script>

<style>
div#trainerApp{
    height: 100%;
}
div#trainerApp header{
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background: white;
    height: 55px;
    z-index: 10;
    border-bottom: 1px solid #e5e5e5;
}
div#headerLogo{
    font-size: 30px;
}
div#trainerApp>div{
    margin-top: 65px;
}
/* burder menu */
.bm-overlay{
    background-color: transparent;
}
.bm-burger-button{
    margin-top: -25px;
}
.bm-menu{
    background-color: rgb(44, 76, 92)
}
.bm-menu .bm-item-list{
    margin: 0px;
}
.bm-menu .bm-item-list a{
    margin-bottom: 25px;
    padding: 0px;
    padding-left: 20px;
    width: 100%;
    color: rgb(184, 183, 173);
}
.bm-menu .bm-item-list a.active{
    color:white;
}
.bm-menu .bm-item-list a.active:hover{
    text-decoration: none;
}
.bm-menu .bm-item-list a#btnLogout{
    position: absolute;
    bottom: 0;
    border-top: 1px solid rgb(184, 183, 173);
    padding-top: 15px;
    margin-bottom: 15px;
}
/* dropdown role switcher */
div.roleSwitcher{
    width: fit-content;
    position: absolute;
    right: 0;
    top: 0
}
div.roleSwitcher .btn{
    border-radius: 12px;
    padding: 0px 5px;
    font-size:18px
}
</style>
