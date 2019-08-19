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
        <div v-if="isAccountInformActive && profile == null" class="contentProfile fadedWhiteBackground mt-3 text-center">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <div v-else-if="isAccountInformActive && profile != null" class="contentProfile fadedWhiteBackground mt-3">
            <div class="profilePhoto text-center pt-3">
                <h5>Foto Profil</h5>
                <b-img v-if="profileImage != null" :src="'http://komatikugm.web.id:13371/photos/' + profileImage" rounded="circle" class="myImgEdit my-2"></b-img>
                <b-img v-else :src="require('./../assets/images/user.png')" rounded="circle" class="myImgEdit my-2"></b-img>
                <br/>
                <b-form-file v-model="fileBrowsed" class="btnChangeProfileImage" value="Ganti" @change="onFileChange(profileImage, $event)" accept="image/*"> </b-form-file>
                <p class="grayColor">Format gambar : JPG, JPEG, PNG</p>
            </div>
            <div class="profileData mt-4 mx-5">
              <b-row class="my-2">
                <b-col sm="3">
                  <label>Nama</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input type="text" disabled :value="profile.fullname" class="inputDisabled"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col sm="3">
                  <label>e-Mail</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input v-model="profile.email" type="email"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="my-2">
                <b-col sm="3">
                  <label>Nomor Telepon</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input type="text" v-model="profile.phone"></b-form-input>
                </b-col>
              </b-row>
              <div class="col-12 d-flex py-3">
                <div class="ml-auto">
                  <b-button variant="primary" @click="saveProfile(); validEmail()" class="btnSaveProfile">Simpan</b-button>
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
              <b-form-input v-model="currentPass" type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mb-2 mt-4">
            <b-col sm="3">
              <label>Password baru</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="newPass" type="password"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3">
              <label>Konfirmasi password</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="confirmPass" type="password"></b-form-input>
            </b-col>
          </b-row>
          <p class="text-right redColor" v-if="isNewPassNotTrue()">*Password tidak sama</p>
          <div class="col-12 d-flex pb-3 pt-5 mt-5">
            <div class="ml-auto">
              <b-button variant="primary" @click="saveNewPass()" :disabled="!isInputPassValid()" class="btnSaveProfile">Simpan</b-button>
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
      profile: null,
      currentPass: '',
      newPass: '',
      confirmPass: '',
      profileImage: null,
      fileBrowsed: ''
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
      .then(response => {
        this.profile = response.data.data
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
    },
    saveProfile () {
      if (!this.isNumeric(this.profile.phone)) {
        alert('Nomor harus diisi dengan benar')
      } else if (!this.validEmail()) {
        alert('email harus diisi dengan benar')
      } else {
        this.$axios.put('http://komatikugm.web.id:13370/users/_profile', {
          email: this.profile.email,
          name: this.profile.fullname,
          phone: this.profile.phone
        }, { withCredentials: true })
        .then(response => {
          console.log(response)
          this.getProfile()
          alert('Data berhasil disimpan')
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
    },
    isNewPassNotTrue () {
      return this.newPass !== this.confirmPass && this.confirmPass !== ''
    },
    isInputPassValid () {
      return !this.isNewPassNotTrue() && this.newPass !== '' && this.confirmPass !== '' && this.currentPass !== ''
    },
    saveNewPass () {
      this.$axios.put('http://komatikugm.web.id:13370/users/_change-password?confirmPassword=' + this.confirmPass + '&currentPassword=' + this.currentPass + '&newPassword=' + this.newPass, { withCredentials: true })
      .then(response => {
        console.log(response)
        alert('Ganti password berhasil')
        this.newPass = ''
        this.confirmPass = ''
        this.currentPass = ''
      })
      .catch(error => {
        console.log(error)
        alert('Password salah')
      })
    },
    validEmail () {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.profile.email)
    },
    isNumeric (n) {
      return !isNaN(parseFloat(n)) && isFinite(n)
    },
    onFileChange (profileImage, e) {
      var files = e.target.files || e.dataTransfer.files
      if (files.length) {
        this.createImage(profileImage, files[0])
      }
      const formData = new FormData()
      formData.append('multipartFile', this.fileBrowsed)
      this.$axios
      .put('http://komatikugm.web.id:13370/users/_profile/_photo', formData, {withCredentials: true})
      .then(response => {
        console.log(response)
        this.getProfile()
      })
      .catch(error => {
        console.log(error.response)
        alert('Mohon tunggu beberapa menit untuk meng-upload foto')
      })
    },
    createImage (profileImage, file) {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.profileImage = e.target.result
      }
      reader.readAsDataURL(file)
    }
  },
  mounted () {
    this.getProfile()
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
    width: 200px;
    height: 30px;
    padding: 0;
    overflow-y: hidden
}
.btnCancelSaveProfile, .btnSaveProfile{
  width: 120px
}
</style>
