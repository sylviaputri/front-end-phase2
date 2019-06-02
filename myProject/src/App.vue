<template>
  <div id="app">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section" id="section-1">
        <div class="colorBackground whiteColor vertical-center" v-bind:style="{ 'background-color': 'rgba(46, 84, 101, 86%)' }">
          <div class="float-left" style="width: 50%">
            <h1 class="font-weight-bold text-center">LOGOQUE</h1>
            <br/>
            <h5 class="text-center mx-auto" style="width: 70%">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </h5>
          </div>
          <div class="float-left border text-center mx-auto" style="width: 30%; height:65%;">
            <h1>cekcek</h1>
          </div>
        </div>
      </div>
      <div class="section" id="section-2">
        <div class="colorBackground" v-bind:style="{ 'background-color': 'rgba(77, 157, 195, 66%)' }">
          Second section ...
        </div>
      </div>
      <div class="section" id="section-3">
        <div class="colorBackground" v-bind:style="{ 'background-color': 'rgba(141, 206, 237, 59%)' }">
          Third section ...
        </div>
      </div>
    </full-page>

    <div id="bullet-nav" class="position-fixed">
      <ul>
        <li class="active-bullet" v-on:click="moveTo1"></li>
        <li v-on:click="moveTo2"></li>
        <li v-on:click="moveTo3"></li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: 'App',
  data: function() {
    return  {
      options: {
      }
    }
  },
  methods:{
    moveTo1:function(){
      fullpage_api.moveTo(1);
    },
    moveTo2:function(){
      fullpage_api.moveTo(2);
    },
    moveTo3:function(){
      fullpage_api.moveTo(3);
    }
  }
}
</script>


<style>
.whiteColor{
  color: white
}
.colorBackground{
  height: 100%;
}
#bullet-nav{
  z-index: 1;
  right: 0;
  top:45%;
  color: rgba(255, 255, 255, 40%);
  font-size: 30px;
}
#bullet-nav li{
  margin-top: -10px;
}
#bullet-nav li.active-bullet{
  color: rgba(255, 255, 255, 100%);
}
#section-1{
  background: url('./assets/background/welcome_page_1.jpg') no-repeat;
  background-size: cover
}
#section-2{
  background: url('./assets/background/welcome_page_2.jpg') no-repeat;
  background-size: cover
}
#section-3{
  background: url('./assets/background/welcome_page_3.jpg') no-repeat;
  background-size: cover
}
.vertical-center {
  min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */
  display: flex;
  align-items: center;
}
</style>
