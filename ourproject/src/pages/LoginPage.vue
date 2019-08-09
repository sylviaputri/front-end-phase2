<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <!-- SECTION ! -->
    <div class="section" id="section-1">
      <div class="whiteColor vertical-center" style="background-color: rgba(46, 84, 101, 86%); height:100%">
        <div class="float-left" style="width: 50%">
          <h1 class="font-weight-bold text-center">PRATICA</h1>
          <br/>
          <h5 class="text-center mx-auto" style="width: 70%">
            Kelas Online Karyawan
          </h5>
        </div>
        <div class="float-left border border-3 rounded text-center mx-auto" style="width: 30%; height:65%;">
          <div class="form-group" style="margin-top:25%">
            <input v-model="inputEmail" type="text" id="inputEmail" class="form-control transparent-input whiteColor" required>
            <label class="form-control-placeholder" for="inputEmail">Email</label>
          </div>
          <div class="form-group">
            <input v-model="inputPassword" type="password" id="inputPassword" class="form-control transparent-input whiteColor" required>
            <label class="form-control-placeholder" for="inputPassword">Password</label>
          </div>
          <b-button @click="login(inputEmail, inputPassword)" variant="primary" id="btnSignIn" class="border border-2" style="margin-bottom:5%">SIGN IN</b-button>
          <p v-if="errorLogin" style="color: yellow">*Email atau password salah</p>
        </div>
        <div class="bullet-nav">
          <ul>
            <li class="active-bullet" @click="moveTo1"></li>
            <li @click="moveTo2"></li>
            <li @click="moveTo3"></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section" id="section-2">
      <div class="whiteColor vertical-center" style="background-color: rgba(77, 157, 195, 66%); height:100%">
        <div style="width: 100%">
          <h1 class="font-weight-bold text-center" style="width: 100%">Pendaftaran</h1>
          <br/>
          <h3 class="text-center mx-auto" style="width: 70%">
            Terbuka bagi seluruh karyawan, dapat mendaftarkan diri sebagai peserta maupun pelatih, dan tidak dipungut biaya apapun.
          </h3>
        </div>
        <div class="bullet-nav">
          <ul>
            <li @click="moveTo1"></li>
            <li class="active-bullet" @click="moveTo2"></li>
            <li @click="moveTo3"></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section" id="section-3">
      <div class="colorBackground vertical-center" style="background-color: rgba(141, 206, 237, 59%); height:100%">
        <div style="width: 100%">
          <h1 class="font-weight-bold text-center" style="width: 100%">Manfaat</h1>
          <br/>
          <h3 class="text-center mx-auto" style="width: 70%">
            Memudahkan pengguna untuk mengakses kelas secara online seperti memilih kelas sesuai materi, memilih pelatih, mengunggah materi modul, melihat jadwal kelas, melihat nilai, dan manfaat lainnya.
          </h3>
          <b-button variant="primary" @click="moveTo1" id="btnLetsStart" class="border border-2">Let's Start</b-button>
        </div>
        <div class="bullet-nav">
          <ul>
            <li @click="moveTo1"></li>
            <li @click="moveTo2"></li>
            <li class="active-bullet" @clickclick="moveTo3"></li>
          </ul>
        </div>
      </div>
    </div>
  </full-page>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      options: {
      },
      inputPassword: '',
      inputEmail: '',
      errorLogin: false
    }
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    login (inputEmail, inputPassword) {
      const data = new FormData()
      data.append('email', this.inputEmail)
      data.append('password', this.inputPassword)
      this.$axios.post('http://komatikugm.web.id:13370/auth', data, { withCredentials: true }).then(response => {
        console.log(response)
        this.$axios.get('http://komatikugm.web.id:13370/auth/_role', { withCredentials: true }).then(function (response) {
          if (response.data.role === 'TRAINEE') {
            window.location.href = 'http://localhost:8080/trainee/home'
          } else if (response.data.role === 'TRAINER') {
            localStorage.role = 'TRAINER'
            window.location.href = 'http://localhost:8080/trainer/opened-class'
          } else {
            window.location.href = 'http://localhost:8080/admin/all-modules'
          }
          console.log(response)
        }).catch(error => {
          console.log(error)
          this.errorLogin = true
          })
      }).catch(error => console.log(error))
    },
    setSidebarMenu (sidebarIndex) {
      this.$store.commit('SET_SIDEBARMENU', sidebarIndex)
    },
    moveTo1 () {
      // eslint-disable-next-line
      fullpage_api.moveTo(1)
    },
    moveTo2 () {
      // eslint-disable-next-line
      fullpage_api.moveTo(2)
    },
    moveTo3 () {
      // eslint-disable-next-line
      fullpage_api.moveTo(3)
    }
  },
  created () {
    this.setLayout('login-layout')
  }
}
</script>

<style>
/* Navigation */
.bullet-nav{
  z-index: 1;
  right: 0;
  top:45%;
  color: rgba(255, 255, 255, 40%);
  font-size: 30px;
}
.bullet-nav li{
  margin-top: -10px;
  cursor: pointer;
}
.bullet-nav li.active-bullet{
  color: rgba(255, 255, 255, 100%);
}

/* background section */
#section-1{
  background: url('./../assets/background_images/welcome_page_1.jpg') no-repeat;
  background-size: cover
}
#section-2{
  background: url('./../assets/background_images/welcome_page_2.jpg') no-repeat;
  background-size: cover
}
#section-3{
  background: url('./../assets/background_images/welcome_page_3.jpg') no-repeat;
  background-size: cover
}

/* Form sign in */
#inputEmail:focus, #inputPassword:focus {
  color: white
}
.form-group {
  position: relative;
  margin-bottom: 3.5rem;
  margin: auto;
  margin-top: 15%;
  width: 70%;
}
.form-control-placeholder {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  transition: all 200ms;
  font-size: 120%;
  opacity: 0.8;
}
.form-control:focus + .form-control-placeholder,
.form-control:valid + .form-control-placeholder {
  font-size: 130%;
  transform: translate3d(0, -100%, 0);
  opacity: 1;
}
.transparent-input{
  background-color:rgba(0,0,0,0) !important;
  border:none !important;
  border-bottom: 2px solid white !important;
}
#btnSignIn{
  margin-top: 15%;
  width: 35%;
  font-size: 110%;
}

/* button lets start */
#btnLetsStart{
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  margin-top: 12%;
  width: 10%;
  font-size: 120%;
}
</style>
