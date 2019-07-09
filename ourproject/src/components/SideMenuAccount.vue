<template>
    <div class="sideMenuAccount fadedWhiteBackground">
        <div class="pt-3" style="text-align: center">
            <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="myImg"></b-img>
            <h5 class="py-2">Nama Saya</h5>
        </div>
        <nav class="menuAccountOption py-3 pl-3" v-if="isTrainee">
            <p class="pointer activeMenu">Profil</p>
            <p class="pointer">Kelas yang sedang diikuti</p>
            <p class="pointer">Permintaan modul</p>
            <p class="pointer">Permintaan kelas</p>
            <p class="pointer">Riwayat</p>
        </nav>
        <nav class="menuAccountOption py-3 pl-3" v-if="!isTrainee">
            <p class="pointer activeMenu">Profil</p>
            <p class="pointer">Rating & review tentang saya</p>
            <p class="pointer">Riwayat</p>
        </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isTrainee: true
    }
  }
}
</script>

<style>
div.sideMenuAccount{
    width: 20%;
}
.myImg{
    width: 40%;
    height: 40%;;
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
</style>
