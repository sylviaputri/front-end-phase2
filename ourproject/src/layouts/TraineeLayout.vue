<template>
    <div id="traineeApp">
        <header>
            <Slide>
                <a><span>Dashboard</span></a>
                <a><span>Semua modul</span></a>
                <a><span>Permintaan modul</span></a>
                <a><span>Pemintaan kelas</span></a>
                <a><span>Akun saya</span></a>
            </Slide>
            <div bg-variant="light" text-variant="black" class="text-center font-weight-bold" id="headerLogo">
                LOGOQUE
            </div>
        </header>
        <br/>
        <br/>
        <br/>
        <router-view></router-view>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
  components: {
    Slide // Register your component
  }
}
</script>

<style>
div#traineeApp header{
    background: wheat;
    height: 55px;
}
div#headerLogo{
    font-size: 30px;
}
.bm-burger-button{
    margin-top: -25px;
}
.bm-menu{
    background-color: rgb(44, 76, 92)
}
</style>
