<template>
  <div id="application">
    <Authentication v-if="!currentUser"/>
    <Preferences v-if="currentUser && !currentUser.preferences.isSet" />
    <Home v-if="currentUser" />
  </div>
</template>

<script>
import store from '@/store/index';
import Authentication from '@/components/Authentication/Authentication.vue';
import Preferences from '@/components/Preferences/Preferences.vue';
import Home from '@/components/Home/Home.vue';

export default {
  name: 'application',
  components: {
    Authentication,
    Preferences,
    Home
  },
  computed: {
    currentUser(){
      return store.state.currentUser;
    }
  }
}
</script>

<style lang="scss">

body{
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
#application {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
button{
  cursor: pointer;
}
</style>
