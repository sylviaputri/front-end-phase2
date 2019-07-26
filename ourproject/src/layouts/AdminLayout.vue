<template>
    <div id="adminApp">
        <header>
            <Slide>
                <router-link to="/admin/all-modules" v-bind:class="{ active: isActive(0) }" @click.native="setSidebarMenu(0)" class="pointer">Modul</router-link>
                <router-link to="/admin/all-classes" v-bind:class="{ active: isActive(1) }" @click.native="setSidebarMenu(1)" class="pointer">Kelas</router-link>
                <router-link to="/admin/request-module" v-bind:class="{ active: isActive(2) }" @click.native="setSidebarMenu(2)" class="pointer">Permintaan Modul</router-link>
                <router-link to="/admin/request-class" v-bind:class="{ active: isActive(3) }" @click.native="setSidebarMenu(3)" class="pointer">Pemintaan Kelas</router-link>
                <router-link to="/admin/all-trainers-and-trainees" v-bind:class="{ active: isActive(4) }" @click.native="setSidebarMenu(4)" class="pointer">Daftar Seluruh Pelatih dan Peserta</router-link>
                <router-link to="/admin/module-categories" v-bind:class="{ active: isActive(5) }" @click.native="setSidebarMenu(5)" class="pointer">Kategori Modul</router-link>
                <router-link to="/admin/all-modules" v-bind:class="{ active: isActive(6) }" @click.native="setSidebarMenu(6)" class="pointer">Riwayat Semua Kelas</router-link>
                <router-link to="/" id="btnLogout" class="pointer">Keluar</router-link>
            </Slide>
            <div bg-variant="light" text-variant="black" class="text-center font-weight-bold" id="headerLogo">
                LOGOQUE
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
div#adminApp{
    height: 100%;
}
div#adminApp header{
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
div#adminApp>div{
    margin-top: 65px;
}
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
</style>
