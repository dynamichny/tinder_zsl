<template>
  <div id="app">
    <Authentication v-if="!currentUser"/>
  </div>
</template>

<script>
import store from '@/store/index';
import Authentication from '@/components/Authentication/Authentication.vue';

export default {
  name: 'app',
  components: {
    Authentication
  },
  computed: {
    currentUser(){
      return store.state.currentUser;
    }
  }
}
</script>

<style lang="scss">
@font-face{
  font-family: 'Chalet New York Nineteen Seventy';
  src: url('./assets/chalet-new-york-nineteen-seventy.otf');
}
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');
body{
  margin: 0;
  padding: 0;
  height: 100%;
  height: 100vh;
}
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  height: 100%;
}
</style>
