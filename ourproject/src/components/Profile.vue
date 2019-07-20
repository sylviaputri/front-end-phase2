<template>
    <div class="profileSetting pt-1 pb-0 mb-4">
        <b-row class="tabProfile fadedWhiteBackground m-auto">
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isAccountInformActive }">
                INFORMASI AKUN
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isAccountInformActive">
            </b-col>
            <b-col class="tabs pointer text-center mt-1 font-weight-bold lightGrayColor" @click="changeActiveState" v-bind:class="{ activeTab: isChangePassActive }">
                UBAH PASSWORD
                <hr class="mb-0 mt-2" style="width:300px; background: rgb(10, 135, 192); height:2px" v-if="isChangePassActive">
            </b-col>
        </b-row>
        <div v-if="isAccountInformActive" class="contentProfile fadedWhiteBackground mt-3 pb-3">
            <div class="profilePhoto text-center pt-3">
                <h5>Foto Profil</h5>
                <b-img :src="require('./../assets/images/example_person_image.jpg')" rounded="circle" class="myImgEdit my-2"></b-img>
                <br/>
                <b-button variant="primary" class="border border-2 btnChangeProfileImage">Ganti</b-button>
                <p class="m-0 grayColor">Ukuran gambar maksimal 2 MB</p>
                <p class="grayColor">Format gambar : JPG, JPEG, PNG</p>
            </div>
            <div class="profileData mt-4 mx-5">
              <b-row class="my-2">
                <b-col sm="3">
                  <label>Nama</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input type="text" disabled="true" value="Nama Saya" class="inputDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col sm="3">
                  <label>e-Mail</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input type="email" value="coba@gmail.com"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col sm="3">
                  <label>Nomor Telepon</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input type="text" value="081234567890"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col sm="3">
                  <label>Deskripsi</label>
                </b-col>
                <b-col sm="9">
                  <b-form-textarea placeholder="Maksimal 300 karakter" rows="4" max-rows="6"></b-form-textarea>
                </b-col>
              </b-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isAccountInformActive: true,
      isChangePassActive: false
    }
  },
  methods: {
    changeActiveState: function () {
      this.isAccountInformActive = !this.isAccountInformActive
      this.isChangePassActive = !this.isChangePassActive
    }
  }
}
</script>

<style>
/* tab */
.activeTab{
  color: rgb(10, 135, 192) !important
}
.tabs:hover{
  color: rgb(10, 135, 192) !important
}
.tabProfile{
    width: 100%;
}
.contentProfile{
    width: 100%;
}
.myImgEdit{
    width: 100px;
    height: 100px;
}
.btnChangeProfileImage{
    width: 150px;
    height: 30px;
    padding: 0
}
</style>
