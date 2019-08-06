<template>
  <div id="traineeTrainerAllModules" class="px-5">
      <h2 class="font-weight-bold mb-4">Modul</h2>
      <div class="searchingTools fadedWhiteBackground py-1 px-4 mb-4">
          <b-row>
            <b-col cols="4">
              <b-row>
                <b-col>
                  <b-input-group>
                    <font-awesome-icon icon="search" class="position-absolute" style="top:18px;"/>
                    <b-form-input v-model="searchKeyword" type="text" placeholder="Ketik modul yang dicari ..." size="sm" class="inputBlackBorder mt-2 ml-4"></b-form-input>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
            </b-col>
            <b-col cols="7">
              <b-row>
                <b-col class="mr-3">
                  <font-awesome-icon icon="shapes" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="optionCategory" @change="searchModule()" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">semua kategori</option>
                    <option v-for="category in moduleCategories" :key="category" :value="category.name">{{category.name}}</option>
                  </b-form-select>
                </b-col>
                <b-col class="mr-3">
                  <font-awesome-icon icon="file-signature" class="position-absolute" style="top:18px; left:0px"/>
                  <b-form-select v-model="optionExam" @change="searchModule()" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option value="all">ujian dan tanpa ujian</option>
                    <option value="false">tanpa ujian</option>
                    <option value="true">ujian</option>
                  </b-form-select>
                </b-col>
                <b-col>
                  <font-awesome-icon icon="sort-alpha-down" class="position-absolute" style="top:18px; left:-8px"/>
                  <b-form-select v-model="selected" size="sm" class="m-2" style="background-color: transparent; border: 1px solid black; border-radius: 5%;">
                    <option :value="rating">rating</option>
                    <option value="name">nama modul</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
      </div>
      <module-card :modules="modules"></module-card>
  </div>
</template>

<script>
import ModuleCard from './../components/ModuleCard.vue'
export default {
  data () {
    return {
      modules: null,
      moduleCategories: null,
      searchKeyword: '',
      optionCategory: 'all',
      optionExam: 'all'
    }
  },
  components: {
    'module-card': ModuleCard
  },
  created () {
    window.scrollTo(0, 0)
  },
  mounted () {
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_search?page=0&popular=true&size=15', {withCredentials: true})
      .then(response => (this.modules = response.data.data.content))
      .catch(error => { console.log(error.response) })
    this.$axios
      .get('http://komatikugm.web.id:13370/modules/_categories', {withCredentials: true})
      .then(response => (this.moduleCategories = response.data.data.content))
      .catch(error => { console.log(error.response) })
  },
  methods: {
    searchModule () {
      let category = 'category=' + this.optionCategory + '&'
      if (this.optionCategory === 'all') {
        category = ''
      }
      let exam = 'hasExam=' + this.optionExam + '&'
      if (this.optionExam === 'all') {
        exam = ''
      }
      let name = 'name=' + this.searchKeyword + '&'
      if (this.searchKeyword === '') {
        name = ''
      }
      this.$axios
        .get('http://komatikugm.web.id:13370/modules/_search?' + category + exam + name + 'page=0&popular=true&size=15', {withCredentials: true})
        .then(response => (this.modules = response.data.data.content))
        .catch(error => { console.log(error.response) })
    }
  },
  watch: {
    searchKeyword () {
      this.searchModule()
    }
  }
}
</script>

<style>
html{
  background: url('./../assets/background_images/apps_page.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
