<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <!-- SECTION ! -->
    <div class="section" id="section-1">
      <div class="whiteColor vertical-center" style="background-color: rgba(46, 84, 101, 86%); height:100%">
        <div class="float-left" style="width: 50%">
          <h1 class="font-weight-bold text-center">LOGOQUE</h1>
          <br/>
          <h5 class="text-center mx-auto" style="width: 70%">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </h5>
        </div>
        <div class="float-left border border-3 rounded text-center mx-auto" style="width: 30%; height:65%;">
          <div class="form-group" style="margin-top:25%">
            <input type="text" id="inputEmail" class="form-control transparent-input whiteColor" required>
            <label class="form-control-placeholder" for="inputEmail">email</label>
          </div>
          <div class="form-group">
            <input type="password" id="inputPassword" class="form-control transparent-input whiteColor" required>
            <label class="form-control-placeholder" for="inputPassword">password</label>
          </div>
          <router-link to="/trainee/home" @click.native="setLayout('trainee-layout'); setSidebarMenu(0)">
            <b-button variant="primary" id="btnSignIn" class="border border-2" style="margin-bottom:15%">SIGN IN</b-button>
          </router-link>
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
          <h1 class="font-weight-bold text-center" style="width: 100%">Lorem ipsum</h1>
          <br/>
          <h3 class="text-center mx-auto" style="width: 70%">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
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
          <h1 class="font-weight-bold text-center" style="width: 100%">Lorem ipsum</h1>
          <br/>
          <h3 class="text-center mx-auto" style="width: 70%">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
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
      }
    }
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    },
    setSidebarMenu (sidebarIndex) {
      this.$store.commit('SET_SIDEBARMENU', sidebarIndex)
    },
    moveTo1: function () {
      // eslint-disable-next-line
      fullpage_api.moveTo(1)
    },
    moveTo2: function () {
      // eslint-disable-next-line
      fullpage_api.moveTo(2)
    },
    moveTo3: function () {
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
