<template>
    <div class="profileSetting pt-1 pb-0 mb-3">
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
        <div v-if="isAccountInformActive" class="contentProfile fadedWhiteBackground mt-3">
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
                  <b-form-input type="text" disabled="true" :value="profile.fullname" class="inputDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col sm="3">
                  <label>e-Mail</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input type="email" :value="profile.email"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col sm="3">
                  <label>Nomor Telepon</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input type="text" :value="profile.phone"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col sm="3">
                  <label>Deskripsi</label>
                </b-col>
                <b-col sm="9">
                  <b-form-textarea placeholder="Maksimal 300 karakter" rows="4" max-rows="6" class="mb-0"></b-form-textarea>
                </b-col>
              </b-row>
              <div class="col-12 d-flex py-3">
                <div class="ml-auto">
                  <b-button variant="secondary" class="btnCancelSaveProfile mr-2">Batal</b-button>
                  <b-button variant="primary" class="btnSaveProfile">Simpan</b-button>
                </div>
              </div>
            </div>
        </div>
        <div v-if="isChangePassActive" class="contentProfile fadedWhiteBackground mt-3 px-5 py-3">
          <p>Untuk keamanan akun Anda, mohon untuk tidak menyebarkan password Anda ke orang lain.</p>
          <b-row class="my-2">
            <b-col sm="3">
              <label>Password saat ini</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label>Password baru</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label>Konfirmasi password</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="password"></b-form-input>
            </b-col>
          </b-row>
          <div class="col-12 d-flex pb-3 pt-5 mt-5">
            <div class="ml-auto">
              <b-button variant="secondary" class="btnCancelSaveProfile mr-2">Batal</b-button>
              <b-button variant="primary" class="btnSaveProfile">Simpan</b-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isAccountInformActive: true,
      isChangePassActive: false,
      profile: null
    }
  },
  created () {
    window.scrollTo(0, 0)
  },
  methods: {
    changeActiveState () {
      this.isAccountInformActive = !this.isAccountInformActive
      this.isChangePassActive = !this.isChangePassActive
    },
    getProfile () {
      this.$axios
      .get('http://komatikugm.web.id:13370/users/_profile', {withCredentials: true})
      .then(response => this.profile = response.data.data)
      .catch(error => { console.log(error.response) })
    }
  },
  mounted() {
    this.getProfile()
  },
  watch: {
    profile () {
      this.getProfile()
    }
  }
}
</script>

<style scoped>
.tabProfile{
    width: 100%;
}
.contentProfile{
    width: 100%;
    /* height: 550px;
    overflow-y: scroll */
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
.btnCancelSaveProfile, .btnSaveProfile{
  width: 120px
}
</style>
